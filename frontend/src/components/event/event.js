import React, { useEffect, useState } from 'react';
import './event.css';



const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.log(err));
    }, []);



  return (
<section class="container ss">
    <h1 className='h1e'>evenements</h1>
    {events.map((e, i) =>(

    
    <div class="roww" key={i}>
        <article class="cardd fl-left">
        <section class="date">
            <time datetime="23th feb">
            <span>ESSE</span>
            </time>
        </section>
        <section class="cardd-cont">
            <h3>{e.title}</h3>
            <div class="even-date">
            <i class="fa fa-calendar"></i>
            <time>
            <span>{e.date}</span>
            </time>
            </div>
            <div class="even-info">
            <i class="fa fa-map-marker"></i>
            <p>
               {e.location}
            </p>
            </div>
            
        </section>
        </article>
        
    </div>
    ))}
</section>
  );
};

export default Events;