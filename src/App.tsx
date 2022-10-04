import React from 'react';

// button
import ButtonFrame, { allButtonColor, allButtonStyle } from './components/buttons';
import Tag from './components/Tag';

function App() {
  return (
    <div>
      <ButtonFrame buttonColor={allButtonColor.primary} buttonStyle={allButtonStyle.outline} />
      <Tag color="success" icon="plus" />
    </div>
  );
}

export default App;
