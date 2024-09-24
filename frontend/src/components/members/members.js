import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './members.css';

function Member() {
    const [adminmembers, setAdminmembers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/members')
            .then(res => res.json())
            .then(data => setAdminmembers(data))
            .catch(err => console.log(err));
    }, []);

    // Filter members with position === "doctorants, Enseignant-chercheurs, Enseignant-chercheurs associés"
    const doctorantsMembers = adminmembers.filter(member => member.position === "Doctorants");
    const researshmembers = adminmembers.filter(member => member.position === "Enseignant-chercheurs");
    const researshersmembers = adminmembers.filter(member => member.position === "Enseignant-chercheurs associés");
    
    return (
        <div>
            <h5 className='titree'>Enseignants-chercheurs</h5>
            
                <div className="table-responsive">
                    <MDBTable align='middle' className="table">
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>Nom</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Position</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {researshmembers .map((am, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg'
                                                alt=''
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <a href={`/profile/${encodeURIComponent(am.email)}`}><p className='fw-bold mb-1'>{am.name}</p></a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='text-muted mb-0'>{am.email}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{am.position}</p>
                                    </td>
                                </tr>
                            ))}
                            <br></br><br></br><br></br>
                            <h5 className='titree long'>Enseignant-chercheurs associés</h5>
                            <tr className='greycol'>
                                <th scope='col' className='greycol'>Nom</th>
                                <th scope='col' className='greycol'>Email</th>
                                <th scope='col' className='greycol'>Position</th>
                            </tr>
                            {researshersmembers.map((am, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg'
                                                alt=''
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                            <a href={`/profile/${encodeURIComponent(am.email)}`}><p className='fw-bold mb-1'>{am.name}</p></a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='text-muted mb-0'>{am.email}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{am.position}</p>
                                    </td>
                                </tr>
                            ))}
                            <br></br><br></br><br></br>
                            <h5 className='titree long'>Doctorants</h5>
                            
                            <tr className='greycol'>
                                <th scope='col' className='greycol'>Nom</th>
                                <th scope='col' className='greycol'>Email</th>
                                <th scope='col' className='greycol'>Position</th>
                            </tr>
                            
                            {doctorantsMembers.map((am, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg'
                                                alt=''
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                            <a href={`/profile/${encodeURIComponent(am.email)}`}><p className='fw-bold mb-1'>{am.name}</p></a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='text-muted mb-0'>{am.email}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{am.position}</p>
                                    </td>
                                </tr>
                                
                            ))}
                            
                        </MDBTableBody>
                    </MDBTable>
                </div>
            

            
            

        </div>



    );
}

export default Member;


                