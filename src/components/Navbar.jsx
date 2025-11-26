import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, LogOut, User, PlusCircle } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo">
                    <Heart className="icon" /> HeartDrop
                </Link>
                <div className="nav-links">
                    <Link to="/feed">Feed</Link>
                    {user ? (
                        <>
                            <Link to="/create">
                                <PlusCircle className="icon-sm" /> Post
                            </Link>
                            <Link to="/dashboard">
                                <User className="icon-sm" /> Dashboard
                            </Link>
                            <button onClick={handleLogout} className="btn-link">
                                <LogOut className="icon-sm" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
