import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';
import SignIn from './Pages/SignIn';
import NotAuthenticatedPaths from './Components/HOC/NotAuthenticatedPaths';
import AuthenticatedPaths from './Components/HOC/AuthenticatedPaths';

function App() {
  return (
    <>
      <Toaster position='bottom-right' />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AuthenticatedPaths>
                <Home />
              </AuthenticatedPaths>
            }
            path='/'
          />
          <Route
            element={
              <NotAuthenticatedPaths>
                <SignUp />
              </NotAuthenticatedPaths>
            }
            path='/signup'
          />
          <Route
            element={
              <NotAuthenticatedPaths>
                <SignIn />
              </NotAuthenticatedPaths>
            }
            path='/signin'
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
