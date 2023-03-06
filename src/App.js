import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import { toast, Toaster } from 'react-hot-toast';
import SignIn from './Pages/SignIn';
import NotAuthenticatedPaths from './Components/HOC/NotAuthenticatedPaths';
import AuthenticatedPaths from './Components/HOC/AuthenticatedPaths';
import Profile from './Pages/Profile';
import { useEffect, useState } from 'react';
import { onMessageListener, requestForToken } from './firebase';

function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    requestForToken(setTokenFound);
  }, []);

  onMessageListener().then((payload) => {
    setNotification({
      title: payload.notification.title,
      body: payload.notification.body,
    });
    console.log(payload);
  });

  useEffect(() => {
    if (notification?.title) {
      setShowNotification(true);
    }
  }, [notification?.title]);

  useEffect(() => {
    if (!showNotification) return;
    toast.success(<Display />);
    setShowNotification(false);
  }, [showNotification]);

  function Display() {
    return (
      <div>
        <h4>{notification?.title}</h4>
        <p>{notification?.body}</p>
      </div>
    );
  }

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
              <AuthenticatedPaths>
                <Profile />
              </AuthenticatedPaths>
            }
            path='/profile'
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
