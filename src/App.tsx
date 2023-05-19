import React ,{FC, Dispatch,SetStateAction} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Register from './pages/register/Register';

const App = ()  =>{

return (<>

<Router>
  <Routes>
  <Route path='/' element={<Register/>}/>
  </Routes>
</Router>
</>)

}

export default App;
