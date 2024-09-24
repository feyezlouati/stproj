



import { Form, Route, Routes } from 'react-router-dom';
import Home from './components/homepage/home';
import Nav from './components/homepage/navbar';
import Con from './components/login/connexion';
import Admin from './components/admin/admin';
import News from './components/news/news';
import Memeber from './components/members/members';
import User from './components/user/user';
import Prof from './components/profile/profile';
import Events from './components/event/event';
import Footer from './components/homepage/footer';
import Pub from './components/publications/publication';

import Mast from './components/formation/master';
import Pfe from './components/formation/pfe';
import Pfa from './components/formation/pfa';
import These from './components/formation/these';
function App() {
  return (
    <div className="container">
      <Nav/>
      <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/con" exact element={<Con />} />
      <Route path="/admin" exact element={<Admin />} />
      <Route path="/news/:title" exact element={<News />} />
      <Route path="/members" exact element={<Memeber />} />
      <Route path="/user" exact element={<User />} />
      <Route path="/profile/:email" exact element={<Prof />} />
      <Route path="/evenements" exact element={<Events />} />
      <Route path="/publications" exact element={<Pub />} />
      <Route path="/master" exact element={<Mast />} />
      <Route path="/pfe" exact element={<Pfe />} />
      <Route path="/pfa" exact element={<Pfa />} />
      <Route path="/these" exact element={<These />} />
      </Routes>
      <Footer />
      
    </div>
  );
}

export default App;
