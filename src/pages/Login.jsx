import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container page-container" style={{ maxWidth: '400px' }}>
            <div className="card animate-scale-in">
                <div className="text-center mb-4">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Heart className="heart-beat" style={{ width: '32px', height: '32px', color: 'var(--primary-color)' }} />
                        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--primary-color)' }}>HeartDrop</h1>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Login to share your confessions</p>
                </div>

                <h2 className="text-center mb-4" style={{ fontSize: '1.5rem' }}>Welcome Back</h2>

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

                <form onSubmit={handleSubmit}>
                    <div className="form-group animate-slide-in" style={{ animationDelay: '0.1s' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Mail className="icon-sm" />
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group animate-slide-in" style={{ animationDelay: '0.2s' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Lock className="icon-sm" />
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary animate-slide-in"
                        style={{ width: '100%', animationDelay: '0.3s', position: 'relative' }}
                        disabled={loading}
                    >
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                                Logging in...
                            </div>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                <p className="text-center mt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
