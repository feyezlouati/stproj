import './profile.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Prof(){
  const { email } = useParams();
  const [infos, setInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const  [useremails, setUseremails] = useState(null);
  console.log(useremails)
  const [userpostu, setUserpostu] = useState([])
  const [userqualification, setUserqualification] = useState([]);
  const [pubcount, setPubcount] = useState(0);

  // Fetch user qualifications
  useEffect(() => {
    fetch(`http://localhost:8080/userqualification/${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => setUserqualification(data))
        .catch(err => console.log(err));
}, [email]);

// Fetch user publications
  useEffect(() => {
    fetch(`http://localhost:8080/userposts/${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => {
          const grouped = data.reduce((acc, pub) => {
              const { year } = pub;
              if (!acc[year]) {
                  acc[year] = [];
              }
              acc[year].push(pub);
              return acc;
          }, {});
          setUserpostu(grouped);
          setPubcount(data.length);
      })
        .catch(err => console.log(err));
}, [email]);
  // fetch user informations
  useEffect(() => {
    fetch(`http://localhost:8080/profile/${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => {
            setInfos(data[0]); // Expecting an array, take the first item
            setUseremails(data[0].email);
            setLoading(false); // Set loading to false once data is fetched
        })
        .catch(err => {
            console.log(err);
            setLoading(false); // Set loading to false in case of error
        });
}, [email]);
    return(
        <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="profile-user-box card-box bg-custom">
                <div className="row">
                  <div className="col-sm-6">
                    <span className="float-left mr-3">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt=""
                        className="thumb-lg rounded-circle"
                      />
                    </span>
                    <div className="media-body text-white">
                      <h4 className="mt-1 mb-1 font-18">{infos.name}</h4>
                      <p className="font-13 text-light">{infos.job}</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="text-right">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4">
              <div className="card-box">
                <h4 className="header-title mt-0">Informations Personnelles</h4>
                <div className="panel-body">
                  <p className="text-muted font-13">
                  {infos.aboutme}
                  </p>
                  <hr />
                  <div className="text-left">
                    <p className="text-muted font-13">
                      <strong>Nom et Prénom :</strong> <span className="m-l-15">{infos.name}</span>
                    </p>
                    <p className="text-muted font-13">
                      <strong>Téléphone :</strong>
                      <span className="m-l-15">(+216) {infos.phone}</span>
                    </p>
                    <p className="text-muted font-13">
                      <strong>Email :</strong> <span className="m-l-15">{infos.email}</span>
                    </p>
                    {/* <p className="text-muted font-13">
                      <strong>Equipe :</strong> <span className="m-l-15">USA</span>
                    </p> */}
                    <p className="text-muted font-13">
                      <strong>Position :</strong>{' '}
                      <span className="m-l-5">
                        <span className="flag-icon flag-icon-us m-r-5 m-t-0" title="us"></span>{' '}
                        <span>{infos.position}</span>{' '}
                      </span>
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="row">
                <div className="col-sm-4">
                  <div className="card-box tilebox-one">
                    <i className="icon-layers float-right text-muted"></i>
                    <h6 className="text-muted text-uppercase mt-0">Publications</h6>
                    <h2 className="" data-plugin="counterup">
                      {pubcount}
                    </h2>
                  </div>
                </div>
  
              </div>
                      
              <div className="card-box">
                <h4 className="header-title mt-0 mb-3 ">Qualifications
                </h4>
                <div>
                  <div>
                    {userqualification.map((uq, i) => (

                    
                    <p className="text-muted font-13 mb-0" key={i}>
                      -{uq.qualification}
                    </p>
                    ))}
                  </div>
                  
                  
                </div>
              </div>
              <div className="card-box">
                <h4 className="header-title mb-3">intérêt</h4>
                <p className="text-muted font-13">
                      <span className="m-l-5">
                        <span className="flag-icon flag-icon-us m-r-5 m-t-0" title="us"></span>{' '}
                        <span>{infos.intrest}</span>{' '}
                      </span>
                    </p>
                
              </div>
              <div className='card-box'>
    <h4 className="header-title mt-0 mb-3 ">Publications</h4>
    
    <div className="accordion accordion-flush pubs" id="accordionFlushExample">
        {/* Sort years in descending order */}
        {Object.keys(userpostu)
            .sort((a, b) => b - a) // Sort years in descending order (latest year first)
            .map((year, i) => (
                <div className="accordion-item" key={i}>
                    
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${year}`} aria-expanded="false" aria-controls={`flush-collapse-${year}`}>
                            <b>Publications {year}</b>
                        </button>
                    </h2>
                    <div id={`flush-collapse-${year}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        {/* Sort publications within the year by latest on top */}
                        {userpostu[year]
                            .sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date))  // Sort publications by date, latest first
                            .slice()
                            .reverse()
                            .map((sh, j) => (
                                <div key={j} className="accordion-body">
                                    <hr />
                                    <div>{sh.pub}</div>
                                </div>
                            ))}
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
export default Prof