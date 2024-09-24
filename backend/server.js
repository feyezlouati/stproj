const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true // Ensure credentials are included
}));
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'stproj'
});

app.listen(8080, () => {
    console.log("listening on port 8080");
});

// actualite 
app.get('/actualite', (req, res) => {
    const sql = "SELECT * FROM new";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// signup 
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO requests (name, email, position, password) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.sname,
        req.body.semail,
        req.body.sposition,
        req.body.spassword
        
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// login
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    const values = [
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json({ message: "server side error" });
        }
        if (data.length > 0) {
            const email = data[0].email;
            const isAdmin = data[0].isadmin; // Assuming 'isadmin' is the column name
            const token = jwt.sign({ email, isAdmin }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' }); // Include 'isadmin' in the token
            res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'Lax' }); // Cookie options
            return res.json({ Status: "success", isAdmin }); // Include 'isAdmin' in the response
        } else {
            return res.json("fails");
        }
    });
});

// user verification
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "error no token" });
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ message: "authentication error" });
            } else {
                req.email = decoded.email;
                req.isAdmin = decoded.isAdmin;
                next();
            }
        });
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "success", email: req.email, isAdmin: req.isAdmin });
});

// logout 
app.get('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'Lax' });
    return res.json({ Status: "success" });
});

// request
app.get('/requests', (req, res) => {
    const sql = "SELECT * FROM requests";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// add user to users table
app.post('/add', (req, res) => {
    const sql = "INSERT INTO users(name, email, password, position) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.admname,
        req.body.admemail,
        req.body.admpassword,
        req.body.admposition
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// delete request from requests table
app.post('/delete', (req, res) => {
    const sql = "DELETE FROM requests WHERE email = ?";
    const values = [
        req.body.admemail
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// add actualite
app.post('/addactualite', (req, res) => {
    const sql = "INSERT INTO new (`title`, `description`, `img`, `content`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.acttitle,
        req.body.actdescription,
        req.body.actimg,
        req.body.actcont
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// delete actualite
app.post('/deleteactualite', (req, res) => {
    const sql = "DELETE FROM new WHERE title = ?";
    const values = [
        req.body.acttitle
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// modify actualite
app.post('/modifyactualite', (req, res) => {
    const { newtitle, newDescription, newimg, newcontent, acttitle } = req.body;
    const sql = "UPDATE new SET title=?, description=?, img=?, content=? WHERE title=?";
    const values = [
        newtitle,
        newDescription,
        newimg,
        newcontent,
        acttitle,
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


// Fetch news by title
app.get('/actualite/:title', (req, res) => {
    const sql = "SELECT * FROM new WHERE title = ?";
    const values = [req.params.title];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// fetch users
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users where isadmin = ?";
    const values = [0];
    db.query(sql,values , (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//delete user
app.post('/deleteuser', (req, res) => {
    const sql = "DELETE FROM users WHERE email = ?";
    const values = [
        req.body.useremail
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//fetch members
app.get('/members', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// add user informations
app.post('/adduserinfo', verifyUser, (req, res) => {
    const sql = "UPDATE users SET phone = ?, job = ?, aboutme = ? WHERE email = ?";
    const values = [
        req.body.userphone,
        req.body.userjob,
        req.body.userabout,
        req.email // Get email from verified token
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});

// add user intrest
app.post('/adduserintrest', verifyUser, (req, res) => {
    const sql = "UPDATE users SET intrest = ? WHERE email = ?";
    const values = [
        req.body.userintres,
        req.email // Get email from verified token
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});

// display userinfos 
app.get('/showuserinfos', verifyUser, (req, res) => {
    const sql = "SELECT * FROM `users` WHERE `email`= ?";
    const values = [req.email];  // Use email from the verified token
    
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);  // Return the first user's data
    });
});

// add post
app.post('/addpost', verifyUser, (req, res) => {
    const sql = "INSERT INTO `publications`(`pub`, `email`) VALUES (?, ?)";
    const values = [
        req.body.postfield,
        req.email,
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});

// fetch posts
app.get('/posts', verifyUser, (req, res) => {
    const sql = "SELECT * FROM `publications` WHERE email = ?";
    const values = [req.email]; // Use req.email from the verified token

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// modify post
app.post('/modifyposts', verifyUser, (req, res) => {
    const { newpub, id } = req.body;
    const sql = "UPDATE `publications` SET `pub`= ? WHERE `id` = ? AND `email` = ?";
    const values = [
        newpub,
        id,
        req.email
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});

// delete post
app.post('/deletepost', verifyUser, (req, res) => {
    const sql = "DELETE FROM `publications` WHERE id = ? AND email = ?";
    const values = [
        req.body.id,
        req.email  // Make sure only the user who created the post can delete it
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});

// add user qualification
app.post('/addqualification', verifyUser, (req, res) => {
    const {userqualification} = req.body;
    const sql = "INSERT INTO `qualifications`(`qualification`, `email`) VALUES ( ?, ?)";
    const values = [
        userqualification,
        req.email
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});

// fetch user qualifaications
app.get('/userqualifications', verifyUser, (req, res) => {
    const sql = "SELECT * FROM `qualifications` WHERE `email`= ?";
    const values = [req.email]; // Use req.email from the verified token

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// delete user qualifications
app.post('/deletequalification', verifyUser, (req, res) => {
    const sql = "DELETE FROM `qualifications` WHERE `email` = ? AND `qid` = ?";
    const values = [
        req.email, 
        req.body.qid 
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});

// Fetch posts by email
app.get('/profile/:email', (req, res) => {
    const sql = "SELECT * FROM `users` WHERE `email` = ?";
    const values = [req.params.email];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//fetch posts of each user
app.get('/userposts/:email', (req, res) => {
    const sql = "SELECT * FROM `publications` WHERE email = ?";
    const values = [req.params.email];

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//fetch qualifications of each user
app.get('/userqualification/:email', (req, res) => {
    const sql = "SELECT * FROM `qualifications` WHERE `email` = ?";
    const values = [req.params.email];

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// add event
app.post('/addevent', verifyUser, (req, res) => {
    const {eventtitle, eventdate, eventlocation} = req.body;
    const sql = "INSERT INTO `events`(`title`, `date`, `location`) VALUES  ( ?, ?, ?)";
    const values = [
        eventtitle,
        eventdate,eventlocation
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});

// fetch events
app.get('/events', (req, res) => {
    const sql = "SELECT * FROM `events`";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// delete event
app.post('/deleteevent', verifyUser, (req, res) => {
    const sql = "DELETE FROM `events` WHERE `title`= ?";
    const values = [
        req.body.evetitle
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});

// fetch all publications
app.get('/publications', (req, res) => {
    const sql = "SELECT * FROM `publications`";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});







// add formation ___________________________________________________

// fetch these
app.get('/these', (req, res) => {
    const sql = "SELECT * FROM `these`";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//add these
app.post('/addformation', verifyUser, (req, res) => {
    const {thesedesc} = req.body;
    const sql = "INSERT INTO `these`(`description`) VALUES  ( ?)";
    const values = [
        thesedesc,
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});


//delete these
app.post('/deletethese', verifyUser, (req, res) => {
    const sql = "DELETE FROM `these` WHERE `id` = ?";
    const values = [req.body.id];
    
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", message: "Thèse deleted successfully" });
    });
});



// fetch pfe
app.get('/pfe', (req, res) => {
    const sql = "SELECT * FROM `pfe`";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Add PFE
app.post('/addpfe', verifyUser, (req, res) => {
    const {pfedesc} = req.body;
    const sql = "INSERT INTO `pfe`(`description`) VALUES  ( ?)";
    const values = [
        pfedesc,
        
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});


// Delete PFE
app.post('/deletepfe', verifyUser, (req, res) => {
    const sql = "DELETE FROM `pfe` WHERE `id` = ?";
    const values = [req.body.id];

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", message: "PFE deleted successfully" });
    });
});

// fetch master
app.get('/master', (req, res) => {
    const sql = "SELECT * FROM `master`";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//add master
app.post('/addmaster', verifyUser, (req, res) => {
    const {masterdesc} = req.body;
    const sql = "INSERT INTO `master`(`description`) VALUES  ( ?)";
    const values = [
        masterdesc,
        
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});


//delete master
app.post('/deletemaster', verifyUser, (req, res) => {
    const sql = "DELETE FROM `master` WHERE `id` = ?";
    const values = [req.body.id];
    
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", message: "Thèse deleted successfully" });
    });
});


// fetch pfa
app.get('/pfa', (req, res) => {
    const sql = "SELECT * FROM `pfa`";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//add pfa
app.post('/addpfa', verifyUser, (req, res) => {
    const {pfadesc} = req.body;
    const sql = "INSERT INTO `pfa`(`description`) VALUES  ( ?)";
    const values = [
        pfadesc,
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", data });
    });
});


//delete pfa
app.post('/deletepfa', verifyUser, (req, res) => {
    const sql = "DELETE FROM `pfa` WHERE `id` = ?";
    const values = [req.body.id];
    
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ Status: "success", message: "Thèse deleted successfully" });
    });
});