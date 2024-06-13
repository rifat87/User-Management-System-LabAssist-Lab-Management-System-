import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from './components/Profile';
import Inventory from './components/InventoryDB';
import Documentation from './components/Documentation';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/Registration" element={<Registration />} /> */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/profile" element={<Profile />} />
        <Route path="/login/profile/inventory" element={<Inventory />} />
        <Route path="/documentation" element={<Documentation />} />
        
      </Routes>
    </Router>
    </>
  );
}
export default App;