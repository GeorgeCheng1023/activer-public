import React from 'react';
import ButtonFrame, { allButtonColor, allButtonStyle } from './components/buttons';
import Card from './components/Card';
import DropdownFrame, { allDropdownStyle } from './components/Form/FormDropdown/DropdownFrame';
import SearchBar from './components/Form/FormSearchBar';
import InputFormFrame, { allInputFormStyle } from './components/Form/inputForm/InputFormFrame';
import SidebarLink from './components/SidebarLink';

function App() {
  return (
    <>
      <ButtonFrame buttonColor={allButtonColor.secondary} buttonStyle={allButtonStyle.default} />
      <hr />
      <DropdownFrame dropdownStyle={allDropdownStyle.default} labelText="周杰倫" />
      <hr />
      <SidebarLink labelText="彰女" />
      <hr />
      <SearchBar />
      <hr />
      <InputFormFrame formStyle={allInputFormStyle.heroForm} labelText="名稱" />
      <hr />
      <Card />
    </>
  );
}

export default App;
