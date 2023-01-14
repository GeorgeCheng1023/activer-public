/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Button from 'components/Button';
import { Link } from 'react-router-dom';

import './index.scss';

function NotFound() {
  return (
    <div className="notFound">
      <div className="notFoundDiv">
        <div className="notFoundDiv__number">404</div>
        <div className="notFoundDiv__text">
          <span>糟糕</span>
          未找到此頁面
        </div>
        <Link to="/">
          <Button
            type="button"
            color="primary"
            text="回到首頁"
            variant={{ outline: true }}
          />
        </Link>
        <a className="notFoundDiv__me" href="https://codepen.io/uzcho_/pens/popular/?grid_type=list" target="_blank" rel="noreferrer" />
      </div>
    </div>
  );
}

export default NotFound;
