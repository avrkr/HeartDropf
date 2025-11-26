import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Heart, CheckCircle, XCircle } from 'lucide-react';

const VerifyEmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState('verifying');

    useEffect(() => {
        const verify = async () => {
            try {
                await api.post('/auth/verify-email', { token });
                setStatus('success');
            } catch (error) {
                setStatus('error');
            }
        };
        verify();
    }, [token]);

    return (
        <div className="container page-container text-center">
            <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Heart style={{ width: '32px', height: '32px', color: 'var(--primary-color)' }} />
                    <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--primary-color)' }}>HeartDrop</h1>
                </div>
                {status === 'verifying' && (
                    <>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                        <h2>Verifying your email...</h2>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <CheckCircle style={{ width: '64px', height: '64px', color: 'var(--success-color)', margin: '0 auto 1rem' }} />
                        <h2 className="text-success mb-4">Email Verified!</h2>
                        <p>You can now login to your account and start sharing confessions.</p>
                        <Link to="/login" className="btn btn-primary mt-4">Login to HeartDrop</Link>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <XCircle style={{ width: '64px', height: '64px', color: 'var(--error-color)', margin: '0 auto 1rem' }} />
                        <h2 className="text-error mb-4">Verification Failed</h2>
                        <p>The token may be invalid or expired.</p>
                        <Link to="/signup" className="btn btn-primary mt-4">Sign Up Again</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
