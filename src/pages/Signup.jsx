import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Mail, Lock, User, Calendar, Users } from 'lucide-react';

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
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const aliases = formData.publicAliases.split(',').map(a => a.trim()).filter(a => a);
            if (aliases.length === 0) {
                setError('Please provide at least one alias');
                setLoading(false);
                return;
            }

            await signup({ ...formData, publicAliases: aliases });
            setMessage('🎉 Registration successful! Please check your email to verify your account.');
            setError('');

            // Clear form
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                gender: 'male',
                dateOfBirth: '',
                publicAliases: '',
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container page-container" style={{ maxWidth: '500px' }}>
            <div className="card animate-scale-in">
                <div className="text-center mb-4">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Heart className="heart-beat" style={{ width: '32px', height: '32px', color: 'var(--primary-color)' }} />
                        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--primary-color)' }}>HeartDrop</h1>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Create your anonymous account</p>
                </div>

                <h2 className="text-center mb-4" style={{ fontSize: '1.5rem' }}>Join HeartDrop</h2>

                {error && (
                    <div className="animate-slide-in" style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid var(--error-color)',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        <span className="text-error">{error}</span>
                    </div>
                )}

                {message && (
                    <div className="animate-scale-in" style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid var(--success-color)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        <span className="text-success">{message}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group animate-slide-in" style={{ animationDelay: '0.1s' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Mail className="icon-sm" />
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group animate-slide-in" style={{ animationDelay: '0.15s' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Lock className="icon-sm" />
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group animate-slide-in" style={{ animationDelay: '0.2s' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Lock className="icon-sm" />
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="flex gap-2 animate-slide-in" style={{ animationDelay: '0.25s' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User className="icon-sm" />
                                Gender
                            </label>
                            <select
                                name="gender"
                                className="form-control"
                                value={formData.gender}
                                onChange={handleChange}
                                disabled={loading}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar className="icon-sm" />
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                className="form-control"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group animate-slide-in" style={{ animationDelay: '0.3s' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Users className="icon-sm" />
                            Public Aliases (comma separated)
                        </label>
                        <input
                            type="text"
                            name="publicAliases"
                            className="form-control"
                            value={formData.publicAliases}
                            onChange={handleChange}
                            placeholder="Ghost, Shadow, Anon..."
                            required
                            disabled={loading}
                        />
                        <small style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            These names will be used to keep you anonymous
                        </small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary animate-slide-in"
                        style={{ width: '100%', animationDelay: '0.35s' }}
                        disabled={loading}
                    >
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                                Creating Account...
                            </div>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                <p className="text-center mt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
