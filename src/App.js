
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About/About';
import Appointment from './pages/Appointment/Appointment';
import ContactUs from './pages/ContactUs/ContactUs';
import Home from './pages/Home/Home/Home';
import Login from './pages/Login/Login';
import RequireAuth from './pages/Login/RequireAuth';
import Reviews from './pages/Reviews/Reviews';
import Footer from './pages/Shared/Footer/Footer';
import Header from './pages/Shared/Header/Header';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/appointment' element={
        <RequireAuth>
          <Appointment/>
        </RequireAuth>}>

        </Route>
        <Route path='/contactUs' element={<ContactUs />}></Route>
        <Route path='/reviews' element={<Reviews />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        {/* <Route path='*' element={<NotFoundPage/>}></Route> */}
      </Routes>
      <Footer></Footer>
    </div>

  );
}

export default App;
