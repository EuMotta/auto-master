'use client';

import { useEffect, useState } from 'react';
import '../styles/globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const RootLayout = ({ children }) => {
  const [theme, setTheme] = useState('synthwave');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    document.title = 'AutoMaster';
  }, []);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  };

  return (
    <html data-theme={theme} lang="pt">
      <head>
        <link rel="preconnect" href="https://stijndv.com" />
        <link
          rel="stylesheet"
          href="https://stijndv.com/fonts/Eudoxus-Sans.css"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <header>
          <Navbar onThemeChange={handleThemeChange} />
        </header>
        <main className="flex-grow pt-24">
          {children}
        </main>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
