import './tailwind.css';
import { Routes, Route } from 'react-router';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';
import { Landing } from './routes/Landing';
import { Home } from './routes/Home';
import { Register } from './routes/Register';
import { KebijakanPrivasi } from './routes/KebijakanPrivasi';
import { ArtikelDetailPage } from './routes/ArtikelDetailPage';
import { StatusBar } from './components/StatusBar';
import { useEffect, useState } from 'react';
import { ReadStatusCookieLocal } from './config/utils';



function App() {
  // to get current path location, try to save the location.pathname to cookie and read cookie value from this page
  // or make a footer status bar as a component so that we can use props to get pathname data

  return (
    <div className="bg-slate-900 flex flex-col h-screen justify-between">
      <header className="bg-slate-900 border-b-1 border-slate-300 sticky top-0 z-50">
        <MainNavbar />
      </header>
      <div className='flex-1 w-full justify-center text-gray-400'>
        <HashRouter>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/kebijakan" element={<KebijakanPrivasi />} />
            <Route exact path="/detail" element={<ArtikelDetailPage />} />
          </Routes>
        </HashRouter>
      </div>
      <footer className='sticky bottom-0 z-20'>
        <StatusBar />
      </footer>
    </div>
  );
}

export default App;
