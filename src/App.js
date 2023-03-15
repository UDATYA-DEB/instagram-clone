import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import { useLocation } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useFirebase } from './context/firebase';



function App() {

  const firebaseContext = useFirebase()
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='profile' element={<Profile />}/>
          <Route path='signup' element={<Signup/>}/>
          <Route path='login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
