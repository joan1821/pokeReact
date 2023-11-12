import '../styles/App.css';
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Main from './Main';
import AboutMe from './AboutMe';

const Root = () => {
  return (
    <>
      <div className="navbar">
        <Link to="/">Pokedex</Link>
        <Link to="/AboutMe">About</Link>
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/AboutMe" element={<AboutMe />} />
      </Routes>
    </>
  );
};

export default Root;
