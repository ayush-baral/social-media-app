import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position='bottom-right' />
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
