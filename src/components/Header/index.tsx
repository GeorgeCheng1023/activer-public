import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

// component
import Navbar from './components/Navbar';
import UserState from './components/UserState';

// hook
import useAuth from '../../pages/Login/hooks/useAuth';

// icon
import { IconLogoPrimary } from '../Icons';

function Header() {
  const { auth } : any = useAuth();
  // console.log('auth :');
  // console.log(auth);

  return (
    <div className="header">
      <Link to="/">
        <IconLogoPrimary />
      </Link>
      <UserState state={auth.accessToken} username={auth.username} />
      <Navbar />
    </div>
  );
}

export default Header;
