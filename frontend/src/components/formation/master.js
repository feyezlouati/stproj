import React, { useEffect, useState } from 'react';
import './these.css';

function Mast() {
    // Initialize as an empty array to avoid the map error
    const [mastp, setMastp] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/master")
            .then(res => res.json())
            .then(data => { 
                setMastp(data); // Assuming data is an array
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='booody'>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <div className="container">
                <section className="section mb-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-xl-7 text-center desc"></div>
                        </div>
                    </div>
                </section>
                <section className="section pt-0">
                    <div className="container">
                        <div className="row gy-4 justify-content-center">
                            {mastp.length > 0 ? (
                                mastp.map((d, i) => (
                                    <div className="col-sm-6 col-md-6 col-lg-4" key={i}>
                                        <div className="card">
                                            <div className="card-body d-flex">
                                                <div className="icon-lg bg-primary rounded-3 text-white"><i className="fa fa-check"></i></div>
                                                <div className="ps-3 col">
                                                    
                                                    <p className="m-0">{d.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Mast;
