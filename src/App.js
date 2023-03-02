import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<SignUp />} path='/signup' />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
