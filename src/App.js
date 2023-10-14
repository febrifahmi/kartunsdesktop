import './tailwind.css';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';
import { Landing } from './routes/Landing';
import { Home } from './routes/Home';
import { StatusBar } from './components/StatusBar';
import { useState } from 'react';



function App() {
  // to get current path location, try to save the location.pathname to cookie and read cookie value from this page
  // or make a footer status bar as a component so that we can use props to get pathname data
  const [status, setStatus] = useState();
  const getStatus = (message) => {
    setStatus(message)
  }

  return (
    <div className="bg-slate-900 flex flex-col h-screen justify-between">
      <header className="bg-slate-900 border-b-1 border-slate-300 sticky top-0 z-50">
        <MainNavbar />
      </header>
      <div className='flex-1 w-full justify-center text-gray-400'>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
      <footer className='sticky bottom-0'>
        <StatusBar getStatus={getStatus} />
      </footer>
    </div>
  );
}

export default App;
