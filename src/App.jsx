import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import CreateConfession from './pages/CreateConfession';
import VerifyEmail from './pages/VerifyEmail';
import ConfessionDetail from './pages/ConfessionDetail';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/create" element={<CreateConfession />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/confession/:id" element={<ConfessionDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
