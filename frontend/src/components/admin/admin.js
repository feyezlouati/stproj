import './admin.css';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // constant for authentication and admin status
    const [isAdmin, setIsAdmin] = useState(false);  // constant for authentication and admin status
    const navigate = useNavigate(); // constant for navigating to diffrent pages
    const [reqdata, setReqdata] = useState([]); // constant for add and delete requests
    const formRef = useRef(null); // constant for the modify requests form
    const formRefe = useRef(null); // constant for the modify events form
    const formRefee = useRef(null); // constant for the modify pfe form
    const Compteur = 0;
    const [addactualite, setAddactualite] = useState({
        acttitle: '',
        actdescription: '',
        actimg: '',
        actcont: ''
    }); // constant for add actualite
    const [addformation, setAddformation] = useState({
        thesedesc: '',
        
    }); // constant for add formation
    const [addpfee, setAddpfee] = useState({
        pfedesc: '',
        
    }); // constant for add pfe
    const [addmaster, setAddmaster] = useState({
        masterdesc: '',
        
        
    }); // constant for add master
    const [addpfa, setAddpfa] = useState({
        pfadesc: '',
        
    }); // constant for add pfa
    const [addevents, setAddevents] = useState({
        eventtitle: '',
        eventdate: '',
        eventlocation: ''
    });//const for adding event
    const [events, setEvents] = useState([]); // const for events
    const [these, setThese] = useState([]); // const for these
    const [delthese, setDelthese] = useState([]); // constant for delete these
    const [pfe, setPfe] = useState([]); // const for pfe
    const [delpfe, setDelpfe] = useState([]); // constant for delete pfe
    const [master, setMaster] = useState([]); // const for master
    const [delmaster, setDelmaster] = useState([]); // constant for delete master
    const [pfa, setPfa] = useState([]); // const for pfa
    const [delpfa, setDelpfa] = useState([]); // constant for delete pfa
    const [admact, setAdmact] = useState([]); // constant for delete actualite
    const [currentActualite, setCurrentActualite] = useState({
        title: '',
        description: '',
        img: '',
        content: ''
    }); // constant for the modify actualite values
    const [adminusers, setAdminusers]= useState([]); // constant for fetching users
    const [deleteuser, setDeleteuser] = useState({
        useremail: '',
    });//constant for delete user
    const [deleteevent, setDeleteevent] = useState({
        evetitle: ''
    })



    // Delete actualite
    const handleDeleteact = (ad) => {
        const confirmed = window.confirm('Are you sure you want to delete this post?');
        if (confirmed) {axios.post('http://localhost:8080/deleteactualite', { acttitle: ad.title })
            .then(res => {
                setAdmact(admact.filter(actualite => actualite.title !== ad.title));
                alert('Actualité supprimée avec succès');
            })
            .catch(err => console.log(err));}
    };

    
    //fetch users
    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(res => res.json())
            .then(data => setAdminusers(data))
            .catch(err => console.log(err));
    }, []);
    //fetch these
    useEffect(() => {
        fetch('http://localhost:8080/these')
            .then(res => res.json())
            .then(data => setThese(data))
            .catch(err => console.log(err));
    }, []);

    //fetch pfe
    useEffect(() => {
        fetch('http://localhost:8080/pfe')
            .then(res => res.json())
            .then(data => setPfe(data))
            .catch(err => console.log(err));
    }, []);

    //fetch master
    useEffect(() => {
        fetch('http://localhost:8080/master')
            .then(res => res.json())
            .then(data => setMaster(data))
            .catch(err => console.log(err));
    }, []);
    //fetch pfa
    useEffect(() => {
        fetch('http://localhost:8080/pfa')
            .then(res => res.json())
            .then(data => setPfa(data))
            .catch(err => console.log(err));
    }, []);


    // Fetch actualite
    useEffect(() => {
        fetch('http://localhost:8080/actualite')
            .then(res => res.json())
            .then(data => setAdmact(data))
            .catch(err => console.log(err));
    }, []);


    // fetch events
    useEffect(() => {
        fetch('http://localhost:8080/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.log(err));
    }, []);


    // add event 
    const handleInputevent = (ev) => {
        setAddevents(prev => ({ ...prev, [ev.target.name]: ev.target.value }));
    };

    const addevent = (ev) => {
        ev.preventDefault();
        axios.post('http://localhost:8080/addevent', addevents)
            .then(res => {
                alert('evenement parfaitement ajoutée');
                if (formRefe.current) {
                    formRefe.current.reset();
                }
                setAddevents({ eventtitle: '', eventdate: '', eventlocation: ''});
                // Update actualite list without refreshing
                // setAdmact([...admact, { title: addactualite.acttitle, description: addactualite.actdescription, img: addactualite.actimg, content: addactualite.actcont }]);
            })
            .catch(err => console.log(err));
    };

    // Add actualite
    const handleInputt = (event) => {
        setAddactualite(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const addact = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/addactualite', addactualite)
            .then(res => {
                alert('Actualité parfaitement ajoutée');
                if (formRef.current) {
                    formRef.current.reset();
                }
                setAddactualite({ acttitle: '', actdescription: '', actimg: '', actcont: '' });
                // Update actualite list without refreshing
                setAdmact([...admact, { title: addactualite.acttitle, description: addactualite.actdescription, img: addactualite.actimg, content: addactualite.actcont }]);
            })
            .catch(err => console.log(err));
    };

        // ajouter these
        const handleInputtt = (event) => {
            setAddformation(prev => ({ ...prev, [event.target.name]: event.target.value }));
        };
    
        
        const addform = (event) => {
            event.preventDefault();
            axios.post('http://localhost:8080/addformation', addformation)
                .then(res => {
                    alert('these ajouté avec succès');
                    if (formRef.current) {
                        formRef.current.reset(); // Reset form fields
                    }
                    setAddformation({ thesedesc: ''});
                })
                .catch(err => console.log(err));
        };
        
        // ajouter master
        const handleInputttttt = (event) => {
            setAddpfa(prev => ({ ...prev, [event.target.name]: event.target.value }));
        };
    
        
        const addpfaa = (event) => {
            event.preventDefault();
            axios.post('http://localhost:8080/addpfa', addpfa)
                .then(res => {
                    alert('pfa ajouté avec succès');
                    if (formRef.current) {
                        formRef.current.reset(); // Reset form fields
                    }
                    setAddpfa({ pfadesc: '', pfapdf: ''});
                })
                .catch(err => console.log(err));
        };


        // ajouter master
        const handleInputtttt = (event) => {
            setAddmaster(prev => ({ ...prev, [event.target.name]: event.target.value }));
        };
    
        
        const addmaste = (event) => {
            event.preventDefault();
            axios.post('http://localhost:8080/addmaster', addmaster)
                .then(res => {
                    alert('master ajouté avec succès');
                    if (formRef.current) {
                        formRef.current.reset(); // Reset form fields
                    }
                    setAddmaster({ masterdesc: '', masterpdf: ''});
                })
                .catch(err => console.log(err));
        };


        const handleInputttt = (evet) => {
            setAddpfee(prev => ({ ...prev, [evet.target.name]: evet.target.value }));
        };
    
        // Add PFE
        const addpfe = (evet) => {
            evet.preventDefault();
            axios.post('http://localhost:8080/addpfe', addpfee)
                .then(res => {
                    alert('PFE ajouté avec succès');
                    if (formRefee.current) {
                        formRefee.current.reset(); // Reset form fields
                    }
                    setAddpfee({ pfedesc: '', fopfedesc: '' });  // Reset state
                })
                .catch(err => console.log(err));
        };
        
    // Fetch requests
    useEffect(() => {
        fetch('http://localhost:8080/requests')
            .then(res => res.json())
            .then(data => setReqdata(data))
            .catch(err => console.log(err));
    }, []);

    // Check authentication and admin status
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:8080/');
                if (res.data.Status === 'success' && res.data.isAdmin === 1) {
                    setIsAuthenticated(true);
                    setIsAdmin(true);
                } else {
                    setIsAuthenticated(false);
                    setIsAdmin(false);
                    navigate('/'); // Redirect to home if not admin
                }
            } catch (error) {
                console.error(error);
                setIsAuthenticated(false);
                setIsAdmin(false);
                navigate('/'); // Redirect to home if error occurs
            }
        };

        checkAuth();
    }, [navigate]);

    // Handle add request
    const handleAdd = (d) => {
        axios.post('http://localhost:8080/add', { admname: d.name, admemail: d.email, admpassword: d.password, admposition: d.position })
            .then(res => {
                axios.post('http://localhost:8080/delete', { admemail: d.email })
                    .then(delRes => {
                        setReqdata(reqdata.filter(request => request.email !== d.email));
                        alert('Utilisateur ajouté et supprimé des demandes avec succès');
                    })
                    .catch(delErr => console.log(delErr));
            })
            .catch(err => console.log(err));
    };

    // Handle delete request
    const handleDelete = (d) => {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet demande?');
        if (confirmed) {axios.post('http://localhost:8080/delete', { admemail: d.email })
            .then(res => {
                setReqdata(reqdata.filter(request => request.email !== d.email));
                alert('Utilisateur supprimé avec succès');
            })
            .catch(err => console.log(err));}
    };
    // open modal
    const openEditModal = (post) => {
        setCurrentActualite({ title: post.title, newtitle: post.title, newDescription: post.description, newimg: post.img, newcontent: post.content  });
    };

    // Handle modify input change
    const handleModifyInputChange = (e) => {
        setCurrentActualite(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };
    


    // Handle modify form submission
    const handleModifySubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/modifyactualite', {
            acttitle: currentActualite.title, // existing title (identifier)
            newtitle: currentActualite.newtitle, // updated title
            newDescription: currentActualite.newDescription,
            newimg: currentActualite.newimg,
            newcontent: currentActualite.newcontent
        }).then(res => {
            setAdmact(admact.map(act => (
                act.title === currentActualite.title ?
                { ...act, title: currentActualite.newtitle, description: currentActualite.newDescription, img: currentActualite.newimg, content: currentActualite.newcontent } : 
                act
            )));
            alert('Actualité modifiée avec succès');
            setCurrentActualite({ title: '', newtitle: '', newDescription: '', newimg: '', newcontent: ''}); // Reset form after modification
        }).catch(err => console.log(err));
    };

    // delete these
        
    const handleDeletethese = (d) => {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet these?');
        if (confirmed) {
            axios.post('http://localhost:8080/deletethese', { id: d.id })
                .then(res => {
                    setThese(these.filter(theseItem => theseItem.id !== d.id)); // Update the correct state
                    alert('these supprimé avec succès');
                })
                .catch(err => console.log(err));
        }
    };

    
