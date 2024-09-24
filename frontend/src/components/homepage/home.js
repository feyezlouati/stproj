import Carousel from './carousel';
import Slid from './slider';
import Admin from '../admin/admin';
function Home() {
  return (
    <div className="nn">
      
      <Carousel />
      <h1 className='titre'>Présentation</h1>
      <div class="card-box">
      <h6 className='text'>Le Laboratoire des Systèmes Electroniques Avancés et de l’Energie Durable  (ESSE) a été créé en Septembre 2016.
 
 Coté ressources humaines, le laboratoire comprend 04 Professeurs, 02 Maitres de Conférences, 08 Maitres Assistants, 03 Docteurs, et 22 Doctorants.
  
 Coté structure scientifique. Les travaux de recherche menés au sein du laboratoire s’articulent autour de deux programmes de recherche comprenant chacun trois projets
 Le Laboratoire des Systèmes Electroniques Avancés et de l’Energie Durable  (ESSE) a été créé en Septembre 2016.
 
 Coté ressources humaines, le laboratoire comprend 04 Professeurs, 02 Maitres de Conférences, 08 Maitres Assistants, 03 Docteurs, et 22 Doctorants.
  
 Coté structure scientifique. Les travaux de recherche menés au sein du laboratoire s’articulent autour de deux programmes de recherche comprenant chacun trois projets</h6>
 </div>
      <h1 className='titre'>nouvelles</h1>
      <Slid />
      
    
      
    </div>
  );
}

export default Home;
