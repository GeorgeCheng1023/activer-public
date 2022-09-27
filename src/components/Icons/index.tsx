import React from 'react';
import './index.scss';

// icon
import { AiFillStar, AiFillCaretUp } from 'react-icons/ai';
import { FaHistory, FaSearch, FaStarOfLife } from 'react-icons/fa';

/* prettier-ignore */
import {
  BsPlus,
  BsStar,
  BsGearFill,
  BsFillPeopleFill,
  BsArrowsMove,
  BsFillShieldLockFill,
} from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { RiEditFill } from 'react-icons/ri';
import { GrChapterAdd } from 'react-icons/gr';

export function IconHistory() {
  return (
    <FaHistory className="icon" />
  );
}

export function IconSearch() {
  return (
    <FaSearch className="icon" />
  );
}
export function IconTriangle() {
  return (
    <>
      {/* prettier-ignore */}
      <FaSearch className="icon" />
    </>
  );
}

export function IconArrowUp() {
  return (
    <>
      {/* prettier-ignore */}
      <FaSearch className="icon" />
    </>
  );
}

export function IconPasswordStar() {
  return (
    <>
      {/* prettier-ignore */}
      <FaStarOfLife className="icon" />
    </>
  );
}

export function IconPlus() {
  return (
    <>
      {/* prettier-ignore */}
      <BsPlus className="icon" />
    </>
  );
}
export function IconSecurity() {
  return (
    <>
      {/* prettier-ignore */}
      <BsFillShieldLockFill className="icon" />
    </>
  );
}
export function IconMove() {
  return (
    <>
      {/* prettier-ignore */}
      <BsArrowsMove className="icon" />
    </>
  );
}

export function IconCreate() {
  return (
    <>
      {/* prettier-ignore */}
      <GrChapterAdd className="icon" />
    </>
  );
}

export function IconGear() {
  return (
    <>
      {/* prettier-ignore */}
      <BsGearFill className="icon" />
    </>
  );
}
export function IconMinus() {
  return (
    <>
      {/* prettier-ignore */}
      <BiMinus className="icon" />
    </>
  );
}

export function IconEdit() {
  return (
    <>
      {/* prettier-ignore */}
      <RiEditFill className="icon" />
    </>
  );
}
export function IconPeople() {
  return (
    <>
      {/* prettier-ignore */}
      <BsFillPeopleFill className="icon" />
    </>
  );
}

type StarProps = {
  fill?: boolean;
} & typeof defaultStarProps;

const defaultStarProps = {
  fill: false,
};

export function IconStar(props: StarProps) {
  const { fill } = props;
  if (fill) {
    /* prettier-ignore */
    return <AiFillStar className="icon" />;
  }
  /* prettier-ignore */
  return <BsStar className="icon" />;
}

IconStar.defaultProps = defaultStarProps;
