/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiFillCar } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { FcUp } from 'react-icons/fc';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { BsCart } from 'react-icons/bs';
import Cookies from 'js-cookie';
import { navLinks } from '../constants';
import Theme from './Theme';
import { Store } from '@/utils/Store';

const Navbar = ({ onThemeChange }) => {
  const homeRef = useRef(null);
  const navRef = useRef(null);
  const rocketRef = useRef(null);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { status, data: session } = useSession();

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const homeFunc = () => {
    if (
      document.body.scrollTop > 80
      || document.documentElement.scrollTop > 80
    ) {
      homeRef.current?.classList?.add('home_nav');
      navRef.current?.classList?.add('nav_fix');
      rocketRef.current?.classList?.add('open');
    } else {
      homeRef.current?.classList?.remove('home_nav');
      navRef.current?.classList?.remove('nav_fix');
      rocketRef.current?.classList?.remove('open');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', homeFunc);

    return () => window.removeEventListener('scroll', homeFunc);
  }, []);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <header ref={homeRef} className="fixed w-full ">
      <nav ref={navRef} className="w-full z-50 container !h-10 navbar mx-auto">
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
          <Link href="/cart" className="btn btn-circle">
            <div className="indicator">
              <span className="indicator-item badge badge-secondary">
                {cartItemsCount}
              </span>
              <BsCart className="m-3" />
            </div>
          </Link>
          {status === 'loading' ? (
            <span className="loading loading-bars loading-xs" />
          ) : session?.user ? (
            <div className="">
              {session.user.name}{' '}
              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn m-1">
                  Click
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href="/">Perfil</Link>
                  </li>
                  <li>
                    <Link href="/User/ViewCars">Veículos</Link>
                  </li>
                  <li>
                    <button type="button" onClick={logoutClickHandler}>
                      Sair
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link href="/login" className="btn flex btn-outline">
              <FiLogIn />
              <p>Entrar</p>
            </Link>
          )}
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
