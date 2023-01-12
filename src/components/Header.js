import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/authContext';

import logo from '../assets/dm-logo-white.svg';

const Header = () => {
  const authCtx = useContext(AuthContext);

  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? '#f57145' : '',
    };
  };

  return (
    <header className="header flex-row">
      <div className="flex-row">
        <img src={logo} alt="dm-logo" className="logo" />
        <h2>Soshul Mantun</h2>
      </div>
      <nav>
        {authCtx.token ? (
          <ul className="main-nav">
            <li>
              <NavLink style={styleActiveLink} to="/">
                Hum
              </NavLink>
            </li>
            <li>
              <NavLink style={styleActiveLink} to="profile">
                Praful
              </NavLink>
            </li>
            <li>
              <NavLink style={styleActiveLink} to="form">
                Rite stufs
              </NavLink>
            </li>
            <li>
              <button className="logout-btn" onClick={() => authCtx.logout()}>
                Logzorz
              </button>
            </li>
          </ul>
        ) : (
          <ul className="main-nav">
            <li>
              <NavLink style={styleActiveLink} to="auth">
                Lagn or Resturg
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
