import React from 'react';
import './index.scss';
import ManageNavButton, { ManageNavFilterProps } from './ManageNavButton';

type Props = {
  filters: ManageNavFilterProps[],
  onChangeFilter: (selectFilterStatus : string) => void,
  currentFilterId: string
};

function ManageNav({ filters, onChangeFilter, currentFilterId }: Props) {
  return (
    <div className="manage-nav__button-group">
      {filters.map((filter) => (
        <ManageNavButton
          id={filter.id}
          key={filter.id}
          name={filter.name}
          icon={filter.icon}
          onClickFilter={onChangeFilter}
          active={currentFilterId === filter.id}
        />
      ))}

    </div>
  );
}

export default ManageNav;
