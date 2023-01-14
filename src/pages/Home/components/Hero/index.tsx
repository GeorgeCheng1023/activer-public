import React from 'react';
import './index.scss';

// component
import Button from 'components/Button';
import { ReactComponent as Earth } from './components/Earth.svg';
import { ReactComponent as Star } from './components/Star.svg';

function Hero() {
  // handle search bar submit
  const handleSubmit:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // TODO: navigate to learn more`
  };

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__left">
          <h1>Activer 活動者</h1>
          <h3 className="hero__h3">
            在這屬於
            <mark className="hero__h3--highlight">學生的社群中</mark>
            <br />
            尋找屬於你的活動
          </h3>
          <Button
            text="了解更多"
            color="secondary"
            type="submit"
            variant={{ outline: true }}
            onClick={handleSubmit}
          />
        </div>
        <div className="hero__right">
          <Earth />
          <div className="hero__stars">
            {Array(8).fill(0).map((element, index) => (<Star key={`hero-star-${element}${index}`} />))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
