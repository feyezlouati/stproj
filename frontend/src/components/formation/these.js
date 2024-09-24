import React, { useEffect, useState } from 'react';
import './these.css';

function These() {


    // Initialize as an empty array to avoid the map error
    const [thesep, setThesep] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/these")
            .then(res => res.json())
            .then(data => { 
                setThesep(data); // Assuming data is an array
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
                            {thesep.length > 0 ? (
                                thesep.map((d, i) => (
                                    <div className="col-sm-6 col-md-6 col-lg-4" key={i}>
                                        <div className="card">
                                            <div className="card-body d-flex">
                                                <div className="icon-lg bg-primary rounded-3 text-white"><i className="fa fa-check"></i></div>
                                                <div className="ps-3 col">
                                                    
                                                    <p className="m-0">{d.description}</p>
                                                    <p className="m-0">{d.pdf
                                                        }</p>
                                                    {d.pdf && (
                                                        <div> 
                                                        <a  download={d.pdf}>
                                                            Télécharger 
                                                        </a>
                                                        
                                                        <br />
                                                        </div>
                                                    )}
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
            {/* import React, { useState } from 'react';

function UploadDownloadDeletePDF() {
  
  return (
    <div>
      <h2>Choisir, télécharger et supprimer un fichier PDF</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button type="submit">Uploader le fichier</button>
      </form>

      {file && (
        <div>
          <h3>Fichier sélectionné : {file.name}</h3>
          {/* Lien pour télécharger le fichier 
          <a href={fileURL} download={file.name}>
            Télécharger {file.name}
          </a>
          <input type='text' value={file.name}></input>
          <br />
          {/* Bouton pour supprimer le fichier 
          <button onClick={handleDelete}>Supprimer le fichier</button>
        </div>
      )}
    </div>
  );
}

export default UploadDownloadDeletePDF;
your-server-url.com */}
        </div>
        
    );
}

export default These;
