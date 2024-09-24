import './carousel.css';
function Carousel(){
    return(
        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="10000">
            <img src="https://enetcom.rnu.tn/storage/menu/DZM2DkHAHArtb9R09LKDAfjNBSSqlq9PH2fCwTXH.png" class="d-block w-100" alt="enetcom"></img>
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="https://enetcom.rnu.tn/storage/menu/WILNATrADf0ylazsKd0ZG1qF3ITkth4RGZX7rHrl.png" class="d-block w-100" alt="enetcom"></img>
          </div>
          <div class="carousel-item">
            <img src="https://cdn.mos.cms.futurecdn.net/BFY8VDeT6P3KSZMXftgoia.jpg" class="d-block w-100" alt="ene"></img>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

    );
}
export default Carousel;