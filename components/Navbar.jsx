/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiFillCar } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { FcUp } from 'react-icons/fc';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { BsCart, BsMoon, BsSun } from 'react-icons/bs';
import Cookies from 'js-cookie';
import { navLinks } from '../constants';
import { Store } from '@/utils/Store';

// const themes = ['sun', 'moon'];

const Navbar = () => {
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
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
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

  const [theme, setTheme] = useState(
    typeof window !== 'undefined' && localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : 'sun',
  );
  const toggleTheme = () => {
    const newTheme = theme === 'sun' ? 'moon' : 'sun';
    setTheme(newTheme);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      const localTheme = localStorage.getItem('theme');
      document.querySelector('html').setAttribute('data-theme', localTheme);
    }
  }, [theme]);

  return (
    <header ref={homeRef} className="fixed bg-secondary text-base-100 w-full ">
      <label className="swap swap-rotate">
        <input type="checkbox" onClick={toggleTheme} />
        <BsSun className="swap-on fill-current text-2xl text-primary" />
        <BsMoon className="swap-off fill-current text-2xl text-primary" />
      </label>
      <nav ref={navRef} className="w-full z-50 container !h-10  navbar mx-auto">
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
              className="normal-case text-primary flex justify-center gap-2 items-center text-2xl"
            >
              <AiFillCar />
              <p>AutoMaster</p>
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal z-10 gap-5 text-xl px-1">
            {!session?.user ? (
              navLinks.map((link, index) => (
                <li key={index}>
                  {link.parent ? (
                    <details>
                      <summary className="hover:btn-primary">
                        {link.name}
                      </summary>
                      <ul className="p-2 bg-secondary">
                        {link.parent.map((sublink, subindex) => (
                          <li key={subindex}>
                            <a className="hover:btn-primary" href={sublink.url}>
                              {sublink.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link className="hover:btn-primary" href={link.url}>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))
            ) : (
              <>
                <li>
                  <Link className="hover:btn-primary" href="/User/ViewCars">
                    Meus Veículos
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:btn-primary"
                    href="/User/ViewSchedules"
                  >
                    Agendamentos
                  </Link>
                </li>
                <li>
                  <Link className="hover:btn-primary" href="/User/ViewReports">
                    Relatórios
                  </Link>
                </li>
                {session?.user?.isAdmin ? (
                  <li>
                    <Link className="hover:btn-primary" href="/Admin/Dashboard">
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  ''
                )}
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="/cart" className=" hover:btn-primary rounded-full">
            <div className="indicator">
              <span className="indicator-item bg-primary text-secondary badge badge-secondary">
                {cartItemsCount}
              </span>
              <BsCart className="m-3 " />
            </div>
          </Link>
          {status === 'loading' ? (
            <span className="loading loading-bars loading-xs" />
          ) : session?.user ? (
            <div className="">
              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0}>
                  <button type="button" className="p-5 hover:btn-primary">
                    {session.user.name}
                  </button>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content text-base-100 z-[1] menu p-2 shadow bg-secondary rounded-box w-52"
                >
                  <li>
                    <Link className="hover:btn-primary" href="/User/Profile">
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      className="hover:btn-primary"
                      type="button"
                      onClick={logoutClickHandler}
                    >
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
