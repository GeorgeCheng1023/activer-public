import React from 'react';

// button
import ButtonFrame, { ButtonColor } from './components/buttons';

function App() {
  return (
    <div>
      <ButtonFrame color={ButtonColor.success} />
    </div>
  );
}

export default App;
