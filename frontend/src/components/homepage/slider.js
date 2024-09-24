import React, { useEffect, useRef, useState } from 'react';
import './slider.css';

function Slid() {
    const [data, setData] = useState([]);
    const [specifiedNew , setSpecifiedNew]=useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/actualite')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    const wrapperRef = useRef(null);
    const carouselRef = useRef(null);
    const timeoutIdRef = useRef(null);
    let isDragging = false;
    let startX, startScrollLeft;
    const isAutoPlay = true;

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const carousel = carouselRef.current;
        if (!wrapper || !carousel) return;

        const firstCard = carousel.querySelector(".card");
        if (!firstCard) return; // Early return if there are no cards yet

        const firstCardWidth = firstCard.offsetWidth;
        const arrowBtns = wrapper.querySelectorAll("i");
        const carouselChildren = [...carousel.children];

        let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

        // Insert copies of the last few cards to beginning of carousel for infinite scrolling
        carouselChildren.slice(-cardPerView).reverse().forEach(card => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

        // Insert copies of the first few cards to end of carousel for infinite scrolling
        carouselChildren.slice(0, cardPerView).forEach(card => {
            carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });

        // Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");

        const handleArrowClick = (e) => {
            carousel.scrollLeft += e.target.id === "left" ? -firstCardWidth : firstCardWidth;
        };

        arrowBtns.forEach(btn => {
            btn.addEventListener("click", handleArrowClick);
        });

        const dragStart = (e) => {
            isDragging = true;
            carousel.classList.add("dragging");
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
        };

        const dragging = (e) => {
            if (!isDragging) return;
            carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        };

        const dragStop = () => {
            isDragging = false;
            carousel.classList.remove("dragging");
        };

        const infiniteScroll = () => {
            if (carousel.scrollLeft === 0) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
                carousel.classList.remove("no-transition");
            } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.offsetWidth;
                carousel.classList.remove("no-transition");
            }
            clearTimeout(timeoutIdRef.current);
            if (!wrapper.matches(":hover")) autoPlay();
        };

        const autoPlay = () => {
            if (window.innerWidth < 800 || !isAutoPlay) return;
            timeoutIdRef.current = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
        };

        autoPlay();

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("scroll", infiniteScroll);
        wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutIdRef.current));
        wrapper.addEventListener("mouseleave", autoPlay);

        // Cleanup function to remove event listeners
        return () => {
            arrowBtns.forEach(btn => {
                btn.removeEventListener("click", handleArrowClick);
            });
            carousel.removeEventListener("mousedown", dragStart);
            carousel.removeEventListener("mousemove", dragging);
            document.removeEventListener("mouseup", dragStop);
            carousel.removeEventListener("scroll", infiniteScroll);
            wrapper.removeEventListener("mouseenter", () => clearTimeout(timeoutIdRef.current));
            wrapper.removeEventListener("mouseleave", autoPlay);
        };
    }, [data]); // Dependency array to re-run effect when data changes

    return (
        <div className='body'>
            <div className="wrapper" ref={wrapperRef}>
                <i id="left" className="fa-solid fa-angle-left"></i>
                <ul className="carousel f" ref={carouselRef}  >
                    {data.map((d, i) => (
                        
                        <li className="card" key={i} >
                            <div className="img">
                            <a href={`/news/${encodeURIComponent(d.title)}`}><img src={d.img} alt="img" draggable="false" /></a>
                            </div>
                            <h2>{d.title}</h2>
                            <span>{d.description}</span>
                        </li>
                        
                    ))}
                </ul>
                <i id="right" className="fa-solid fa-angle-right"></i>
            </div>
        </div>
    );
}

export default Slid;
/*
import react,{useEffect, useState} from 'react';
function App() {
    const [data, setData]=useState([])
    useEffect(() => {
      fetch('http://localhost:8080/tes')
      .then(res => res.json())
      .then(data => setData(data))
      .then(err => console.log(err));
    }, [])
    return (
    <div className="App">
      <table>
        <tbody>
          {data.map((d,i) =>(
            <tr key={i}>
              <td>
                  {d.nom}
              </td>
              <td>
                {d.mdps}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;*/
