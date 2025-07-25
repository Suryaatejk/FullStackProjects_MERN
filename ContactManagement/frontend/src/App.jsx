import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashBoard';
import ContactForm from './pages/ContactForm';
import Profile from './pages/Profile';
import Navbar from './components/NavBar';
import Signup from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Landing from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<ContactForm />} />
        <Route path="/edit/:id" element={<ContactForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
