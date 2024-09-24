import './connexion.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import validation from './validationlog';
import valid from './validationsig';
import { useNavigate } from 'react-router-dom';

function Con() {
    const [isAuthenticated, setIsAuthenticated] = useState(null); 

    useEffect(() => {
        
        
        
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:8080/');
                if (res.data.Status === 'success') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error(error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();

        const switchers = [...document.querySelectorAll('.switcher')];
        switchers.forEach(item => {
            item.addEventListener('click', function() {
                switchers.forEach(item => item.parentElement.classList.remove('is-active'));
                this.parentElement.classList.add('is-active');
            });
        });
    }, []);

    // Login state and handlers
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8080/login', values)
                .then(res => {
                    if (res.data.Status === "success") {
                        navigate('/');
                        navigate(0);
                    } else {
                        alert("Aucune correspondance");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    // Signup state and handlers
    const [valuess, setValuess] = useState({
        sname: '',
        semail: '',
        spassword: '',
        sposition:''
    });

    const [errorss, setErrorss] = useState({});

    const handleInputt = (event) => {
        setValuess(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmitt = (event) => {
        event.preventDefault();
        const validationErrors = valid(valuess);
        setErrorss(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8080/signup', valuess)
                .then(res => {
                    alert("Votre demande de création de compte est envoyée à l'administrateur, veuillez attendre l'acceptation de l'administrateur.");
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    };



    if (isAuthenticated) {
        navigate('/'); // Render nothing if user is authenticated
    }

    return (
        <section className="forms-section">
            <div className="forms">
                <div className="form-wrapper is-active">
                    <button type="button" className="switcher switcher-login" >
                    Se connecter
                        <span className="underline"></span>
                    </button>
                    <form className="form form-login" onSubmit={handleSubmit}>
                        <fieldset>
                            <div className="input-block">
                                <label htmlFor="login-email">E-mail</label>
                                <input id="login-email" type="email" onChange={handleInput} name='email' />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>
                            <div className="input-block">
                                <label htmlFor="login-password">Mot de passe</label>
                                <input id="login-password" type="password" onChange={handleInput} name='password' />
                                {errors.password && <span className='text-danger'>{errors.password}</span>}
                            </div>
                        </fieldset>
                        <button type="submit" className="btn-login">Se connecter</button>
                    </form>
                </div>
                <div className="form-wrapper">
                    <button type="button" className="switcher switcher-signup">
                    S'inscrire
                        <span className="underline"></span>
                    </button>
                    <form className="form form-signup" onSubmit={handleSubmitt}>
                        <fieldset>
                            <div className="input-block">
                                <label htmlFor="signup-name">Nom</label>
                                <input id="signup-name" type="text" onChange={handleInputt} name='sname' />
                                {errorss.sname && <span className='text-danger'>{errorss.sname}</span>}
                            </div>
                            <div className="input-block">
                                <label htmlFor="signup-email">E-mail</label>
                                <input id="signup-email" type="email" onChange={handleInputt} name='semail'/>
                                {errorss.semail && <span className='text-danger'>{errorss.semail}</span>}
                            </div>
                            <div className="input-block">
                                <label htmlFor="signup-password">Mot de passe</label>
                                <input id="signup-password" type="password" onChange={handleInputt} name='spassword'/>
                                {errorss.spassword && <span className='text-danger'>{errorss.spassword}</span>}
                            </div>
                            <div className="input-block">
                                <label htmlFor="signup-position">position</label><br></br>
                                <select name='sposition' onChange={handleInputt}>
                                    <option value="" disabled selected>choisissez votre poste</option>
                                    <option value="Enseignant-chercheurs">Enseignant-chercheurs</option>
                                    <option value="Doctorants">Doctorants</option>
                                    <option value="Enseignant-chercheurs associés">Enseignant-chercheurs associés</option>
                                </select><br></br>
                                {errorss.sposition && <span className='text-danger'>{errorss.sposition}</span>}
                            </div>
                        </fieldset>
                        <button type="submit" className="btn-signup" id='signupbtn'>Continuer</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Con;
