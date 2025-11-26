import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        gender: 'male',
        dateOfBirth: '',
        publicAliases: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const aliases = formData.publicAliases.split(',').map(a => a.trim());
            await signup({ ...formData, publicAliases: aliases });
            setMessage('Registration successful! Please check your email to verify your account.');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="container page-container" style={{ maxWidth: '500px' }}>
            <div className="card">
                <div className="text-center mb-4">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Heart style={{ width: '32px', height: '32px', color: 'var(--primary-color)' }} />
                        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--primary-color)' }}>HeartDrop</h1>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Create your anonymous account</p>
                </div>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <div className="text-error mb-4 text-center">{error}</div>}
                {message && <div className="text-success mb-4 text-center">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="flex gap-2">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">Gender</label>
                            <select name="gender" className="form-control" onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">Date of Birth</label>
                            <input type="date" name="dateOfBirth" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Public Aliases (comma separated)</label>
                        <input type="text" name="publicAliases" className="form-control" placeholder="Ghost, Shadow, Anon..." onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
                </form>
                <p className="text-center mt-4">
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
