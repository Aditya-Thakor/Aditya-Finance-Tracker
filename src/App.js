import './App.css';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';

import ViewTransaction from './pages/ViewTransaction/ViewTransaction';
import AddTransaction from './pages/AddTransaction/AddTransaction';
import Error404 from './pages/404/Error404';


function App() {
  return (
<>
<Router>
  <Routes>
    <Route path='/' element={<Navigate to='/addTransaction'/>}/>
    <Route path='/addTransaction' element={<AddTransaction/>}/>
    <Route path='/viewTransaction' element={<ViewTransaction/>}/>
    <Route path='*' element={<Error404/>}/>
  </Routes>
</Router>
</>
  );
}

export default App;
