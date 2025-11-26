import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

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
                {status === 'verifying' && <h2>Verifying your email...</h2>}
                {status === 'success' && (
                    <>
                        <h2 className="text-success mb-4">Email Verified!</h2>
                        <p>You can now login to your account.</p>
                        <Link to="/login" className="btn btn-primary mt-4">Login</Link>
                    </>
                )}
                {status === 'error' && (
                    <>
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
