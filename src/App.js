// import React, { useState } from 'react';
// import LetterTemplate from './components/LetterTemplate';
// import LetterForm from './components/LetterForm';

// const App = () => {
//   const [letterData, setLetterData] = useState(null);

//   const generateLetter = (data) => {
//     setLetterData(data);
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <LetterForm onSubmit={generateLetter} />
//       {letterData && <LetterTemplate {...letterData} />}
//     </div>
//   );
// };

// export default App;
// MyDashboard.jsx
import React from 'react';
import Geminai  from './components/Form';


const App = () => {
    return (
        <div>
            <Geminai />

        </div>
    );
};

export default App;
