/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useRef } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { AiFillCar } from 'react-icons/ai';
import { adminNavLinks } from '@/constants';
import Theme from '@/components/Theme';

const AdminNavbar = ({ onThemeChange }) => {
  const rocketRef = useRef(null);
  const { status, data: session } = useSession();

  const homeFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      rocketRef.current?.classList?.add('open');
    } else {
      rocketRef.current?.classList?.remove('open');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', homeFunc);

    return () => window.removeEventListener('scroll', homeFunc);
  }, []);

  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/login' });
  };
  return (
    <header className="fixed lg:bg-secondary lg:p-2">
      <nav className=" px-3 z-50">
        <div className="flex flex-col !h-screen">
          <div className=" flex flex-col justify-center items-center">
            <div className="dropdown dropdown-right">
              <label tabIndex={0} className="btn btn-ghost   lg:hidden">
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
                <div className="py-5 text-center">
                  {status === 'loading' ? (
                    <span className="loading loading-bars loading-xs" />
                  ) : session?.user ? (
                    <div className="">
                      <div className="">
                        <h4 tabIndex={0} className="w-full m-1">
                          {session.user.name}
                        </h4>
                        <ul tabIndex={0} className=" text-black z-[1] p-2">
                          <li>
                            <Link href="/Admin/Profile">Perfil</Link>
                          </li>
                          <li>
                            <Link href="/Admin">Dashboard</Link>
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
                {adminNavLinks.map((link, index) => (
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
                <Theme onThemeChange={onThemeChange} />
              </ul>
            </div>
          </div>
          <div className="py-5  text-center">
            {status === 'loading' ? (
              <span className="loading loading-bars loading-xs" />
            ) : session?.user ? (
              <div className="prose md:prose-lg">
                <Link
                  href="/"
                  className="normal-case no-underline text-primary flex justify-center gap-2 items-center text-2xl"
                >
                  <AiFillCar />
                  <p>AutoMaster</p>
                </Link>
                <div className="mt-10 flex justify-center items-center">
                  <div className="flex text-base-100 justify-center items-center">
                    <RiAdminLine className="text-3xl" />

                    <h3
                      tabIndex={0}
                      className="w-full text-base-100 !justify-center hidden lg:flex m-1"
                    >
                      {session.user.name}
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="btn flex btn-outline">
                <FiLogIn />
                <p>Entrar</p>
              </Link>
            )}
          </div>

          <div className="hidden lg:flex">
            <ul className="menu  !p-0 menu-vertical z-10 !w-full prose md:prose-lg">
              {adminNavLinks.map((link, index) => (
                <li key={index} className="!p-0">
                  {link.parent ? (
                    <div className="dropdown  flex !items-center  !p-0 w-full btn-primary dropdown-right">
                      <label
                        tabIndex={0}
                        className="cursor-pointer w-full flex justify-center items-center"
                      >
                        <div className="no-underline text-center btn-primary !p-0 w-full block">
                          <div className="no-underline gap-2 flex px-2 items-center justify-between">
                            {link.name}
                            <link.icon />
                          </div>
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52"
                      >
                        {link.parent.map((sublink, subindex) => (
                          <li key={subindex}>
                            <a href={sublink.url}>{sublink.name}</a>
                            {sublink.parent && (
                              <ul className="p-2">
                                {sublink.parent.map(
                                  (subSublink, subSubindex) => (
                                    <li key={subSubindex}>
                                      <a href={subSublink.url}>
                                        {subSublink.name}
                                      </a>
                                    </li>
                                  ),
                                )}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={link.url}
                      className="no-underline text-center  !p-0 block"
                    >
                      <div className=" no-underline gap-2 flex btn-primary px-2 items-center justify-between">
                        {link.name}
                        <link.icon />
                      </div>
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={logoutClickHandler}
                  className="bg-red-400 flex justify-center items-center  !m-0"
                >
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
AdminNavbar.auth = { adminOnly: true };
export default AdminNavbar;
