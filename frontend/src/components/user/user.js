import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';

function User() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    // const for user informations
    const [userEmail, setUserEmail] = useState('');
    const [job, setJob] = useState('');
    const [phone, setPhone] = useState('');
    const [about, setAbout] = useState('');
    const [position, setPosition] = useState('');
    const [name, setName] = useState('');
    const [intrest, setIntrest] = useState('');
    const initialUserinfo = {
        userphone: '',
        userjob: '',
        userabout: ''
    };
    const [userinfo, setUserinfo] = useState(initialUserinfo);
    
    // const for user posts
    const [pub, setPub] = useState({ postfield: '' });
    const [showpubs, setShowpubs] = useState([]);
    const [editPost, setEditPost] = useState({ id: null, newpub: '' });

    // const for user qualifications
    const [qualification , setQualification] = useState({
        userqualification: ''
    })
    const [showqualifications , setShowqualifications] = useState([]);
    const [qid , setQid] = ([]);
    // const for user intrest
    const [userintrest, setUserintrest] = useState({
        userintres: ''
    });
    const navigate = useNavigate();

    // adding user intrest
    
    const handleInputintrest = (qual) => {
        setUserintrest(prev => ({ ...prev, [qual.target.name]: qual.target.value }));
    };

    const addintrest = (qual) => {
        qual.preventDefault();
        axios.post('http://localhost:8080/adduserintrest', userintrest, { withCredentials: true })
            .then(res => {
                alert('intérêt ajouté avec succès');
                setUserintrest({ userintres: '' });

            })
            .catch(err => console.log(err));
    };



    // adding user qualification
    const handleInputQualification = (qual) => {
        setQualification(prev => ({ ...prev, [qual.target.name]: qual.target.value }));
    };

    const addqualification = (qual) => {
        qual.preventDefault();
        axios.post('http://localhost:8080/addqualification', qualification, { withCredentials: true })
            .then(res => {
                alert('qualification ajoutée avec succès');
                setQid(res.data.qid);
                setQualification({ userqualification: '' });

            })
            .catch(err => console.log(err));
    };

       // delete user qualification
       const handleDeleteQualification = (sq) => {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette qualification?');
        if (confirmed) {
            axios.post('http://localhost:8080/deletequalification', { qid: sq.qid }, { withCredentials: true })
                .then(res => {
                    if (res.data.Status === 'success') {
                        setShowqualifications(showqualifications.filter(p => p.qid !== sq.qid));
                        alert('qualification supprimée avec succès');
                    } else {
                        alert('Erreur lors de la suppression de la qualification');
                    }
                })
                .catch(err => console.log(err));
        }
    };
    // adding user infos
    const handleInput = (event) => {
        setUserinfo(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const addinfos = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/adduserinfo', userinfo, { withCredentials: true })
            .then(res => {
                if (res.data.Status === 'success') {
                    alert('Informations ajoutées avec succès');
                    setUserinfo(initialUserinfo); // Reset form fields
                } else {
                    alert("Erreur lors de l'ajout d'informations");
                }
            })
            .catch(err => console.log(err));
    };
    // delete user post
    const handleDeletepost = (post) => {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce message?');
        if (confirmed) {
            axios.post('http://localhost:8080/deletepost', { id: post.id }, { withCredentials: true })
                .then(res => {
                    if (res.data.Status === 'success') {
                        setShowpubs(showpubs.filter(p => p.id !== post.id));
                        alert('Message supprimé avec succès');
                    } else {
                        alert('Erreur lors de la suppression du message');
                    }
                })
                .catch(err => console.log(err));
        }
    };
    // add user post
    const handleInputpost = (e) => {
        setPub(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addpost = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/addpost', pub, { withCredentials: true })
            .then(res => {
                setShowpubs([...showpubs, { id: res.data.data.insertId, pub: pub.postfield }]); 
                setPub({ postfield: '' });
            })
            .catch(err => console.log(err));
    };
    // edit user post
    const openEditModal = (post) => {
        setEditPost({ id: post.id, newpub: post.pub });
    };

    const handleEditPostChange = (e) => {
        setEditPost({ ...editPost, newpub: e.target.value });
    };

    const modifyPost = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/modifyposts', editPost, { withCredentials: true })
            .then(res => {
                if (res.data.Status === 'success') {
                    setShowpubs(showpubs.map(post => post.id === editPost.id ? { ...post, pub: editPost.newpub } : post));
                    setEditPost({ id: null, newpub: '' });
                } else {
                    alert('Erreur lors de la modification du message');
                }
            })
            .catch(err => console.log(err));
    };
    // fetch user posts
    useEffect(() => {
        axios.get('http://localhost:8080/posts', { withCredentials: true })
            .then(res => {
                setShowpubs(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    // fetch user informations
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await fetch("http://localhost:8080/showuserinfos", {
                    credentials: 'include',
                });
                const data = await res.json();
                if (data) {
                    setAbout(data.aboutme);
                    setJob(data.job);
                    setPhone(data.phone);
                    setPosition(data.position);
                    setName(data.name);
                    setIntrest(data.intrest);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchUserInfo();
    }, []);
     // fetch user qualification
     useEffect(() => {
        axios.get('http://localhost:8080/userqualifications', { withCredentials: true })
            .then(res => {
                setShowqualifications(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:8080/', { withCredentials: true });
                if (res.data.Status === 'success') {
                    setIsAuthenticated(true);
                    setUserEmail(res.data.email);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error(error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="container">
            <div className="profile-wrapper">
                <div className="profile-section-user">
                    <div className="profile-cover-img">
                        <img src="https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg" alt="" />
                    </div>
                    <div className="profile-info-brief p-3">
                        <img className="img-fluid user-profile-avatar" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" />
                        <div className="text-center">
                            <h5 className="text-uppercase mb-4">{name}</h5>
                            <p className="text-muted fz-base">{about}</p>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="hidden-sm-down">
                        <hr className="m-0" />
                        <div className="profile-info-contact p-4">
                            <h6 className="mb-3">Coordonnées</h6>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><strong>EMAIL:</strong></td>
                                        <td>
                                            <p className="text-muted mb-0">{userEmail}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>TELEPHONE:</strong></td>
                                        <td>
                                            <p className="text-muted mb-0">{phone}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr className="m-0" />
                        <div className="profile-info-general p-4">
                            <h6 className="mb-3">Informations générales</h6>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><strong>EMPLOI:</strong></td>
                                        <td>
                                            <p className="text-muted mb-0">{job}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>POSITION:</strong></td>
                                        <td>
                                            <p className="text-muted mb-0">{position}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr className="m-0" />
                        <div className="profile-info-general p-4">
                            <h6 className="mb-3">Qualifications</h6>
                            <table className="table">
                                <tbody>
                                {showqualifications.map((sq, i) =>  (
                                    <tr key={i}>
                                        <td><strong>-</strong></td>
                                        <td>
                                            <p className="text-muted mb-0">{sq.qualification}</p>
                                        </td>
                                        <td>
                                        <i className="icondelit"><img onClick={() => handleDeleteQualification(sq)} className='openedit' src='https://img.icons8.com/?size=100&id=67884&format=png&color=000000'/></i>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <hr className="m-0" />
                        <div className="profile-info-general p-4">
                            <h6 className="mb-3">Intérêts de recherche</h6>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>
                                            {intrest}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <hr className="m-0" />
                        <div className="profile-info-general p-4">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Saisir les informations
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <form onSubmit={addinfos}>
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td><strong>EMPLOI:</strong></td>
                                                        <td>
                                                            <input type='text' name='userjob' placeholder='entrez votre emploi' value={userinfo.userjob} onChange={handleInput} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>TELEPHONE:</strong></td>
                                                        <td>
                                                            <input type='text' name='userphone' placeholder='entrez votre numero de Telphone' value={userinfo.userphone} onChange={handleInput} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>SUR MOI:</strong></td>
                                                        <td>
                                                            <textarea placeholder='Écrivez sur vous-même' value={userinfo.userabout} onChange={handleInput} name='userabout'></textarea>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2">
                                                            <button type='submit' className='btn btn-success px-4 py-1'>Soumettre</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                    </div>
                                </div>

                                
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Entrez vos qualifications
                                    </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <form onSubmit={addqualification}>
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td><strong>qualification:</strong></td>
                                                        <td>
                                                            <input type='text' name='userqualification' placeholder='entrez votre qualification' value={qualification.userqualification} onChange={handleInputQualification} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2">
                                                            <button type='submit' className='btn btn-success px-4 py-1'>Soumettre</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                    </div>
                                    </div>
                                </div>


                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsethree" aria-expanded="false" aria-controls="collapseTwo">
                                        Enter your intrest
                                    </button>
                                    </h2>
                                    <div id="collapsethree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <form onSubmit={addintrest}>
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td><strong>intérêt:</strong></td>
                                                        <td>
                                                            <input type='text' name='userintres' placeholder='Entrez votre intérêt' value={userintrest.userintres} onChange={handleInputintrest} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2">
                                                            <button type='submit' className='btn btn-success px-4 py-1'>Soumettre</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <hr className="m-0" />
                    </div>
                </div>
                <div className="profile-section-main">
    <ul className="nav nav-tabs profile-tabs" role="tablist">
        <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#profile-overview" role="tab">chronologie</a></li>
    </ul>
    <div className="tab-content profile-tabs-content">
        <div className="tab-pane active" id="profile-overview" role="tabpanel">
            <div className="post-editor">
                <form onSubmit={addpost}>
                    <textarea name="postfield" id="post-field" className="post-field" placeholder="Ajouter un nouveau message" value={pub.postfield} onChange={handleInputpost}></textarea>
                    <div className="d-flex">
                        <button type='submit' className="btn btn-success px-4 py-1">publier</button>
                    </div>
                </form>
            </div>
            
            <div className="stream-posts">
                {showpubs
                    .slice() // Create a copy of the array (to avoid mutating the original)
                    .reverse() // Reverse the array to show the latest post first
                    .map((d, i) =>  (
                    
                    <div className="stream-post" key={i} >
                        
                        <div className="sp-author">
                            <a href="#" className="sp-author-avatar"><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" /></a>
                            <h6 className="sp-author-name"><a href="#">{name}</a></h6>
                            
                        </div>
                        <div className="sp-content">
                            <p>{d.pub}</p>
                            <i className="iconmod">
                                <img 
                                    src='https://img.icons8.com/?size=100&id=48&format=png&color=000000' 
                                    className="openedit" 
                                    data-bs-toggle="modal" 
                                    data-bs-target={`#modal-${d.id}`}
                                    onClick={() => openEditModal(d)}
                                />
                            </i>
                            <i className="icondelit"><img onClick={() => handleDeletepost(d)} className='openedit' src='https://img.icons8.com/?size=100&id=67884&format=png&color=000000'/></i>
                        </div>

                        
                        <div className="modal fade" id={`modal-${d.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modifier votre Poste</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={modifyPost}>
                                            <div className="mb-3">
                                                <label htmlFor="message-text" className="col-form-label">Poste:</label>
                                                <br />
                                                <textarea 
                                                    placeholder='Modify your post' 
                                                    className='newpub' 
                                                    value={editPost.newpub} 
                                                    onChange={handleEditPostChange}
                                                />
                                            </div>
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                            <button type="submit" className="btn btn-primary">Modifier</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    </div>
</div>

            </div>
        </div>
    );
}

export default User;
