import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './news.css';
function News() {
    const { title } = useParams(); // Get the title from the URL
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetch(`http://localhost:8080/actualite/${encodeURIComponent(title)}`)
            .then(res => res.json())
            .then(data => {
                setData(data[0]); // Expecting an array, take the first item
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Set loading to false in case of error
            });
    }, [title]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data found</div>;
    }

    return (
        <div className="container db-social">
      <div className="jumbotron jumbotron-fluid"></div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-11">
            <div className="widget head-profile has-shadow">
              <div className="widget-body pb-0">
                <div className="row d-flex align-items-center">
                  <div className="col-xl-4 col-md-4 d-flex justify-content-lg-start justify-content-md-start justify-content-center">
                    
                  </div>
                  <div className="col-xl-4 col-md-4 d-flex justify-content-center">
                    
                    <div className="infos">
                      <h2>{data.title}</h2>
                      <img className='imag' src={data.img} alt="img" />
                      <div className="location">{data.description}</div>
                      
                      
                    </div>
                    
                  </div>
                  <h6 className='h6n'>Resumé:</h6>
                  <div className='contents'>{data.content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default News;
