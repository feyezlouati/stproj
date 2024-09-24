import { useEffect, useState } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Nav() {
    axios.defaults.withCredentials = true;
    const [auth, setAuth] = useState(false);
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(0);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080")
            .then(res => {
                if (res.data.Status === "success") {
                    setAuth(true);
                    setEmail(res.data.email); // capture the email
                    setIsAdmin(res.data.isAdmin); // capture the isAdmin status
                } else {
                    setAuth(false);
                    setMessage(res.data.message);
                }
            })
            .catch(err => {
                console.error(err);
                setAuth(false);
            });
    }, []);

    const handleLogout = () => {
        axios.get("http://localhost:8080/logout")
            .then(res => {
                if (res.data.Status === "success") {
                    setAuth(false);
                    setEmail('');
                    setIsAdmin(false);
                    navigate(0); // Reload the page using useNavigate hook
                } else {
                    alert("Logout error");
                }
            }).catch(err => console.error(err));
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Accueil</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/members">Membres</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Formation
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/these">these</a></li>
                                    <li><a className="dropdown-item" href="/pfa">pfa</a></li>
                                    <li><a className="dropdown-item" href="/master">master</a></li>
                                    <li><a className="dropdown-item" href="/pfe">pfe</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Productions
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/publications">publications</a></li>
                                    <li><a className="dropdown-item" href="#">---</a></li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><a className="dropdown-item" href="#">---</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/evenements">Evénements</a>
                            </li>

                            {auth ?
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/user">profile</a> 
                                    </li>
                                    <li className="nav-item">
                                        {isAdmin ?
                                            <li className="nav-item">
                                                <a className="nav-link" href="/admin">Admin</a> 
                                            </li>
                                            
                                            :
                                            <li className="nav-item">
                                                <p></p>
                                            </li>
                                        }
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={handleLogout}>Déconnexion</a>
                                    </li>

                                </>
                                :
                                <li className="nav-item">
                                    <Link to="/con" className="nav-link">Connexion</Link>
                                </li>
                            }
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
        
    );
}

export default Nav;
