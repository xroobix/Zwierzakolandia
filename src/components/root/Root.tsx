import { Link, Outlet } from 'react-router-dom';
import Logo from '../../assets/icon.svg';
import './root.css';

export const Root = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className="header__wrapper">
            <Link to="/" className="header__logo">
              <img src={Logo} alt="logo icon" />
              <span>Zwierzakolandia</span>
            </Link>
            <button className="header__shopping-cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <div className="shopping-cart-items">
                <span>5</span>
              </div>
            </button>
          </div>
        </div>
        <nav className="navbar">
          <div className="container">
            <div className="navbar__wrapper">
              <ul className="navbar__list">
                <li className="navbar__item">
                  <Link to="/" className="link">
                    Psy
                  </Link>
                </li>
                <li className="navbar__item">
                  <Link to="/" className="link">
                    Koty
                  </Link>
                </li>
                <li className="navbar__item">
                  <Link to="/" className="link">
                    Rybki
                  </Link>
                </li>
                <li className="navbar__item">
                  <Link to="/" className="link">
                    Ptaki
                  </Link>
                </li>
                <li className="navbar__item">
                  <Link to="/" className="link">
                    Gady i płazy
                  </Link>
                </li>
                <li className="navbar__item">
                  <Link to="/" className="link">
                    Gryzonie
                  </Link>
                </li>
                <li className="navbar__item">
                  <Link to="/" className="link">
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
