/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useRef } from 'react';
import { AiFillCar } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { FcUp } from 'react-icons/fc';
import { useSession } from 'next-auth/react';
import { navLinks } from '../constants';
import Theme from '../Theme';

const Navbar = ({ onThemeChange }) => {
  const { data: session } = useSession();
  const homeRef = useRef(null);
  const navRef = useRef(null);
  const rocketRef = useRef(null);

  const homeFunc = () => {
    if (
      document.body.scrollTop > 80
      || document.documentElement.scrollTop > 80
    ) {
      homeRef.current.classList.add('home_nav');
      navRef.current.classList.add('nav_fix');
      rocketRef.current.classList.add('open');
    } else {
      homeRef.current.classList.remove('home_nav');
      navRef.current.classList.remove('nav_fix');
      rocketRef.current.classList.remove('open');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', homeFunc);

    return () => window.removeEventListener('scroll', homeFunc);
  }, []);
  return (
    <header ref={homeRef} className="fixed w-full ">
      <nav ref={navRef} className="w-full z-50 container !h-10 navbar mx-auto">
        {session.user.name}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url}>{link.name}</a>
                  {link.parent && (
                    <ul className="p-2">
                      {link.parent.map((submenu, subIndex) => (
                        <li key={subIndex}>
                          <a href={submenu.url}>{submenu.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <a
              href="/"
              className="normal-case flex justify-center gap-2 items-center text-2xl"
            >
              <AiFillCar />
              <p>AutoMaster</p>
            </a>
          </div>
          <Theme onThemeChange={onThemeChange} />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal z-10 text-xl px-1">
            {navLinks.map((link, index) => (
              <li key={index}>
                {link.parent ? (
                  <details>
                    <summary>{link.name}</summary>
                    <ul className="p-2 bg-base-300">
                      {link.parent.map((sublink, subindex) => (
                        <li key={subindex}>
                          <a href={sublink.url}>{sublink.name}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <a href={link.url}>{link.name}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end">
          <a href="/Login" className="btn flex btn-outline">
            <FiLogIn />
            <p>Entrar</p>
          </a>
        </div>
      </nav>
      <button
        type="button"
        ref={rocketRef}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
        className="scroll-top rounded-2xl bg-base-100 shadow-sm flex justify-center items-center open"
      >
        <FcUp className="text-white" />
      </button>
    </header>
  );
};

export default Navbar;
