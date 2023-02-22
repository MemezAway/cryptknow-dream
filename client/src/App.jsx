import React from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';

import { logo } from './assets';
import { dream, back } from './assets';
import { Home, CreatePost } from './page';

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      <header style={{ backgroundColor: '#1a232e' }} className="w-full flex justify-between items-center sm:px-8 px-4 py-4">
        <Link to='/'>
          <img src={logo} alt="logo" style={{ width: '6rem' }} />
        </Link>

        {location.pathname !== '/create-post' && (
          <Link to="/create-post" className="font-inter font-medium" style={{ opacity: location.pathname === '/' ? 1 : 0, transition: 'opacity 0.3s ease-out' }}>
            <img src={dream} alt="Dream" style={{ width: '6rem' }} />
          </Link>
        )}

        {location.pathname !== '/' && (
          <Link to="/" className="font-inter font-medium" style={{ opacity: location.pathname === '/create-post' ? 1 : 0, transition: 'opacity 0.3s ease-out' }}>
            <img src={back} alt="Back" style={{ width: '6rem' }} />
          </Link>
        )}
      </header>

      

      <main style={{ backgroundColor: '#1a232e', minHeight: 'calc(100vh - 73px)' }} className="sm:p-8 px-4 py-8 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
