import './publication.css';
import React, { useEffect, useState } from 'react';

function Pub() {
    const [groupedPubs, setGroupedPubs] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/publications")
            .then(res => res.json())
            .then(data => {
                const grouped = data.reduce((acc, pub) => {
                    const { year } = pub;
                    if (!acc[year]) {
                        acc[year] = [];
                    }
                    acc[year].unshift(pub); // Add the publication to the beginning of the array
                    return acc;
                }, {});
                setGroupedPubs(grouped);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="accordion accordion-flush pubs" id="accordionFlushExample">
            {Object.keys(groupedPubs).sort((a, b) => b - a).map((year, i) => ( // sort years in descending order
                <div className="accordion-item" key={i}>
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${year}`} aria-expanded="false" aria-controls={`flush-collapse-${year}`}>
                            <b>Publications {year}</b>
                        </button>
                    </h2>
                    <div id={`flush-collapse-${year}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        {groupedPubs[year].map((sh, j) => ( // publications are already in reversed order (latest first)
                            <div key={j} className="accordion-body">
                                <div>Publication de <b>{sh.email}</b></div>
                                <div>{sh.pub}</div>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Pub;
