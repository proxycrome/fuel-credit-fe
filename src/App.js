import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/individual-form" element={<Signup/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/" element={<Navigate replace to="/individual-form" />}/>
      </Routes>
    </Router>
  );
}

export default App;
