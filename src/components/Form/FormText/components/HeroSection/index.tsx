import React from 'react';
import './index.scss';

type HeroSectionProps = {
  placeholder: string;
};

function HeroSection({ placeholder }: HeroSectionProps) {
  return (
    <textarea
      className="inputHeroSection inputHeroSection--style"
      placeholder={placeholder}
    />
  );
}

export default HeroSection;