// delete pfa
        
const handleDeletepfa = (d) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet pfa?');
    if (confirmed) {
        axios.post('http://localhost:8080/deletepfa', { id: d.id })
            .then(res => {
                setPfa(these.filter(pfaItem => pfaItem.id !== d.id)); // Update the correct state
                alert('pfa supprimé avec succès');
            })
            .catch(err => console.log(err));
    }
};


// delete master
        
const handleDeletemaster = (d) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet master?');
    if (confirmed) {
        axios.post('http://localhost:8080/deletemaster', { id: d.id })
            .then(res => {
                setMaster(these.filter(masterItem => masterItem.id !== d.id)); // Update the correct state
                alert('master supprimé avec succès');
            })
            .catch(err => console.log(err));
    }
};




    // delete pfe
        
    const handleDeletepfe = (d) => {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet pfe?');
        if (confirmed) {
            axios.post('http://localhost:8080/deletepfe', { id: d.id })
                .then(res => {
                    setThese(these.filter(pfeItem => pfeItem.id !== d.id)); // Update the correct state
                    alert('pfe supprimé avec succès');
                })
                .catch(err => console.log(err));
        }
    };
    

    

    //delete user
    const handleDeleteuser = (au) =>{
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
        if (confirmed) {axios.post('http://localhost:8080/deleteuser', { useremail: au.email })
        .then(res => {
            setAdminusers(adminusers.filter(admusers => admusers.email !== au.email));
            alert('utilisateur supprimé avec succès');
        })
        .catch(err => console.log(err));}
    }

    //delete user
    const handleDeleteevent = (ev) =>{
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet événement?');
        if (confirmed) {axios.post('http://localhost:8080/deleteevent', { evetitle: ev.title })
        .then(res => {
            setEvents(events.filter(eve => eve.title !== ev.title));
            alert('événement supprimé avec succès');
        })
        .catch(err => console.log(err));}
    }

    if (!isAuthenticated || !isAdmin) {
        return null; // Render nothing if user is not authenticated or not admin
    }

    return (
        <div className="admin-container">
            <div className="btn-group-vertical contain" role="group" aria-label="Vertical button group">
                
                
            </div>
            <>
            
            <div className="cont">
            <h1 className='titre'>ajouter un evenement</h1>  
                <div class="container bootstrap snippets bootdey">
                    <section id="contact" class="gray-bg padding-top-bottom">
                        <div class="container bootstrap snippets bootdey">
                            <div class="row">
                                <form onSubmit={addevent} ref={formRefe} id="Highlighted-form" class="col-sm-6 col-sm-offset-3" action="contact.php" method="post" novalidate="">
                                    
                                    <div class="form-group">
                                    <label class="control-label" for="contact-name">ajouter un titre</label>
                                    <div class="controls">
                                        <input onChange={handleInputevent} id="contact-name" name="eventtitle" placeholder="ajouter un titre" class="form-control requiredField Highlighted-label" data-new-placeholder="Add title" type="text" data-error-empty="Please enter your name"></input>
                                        <i class="tit"> <img src='https://img.icons8.com/?size=100&id=PBFtALleh9Ok&format=png&color=000000'></img></i>
                                    </div>
                                    </div>

                                    <div class="form-group">
                                    <label class="control-label" for="contact-name">ajouter date</label>
                                    <div class="controls">
                                        <input onChange={handleInputevent} id="contact-name" name="eventdate" placeholder="ajouter la date" class="form-control requiredField Highlighted-label" data-new-placeholder="Add title" type="text" data-error-empty="Please enter your name"></input>
                                        <i class="tit"> <img src='https://img.icons8.com/?size=100&id=PBFtALleh9Ok&format=png&color=000000'></img></i>
                                    </div>
                                    </div>

                                    <div class="form-group">
                                    <label class="control-label" for="contact-name">Add date</label>
                                    <div class="controls">
                                        <input onChange={handleInputevent} id="contact-name" name="eventlocation" placeholder="ajouter la localisation" class="form-control requiredField Highlighted-label" data-new-placeholder="Add title" type="text" data-error-empty="Please enter your name"></input>
                                        <i class="tit"> <img src='https://img.icons8.com/?size=100&id=PBFtALleh9Ok&format=png&color=000000'></img></i>
                                    </div>
                                    </div>
                                    <p className='butp'><button name="submit" type="submit" class="btn btn-info btn-block" data-error-message="Error!" data-sending-message="Sending..." data-ok-message="Message Sent"><i class="fa fa-location-arrow"></i>AJOUTER</button></p>
                                    <input type="hidden" name="submitted" id="submitted" value="true"></input>
                                </form>
                            </div>  
                        </div>  
                    </section>
                </div>

                <h1 className='titre'>liste des evenements</h1>  
                <div className="row">
                    <div className="col-lg-12">
                        <div className="">
                            <div className="table-responsive">
                                <table className="table project-list-table table-nowrap align-middle table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">titre</th>
                                            <th scope="col" style={{ width: '200px' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {events.map((ev, i) => (
                                        <tr key={i}>
                                                <td>
                                                    <a href="#" className="text-body">{ev.title}</a>
                                                </td>
                                                <td>
                                                    <ul className="list-inline mb-0">
                                                        <li className="list-inline-item">
                                                            <a
                                                                href="javascript:void(0);"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                title="Edit"
                                                                className="px-2 text-primary"
                                                            >
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a
                                                                href="javascript:void(0);"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                title="Delete"
                                                                className="px-2 text-danger"
                                                            >
                                                                <i className="icondelit"><img onClick={() => handleDeleteevent(ev)} src='https://img.icons8.com/?size=100&id=67884&format=png&color=000000'></img></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </td>
                                        </tr>
                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>




                <h1 className='titre'>ajouter des nouvelles</h1>  
                <div class="container bootstrap snippets bootdey">
                    <section id="contact" class="gray-bg padding-top-bottom">
                        <div class="container bootstrap snippets bootdey">
                            <div class="row">
                                <form onSubmit={addact} ref={formRef} id="Highlighted-form" class="col-sm-6 col-sm-offset-3" action="contact.php" method="post" novalidate="">
                                    
                                    <div class="form-group">
                                    <label class="control-label" for="contact-name">Add title</label>
                                    <div class="controls">
                                        <input onChange={handleInputt} id="contact-name" name="acttitle" placeholder="ajouter un titre" class="form-control requiredField Highlighted-label" data-new-placeholder="Add title" type="text" data-error-empty="Please enter your name"></input>
                                        <i class="tit"> <img src='https://img.icons8.com/?size=100&id=PBFtALleh9Ok&format=png&color=000000'></img></i>
                                    </div>
                                    </div>
                                    
                                    <div class="form-group">
                                    <label class="control-label" for="contact-message">Add description</label>
                                        <div class="controls">
                                            <textarea onChange={handleInputt} name='actdescription' id="contact-message" placeholder="ajouter une description" class="form-control requiredField Highlighted-label" data-new-placeholder="Add description" rows="6" data-error-empty="Please enter your message"></textarea>
                                            <i class="tit"><img src='https://img.icons8.com/?size=100&id=41108&format=png&color=000000'></img></i>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                    <label class="control-label" for="contact-mail">Add image</label>
                                    <div class=" controls">
                                        <input onChange={handleInputt} name='actimg' id="contact-mail" placeholder="ajouter le lien de l'image" class="form-control requiredField Highlighted-label" data-new-placeholder="Add imag" type="textl" data-error-empty="" data-error-invalid="Invalid email address"></input>
                                        <i class="tit"><img src='https://img.icons8.com/?size=100&id=pB3lOOBeTps6&format=png&color=000000'></img></i>
                                    </div>
                                    </div>
                                    <div class="form-group">
                                    <label class="control-label" for="contact-message">Add description</label>
                                        <div class="controls">
                                            <textarea onChange={handleInputt} name='actcont'  id="contact-message" placeholder="ajouter une resumé  " class="form-control requiredField Highlighted-label" data-new-placeholder="Add description" rows="6" data-error-empty="Please enter your message"></textarea>
                                            <i class="tit"><img src='https://img.icons8.com/?size=100&id=41108&format=png&color=000000'></img></i>
                                        </div>
                                    </div>
                                    <p className='butp'><button name="submit" type="submit" class="btn btn-info btn-block" data-error-message="Error!" data-sending-message="Sending..." data-ok-message="Message Sent"><i class="fa fa-location-arrow"></i>AJOUTER</button></p>
                                    <input type="hidden" name="submitted" id="submitted" value="true"></input>
                                </form>
                            </div>  
                        </div>  
                    </section>
                </div>  


                <h1 className='titre'>Liste des nouvelles</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="">
                            <div className="table-responsive">
                                <table className="table project-list-table table-nowrap align-middle table-borderless">
                                    <thead>
                                        <tr>
                                            
                                            <th scope="col">titre</th>
                                            <th scope="col">description</th>
                                            <th scope="col" style={{ width: '200px' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {admact.map((ad, i) => (
                            <tr key={i}>
                                    <td>
                                        <a href="#" className="text-body">{ad.title}</a>
                                    </td>
                                    <td>
                                        <span className="discription">{ad.description}</span>
                                    </td>
                                    <td>
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a
                                                            href="javascript:void(0);"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            title="Edit"
                                                            className="px-2 text-primary"
                                                        >
                                                            <i className="iconmod"><img onClick={() => openEditModal(ad)} src='https://img.icons8.com/?size=100&id=48&format=png&color=000000' 
                                                            alt="Modify" 
                                                            data-bs-toggle="modal" 
                                                            data-bs-target={`#modal-`}
                                                            className='btn-primary point'>
                                                            </img></i>
                                                        </a>
                                        <div className="modal fade" id={`modal-`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">modifying actualite</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={handleModifySubmit}>
                                                        <div className="mb-3">
                                                            <label htmlFor="recipient-name" className="col-form-label">title:</label>
                                                            <input type="text" className="form-control" id="recipient-name" name='newtitle' value={currentActualite.newtitle} onChange={handleModifyInputChange} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="message-text" className="col-form-label">description:</label>
                                                            <textarea className="form-control" id="message-text" name='newDescription' value={currentActualite.newDescription} onChange={handleModifyInputChange}></textarea>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="message-text" className="col-form-label">image:</label>
                                                            <textarea className="form-control" id="message-text" name='newimg' value={currentActualite.newimg} onChange={handleModifyInputChange}></textarea>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="message-text" className="col-form-label">content:</label>
                                                            <textarea className="form-control" id="message-text" name='newcontent' value={currentActualite.newcontent} onChange={handleModifyInputChange}></textarea>
                                                        </div>
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">modify</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a
                                                            href="javascript:void(0);"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            title="Delete"
                                                            className="px-2 text-danger"
                                                        >
                                                            <i className="icondelit"><img onClick={() => handleDeleteact(ad)} src='https://img.icons8.com/?size=100&id=67884&format=png&color=000000'></img></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </td>
                            </tr>
                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className='titre'>ajouter une formation</h1>

                <div className="profile-info-general p-4">
                    <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            these
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="container bootstrap snippets bootdey">
                                            <section id="contact" className="gray-bg padding-top-bottom">
                                                <div className="container bootstrap snippets bootdey">
                                                    <div className="row">
                                                        <form onSubmit={addform} ref={formRef} id="Highlighted-form" className="col-sm-6 col-sm-offset-3" action="contact.php" method="post" noValidate>
                                                            <div className="form-group">
                                                                <label className="control-label" htmlFor="contact-name">Add description</label>
                                                                <div className="controls">
                                                                    <input
                                                                        onChange={handleInputtt}
                                                                        id="contact-name"
                                                                        name="thesedesc"
                                                                        placeholder="Add title"
                                                                        className="form-control requiredField Highlighted-label"
                                                                        type="text"
                                                                    />



                                                                    <i className="tit"><img src="https://img.icons8.com/?size=100&id=PBFtALleh9Ok&format=png&color=000000" alt="icon" /></i>
                                                                </div>
                                                            </div>
                                                            <p className="butp">
                                                                <button
                                                                    name="submit"
                                                                    type="submit"
                                                                    className="btn btn-info btn-block"
                                                                >

                                                                    <i className="fa fa-location-arrow"></i>ADD
                                                                </button>
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div className="row">
                                        <div className="col-lg-12">
                                            <div className="">
                                                <div className="table-responsive">
                                                    <table className="table project-list-table table-nowrap align-middle table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">description</th>
                                                                <th scope="col" style={{ width: '200px' }}>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                            {these.map((ad, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <span className="discription">{ad.description}</span>
                                                    </td>
                                                    <td>
                                                        <ul className="list-inline mb-0">
                                                            <li className="list-inline-item">
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    data-bs-toggle="tooltip"
                                                                    data-bs-placement="top"
                                                                    title="Delete"
                                                                    className="px-2 text-danger"
                                                                >
                                                                    <i className="iconmod">
                                                                    <img onClick={() => handleDeletethese(ad)} src='https://img.icons8.com/?size=100&id=67884&format=png&color=000000' alt="Delete" />
                                                                    </i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                    </div>
                </div>
                {/* ___________________________________________________PFE________________________________ */}
                <div className="profile-info-general p-4">
                    <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            pfe
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="container bootstrap snippets bootdey">
                                            <section id="contact" className="gray-bg padding-top-bottom">
                                                <div className="container bootstrap snippets bootdey">
                                                    <div className="row">
                                                        <form onSubmit={addpfe} ref={formRef} id="Highlighted-form" className="col-sm-6 col-sm-offset-3" action="contact.php" method="post" noValidate>
                                                            <div className="form-group">
                                                                <label className="control-label" htmlFor="contact-name">Add description</label>
                                                                <div className="controls">
                                                                    <input
                                                                        onChange={handleInputttt}
                                                                        id="contact-name"
                                                                        name="pfedesc"
                                                                        placeholder="Add title"
                                                                        className="form-control requiredField Highlighted-label"
                                                                        type="text"
                                                                    />
                                                                    <i className="tit"><img src="https://img.icons8.com/?size=100&id=PBFtALleh9Ok&format=png&color=000000" alt="icon" /></i>
                                                                </div>
                                                            </div>
                                                            <p className="butp">
                                                                <button
                                                                    name="submit"
                                                                    type="submit"
                                                                    className="btn btn-info btn-block"
                                                                >

                                                                    <i className="fa fa-location-arrow"></i>ADD
                                                                </button>
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div className="row">
                                        <div className="col-lg-12">
                                            <div className="">
                                                <div className="table-responsive">
                                                    <table className="table project-list-table table-nowrap align-middle table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">description</th>
                                                                <th scope="col" style={{ width: '200px' }}>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {pfe.map((ad, i) => (
                                                            <tr key={i}>
                                                                    <td>
                                                                        <span className="discription">{ad.description}</span>
                                                                    </td>
                                                                    <td>
                                                                                <ul className="list-inline mb-0">
                                                                                    <li className="list-inline-item">
                                                                                        <a
                                                                                            href="javascript:void(0);"
                                                                                            data-bs-toggle="tooltip"
                                                                                            data-bs-placement="top"
                                                                                            title="Delete"
                                                                                            className="px-2 text-danger"
                                                                                        >
                                                                                            <i className="icondelit"><img onClick={() => handleDeletepfe(ad)} src='https://img.icons8.com/?size=100&id=67884&format=png&color=000000'></img></i>
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </td>
                                                            </tr>
                                                        ))}
                                                                    </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                    </div>
                </div>
                {/* _____________________________________________MASTER__________________________________________ */}
                <div className="profile-info-general p-4">
                    <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsethree" aria-expanded="true" aria-controls="collapsethree">
                                            master
                                        </button>
                                    </h2>
                                    <div id="collapsethree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="container bootstrap snippets bootdey">
                                            <section id="contact" className="gray-bg padding-top-bottom">
                                                <div className="container bootstrap snippets bootdey">
                                                    <div className="row">
                                                        <form onSubmit={addmaste} ref={formRef} id="Highlighted-form" className="col-sm-6 col-sm-offset-3" action="contact.php" method="post" noValidate>
                                                            <div className="form-group">
                                                                <label className="control-label" htmlFor="contact-name">Add description</label>
                                                                <div className="controls">
                                                                    <input
                                                                        onChange={handleInputtttt}
                                                                        id="contact-name"
                                                                        name="masterdesc"
                                                                        placeholder="Add title"
                                                                        className="form-control requiredField Highlighted-label"
                                                                        type="text"
                                                                    />
                                                                    <i className="tit"><img src="https://img.icons8.com/?size=100&id=PBFtALleh9Ok&format=png&color=000000" alt="icon" /></i>
                                                                </div>
                                                            </div>
                                                            <p className="butp">
                                                                <button
                                                                    name="submit"
                                                                    type="submit"
                                                                    className="btn btn-info btn-block"
                                                                >

                                                                    <i className="fa fa-location-arrow"></i>ADD
                                                                </button>
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div className="row">
                                        <div className="col-lg-12">
                                            <div className="">
                                                <div className="table-responsive">
                                                    <table className="table project-list-table table-nowrap align-middle table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">description</th>
                                                                <th scope="col" style={{ width: '200px' }}>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                            {master.map((ad, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <span className="discription">{ad.description}</span>
                                                    </td>
                                                    <td>
                                                        <ul className="list-inline mb-0">
                                                            
                                                            <li className="list-inline-item">
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    data-bs-toggle="tooltip"
                                                                    data-bs-placement="top"
                                                                    title="Delete"
                                                                    className="px-2 text-danger"
                                                                >
                                                                    <i className="iconmod">
                                                                    <img onClick={() => handleDeletemaster(ad)} src='https://img.icons8.com/?size=100&id=67884&format=png&color=000000' alt="Delete" />
                                                                    </i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                    </div>
                </div>
{/* ________________________________________________PFA____________________________________________________ */}
<div className="profile-info-general p-4">
                    <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="true" aria-controls="collapsefour">
                                            pfa
                                        </button>
                                    </h2>
                                    <div id="collapsefour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="container bootstrap snippets bootdey">
                                            <section id="contact" className="gray-bg padding-top-bottom">
                                                <div className="container bootstrap snippets bootdey">
                                                    <div className="row">
                                                        <form onSubmit={addpfaa} ref={formRef} id="Highlighted-form" className="col-sm-6 col-sm-offset-3" action="contact.php" method="post" noValidate>
                                                            <div className="form-group">
                                                                <label className="control-label" htmlFor="contact-name">Add description</label>
                                                                <div className="controls">
                                                                    <input
                                                                        onChange={handleInputttttt}
                                                                        id="contact-name"
                                                                        name="pfadesc"
                                                                        placeholder="Add title"
                                                                        className="form-control requiredField Highlighted-label"
                                                                        type="text"
                                                                    />
                                                                    <i className="tit"><img src="https://img.icons8.com/?size=100&id=PBFtALleh9Ok&format=png&color=000000" alt="icon" /></i>
                                                                </div>
                                                            </div>
                                                            <p className="butp">
                                                                <button
                                                                    name="submit"
                                                                    type="submit"
                                                                    className="btn btn-info btn-block"
                                                                >

                                                                    <i className="fa fa-location-arrow"></i>ADD
                                                                </button>
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div className="row">
                                        <div className="col-lg-12">
                                            <div className="">
                                                <div className="table-responsive">
                                                    <table className="table project-list-table table-nowrap align-middle table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">description</th>
                                                                <th scope="col" style={{ width: '200px' }}>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                            {pfa.map((ad, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <span className="discription">{ad.description}</span>
                                                    </td>
                                                    <td>
                                                        <ul className="list-inline mb-0">
                                                            
                                                            <li className="list-inline-item">
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    data-bs-toggle="tooltip"
                                                                    data-bs-placement="top"
                                                                    title="Delete"
                                                                    className="px-2 text-danger"
                                                                >
                                                                    <i className="iconmod">
                                                                    <img onClick={() => handleDeletepfa(ad)} src='https://img.icons8.com/?size=100&id=67884&format=png&color=000000' alt="Delete" />
                                                                    </i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                    </div>
                </div>


                


                <h1 className='titre'>Demandes</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="">
                            <div className="table-responsive">
                            <table className="table project-list-table table-nowrap align-middle table-borderless">
    <thead>
        <tr>
            <th scope="col">nom</th>
            <th scope="col">Position</th>
            <th scope="col">Email</th>
            <th scope="col">Date</th>
            <th scope="col" style={{ width: '200px' }}>Action</th>
        </tr>
    </thead>
    <tbody>
        {/* Sort reqdata by date in descending order */}
        {reqdata
            .sort((a, b) => new Date(b.request_date) - new Date(a.request_date))  // Sort by request_date (latest first)
            .map((d, i) => (
                <tr key={i}>
                    <td>
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt=""
                            className="avatar-sm rounded-circle me-2"
                        />
                        <a href="#" className="text-body">{d.name}</a>
                    </td>
                    <td>
                        <span className="badge badge-soft-success mb-0">{d.position}</span>
                    </td>
                    <td>{d.email}</td>
                    <td>{new Date(d.request_date).toLocaleDateString()}</td>  {/* Format and display date */}
                    <td>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <a
                                    href="javascript:void(0);"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Edit"
                                    className="px-2 text-primary"
                                >
                                    <i className="iconedit">
                                        <img onClick={() => handleAdd(d)} src='https://img.icons8.com/?size=100&id=63262&format=png&color=000000'></img>
                                    </i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a
                                    href="javascript:void(0);"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Delete"
                                    className="px-2 text-danger"
                                >
                                    <i className="icondel">
                                        <img onClick={() => handleDelete(d)} src='https://img.icons8.com/?size=100&id=-rqk5MHCmR3K&format=png&color=000000'></img>
                                    </i>
                                </a>
                            </li>
                        </ul>
                    </td>
                </tr>
            ))}
    </tbody>
</table>

                            </div>
                        </div>
                    </div>
                </div>




                <h1 className='titre'>Liste des utilisateurs</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="">
                            <div className="table-responsive">
                            <table className="table project-list-table table-nowrap align-middle table-borderless">
    <thead>
        <tr>
            <th scope="col">nom</th>
            <th scope="col">Position</th>
            <th scope="col">Email</th>
            <th scope="col" style={{ width: '200px' }}>Action</th>
        </tr>
    </thead>
    <tbody>
        {/* Sort adminusers by name in alphabetical order */}
        {adminusers
            .sort((a, b) => a.name.localeCompare(b.name))  // Sort by name alphabetically
            .map((au, i) => (
                <tr key={i}>
                    <td>
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt=""
                            className="avatar-sm rounded-circle me-2"
                        />
                        <a href="#" className="text-body">{au.name}</a>
                    </td>
                    <td>
                        <span className="badge badge-soft-success mb-0">{au.position}</span>
                    </td>
                    <td>{au.email}</td>
                    <td>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <a
                                    href="javascript:void(0);"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Delete"
                                    className="px-2 text-danger"
                                >
                                    <i className="icondel">
                                        <img onClick={() => handleDeleteuser(au)} src='https://img.icons8.com/?size=100&id=67884&format=png&color=000000'></img>
                                    </i>
                                </a>
                            </li>
                        </ul>
                    </td>
                </tr>
            ))}
    </tbody>
</table>

                            </div>
                        </div>
                    </div>
                </div>




                
            </div>


                
    </>
        </div>
    );
}

export default Admin;