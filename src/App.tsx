import React from 'react';

// button
import ButtonFrame, { allButtonStyle } from './components/buttons';

function App() {
  return (
    <div>
      <ButtonFrame buttonStyle={allButtonStyle.primary} />
    </div>
  );
}

export default App;
