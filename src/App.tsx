import React from 'react';
import ButtonFrame, { allButtonColor, allButtonStyle } from './components/buttons';
import DropdownFrame, { allDropdownStyle } from './components/Form/FormDropdown/DropdownFrame';
import SearchBar from './components/Form/FormSearchBar';
import InputFormFrame, { allInputFormStyle } from './components/Form/inputForm/InputFormFrame';
import SidebarLink from './components/SidebarLink';

function App() {
  return (
    <>
      <ButtonFrame buttonColor={allButtonColor.primary} buttonStyle={allButtonStyle.default} />
      <hr />
      <InputFormFrame formStyle={allInputFormStyle.default} />
      <hr />
      <DropdownFrame dropdownStyle={allDropdownStyle.withoutLabel} />
      <hr />
      <SidebarLink />
      <hr />
      <SearchBar />
    </>
  );
}

export default App;
