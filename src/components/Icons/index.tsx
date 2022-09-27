import React from 'react';
import './index.scss';

// icon
import { AiFillStar } from 'react-icons/ai';
import { FaHistory, FaSearch, FaStarOfLife } from 'react-icons/fa';
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
    <FaSearch className="icon" />
  );
}

export function IconArrowUp() {
  return (
    <FaSearch className="icon" />
  );
}

export function IconPasswordStar() {
  return (
    <FaStarOfLife className="icon" />
  );
}

export function IconPlus() {
  return (
    <BsPlus className="icon" />
  );
}
export function IconSecurity() {
  return (
    <BsFillShieldLockFill className="icon" />
  );
}
export function IconMove() {
  return (
    <BsArrowsMove className="icon" />
  );
}

export function IconCreate() {
  return (
    <GrChapterAdd className="icon" />
  );
}

export function IconGear() {
  return (
    <BsGearFill className="icon" />
  );
}
export function IconMinus() {
  return (
    <BiMinus className="icon" />
  );
}

export function IconEdit() {
  return (
    <RiEditFill className="icon" />
  );
}
export function IconPeople() {
  return (
    <BsFillPeopleFill className="icon" />
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
    return <AiFillStar className="icon" />;
  }

  return <BsStar className="icon" />;
}

IconStar.defaultProps = defaultStarProps;

IconStar.defaultProps = defaultStarProps;
