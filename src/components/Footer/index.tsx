import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import {
  BsFacebook, BsGithub, BsLine, BsInstagram,
} from 'react-icons/bs';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__connection">
        <h3 className="footer__title">聯絡我們</h3>
        <div className="footer__connection__social-media">
          <BsFacebook />
          <BsInstagram />
          <BsLine />
          <BsGithub />

        </div>
        <div className="footer__connection__item">
          <a href="mailto:activer.main@gmail.com">Email: activer.main@gmail.com</a>
        </div>
      </div>
      <div className="footer__pages">
        <h3 className="footer__title">連結</h3>
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>首頁</Link>
        <Link to="/user/basic" onClick={() => window.scrollTo(0, 0)}>基本資料</Link>
        <Link to="/user/manage" onClick={() => window.scrollTo(0, 0)}>活動管理</Link>
      </div>
      <div className="footer__other">
        <h3 className="footer__title">其他</h3>

        <a href="/">關於我們</a>
        <a href="/">Sitemap</a>
      </div>
    </footer>
  );
}

export default Footer;
