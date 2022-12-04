/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import './index.scss';

function NotFound() {
  return (
    <div className="notFoundDiv">
      <div className="notFoundDiv__number">404</div>
      <div className="notFoundDiv__text">
        <span>Ooops...</span>
        <br />
        page not found

      </div>
      <a className="notFoundDiv__me" href="https://codepen.io/uzcho_/pens/popular/?grid_type=list" target="_blank" rel="noreferrer" />
    </div>
  );
}

export default NotFound;
