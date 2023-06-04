import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../../assets/icon.svg';
import useCartStore from '../../../stores/cartStore';
import './header.css';

export const Header = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const cartStore = useCartStore();
  const navList = [
    {
      link: '/psy',
      header: 'Psy',
    },
    {
      link: '/koty',
      header: 'Koty',
    },
    {
      link: '/rybki',
      header: 'Rybki',
    },
    {
      link: '/ptaki',
      header: 'Ptaki',
    },
    {
      link: '/gady-i-plazy',
      header: 'Gady i płazy',
    },
    {
      link: '/gryzonie',
      header: 'Gryzonie',
    },
    {
      link: '/kontakt',
      header: 'Kontakt',
    },
  ];

  return (
    <header className="navigation-header">
      <div className="container">
        <div className="header__wrapper">
          <button className="mobile-navigation" onClick={() => setShowMobileSidebar(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
              <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" fill="rgba(0,0,0,1)"></path>
            </svg>
          </button>
          <NavLink to="/" className="header__logo">
            <img src={Logo} alt="logo icon" />
            <span>Zwierzakolandia</span>
          </NavLink>
          <NavLink to="/koszyk" className="header__shopping-cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
              <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
            </svg>
            {cartStore.totalItems() > 0 && (
              <div className="shopping-cart-items">
                <span>{cartStore.totalItems() > 99 ? '99+' : cartStore.totalItems()}</span>
              </div>
            )}
          </NavLink>
        </div>
      </div>
      <nav className="navbar" style={showMobileSidebar ? { display: 'block' } : {}} onClick={() => setShowMobileSidebar(false)}>
        <div className="container">
          <div className="mobile-navbar">
            <button className="navbar-close" onClick={() => setShowMobileSidebar(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                <path
                  d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                  fill="white"
                ></path>
              </svg>
            </button>
          </div>
          <div className="navbar__wrapper">
            <ul className="navbar__list">
              {navList.map((i, idx) => (
                <li className="navbar__item" key={i.header + idx}>
                  <NavLink to={i.link} className="link">
                    {i.header}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
