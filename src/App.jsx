import React from 'react';
import Log from './components/Log';
import Recap from './components/Recap';
import UploadImage from './components/UploadImage';

function App() {
  return (
    <div className="container">
      <UploadImage />
      <Recap />
      <Log />
    </div>
  );
}

export default App;
