import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Notes from './pages/Notes';
import Users from './pages/Users';
import UserEmail from './pages/UserEmail';
import NoteEmail from './pages/NoteEmail';
import LoginForm from './pages/Login';
import RegistrationForm from './pages/Register';
import Logout from './pages/Logout';

function App() {
  const [token, setToken] = useState(true);
  const [role, setRole] = useState('normal');

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, [role]);

  const UserComponentWrapper = () => {
    const { email } = useParams();
    return <UserEmail emailUrl={email} />;
  };

  const NoteComponentWrapper = () => {
    const { email } = useParams();
    return <NoteEmail email={email} />;
  };

  return (
      <div className="App">
      <BrowserRouter>
        <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute token={token}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/notes/:email/'
          element={
            <ProtectedRoute token={token}>
              <NoteComponentWrapper />
            </ProtectedRoute>
          }
        /> 
        {role === "admin" && <Route
          path="/notes"
          element={
            <ProtectedRoute token={token}>
              <Notes />
            </ProtectedRoute>
          }
        />}
        <Route
          path='/users/:email/'
          element={
            <ProtectedRoute token={token}>
              <UserComponentWrapper />
            </ProtectedRoute>
          }
        />       
        {role === "admin" && <Route
          path="/users"
          element={
            <ProtectedRoute token={token}>
              <Users />
            </ProtectedRoute>
          }
        />}
        <Route
          path="/login"
          element={
            <ProtectedRoute token={token}>
              <LoginForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
              <RegistrationForm />
          }
        />
        <Route
          path="/logout"
          element={
              <Logout />
          }
        />
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
