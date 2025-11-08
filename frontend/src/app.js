import React, { useState } from 'react';
import Login from './components/Login';
import UserList from './components/userList';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <h3>Bienvenido, {user.nombre}</h3>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
          <UserList />
        </>
      )}
    </div>
  );
};

export default App;