import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container page-container text-center">
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Share Your Secrets, <span style={{ color: 'var(--primary-color)' }}>Anonymously</span></h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                HeartDrop is a safe space to confess, connect, and let go.
            </p>
            <div className="flex justify-center gap-2">
                <Link to="/feed" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '0.75rem 2rem' }}>Read Confessions</Link>
                <Link to="/signup" className="btn" style={{ fontSize: '1.2rem', padding: '0.75rem 2rem', border: '1px solid var(--border-color)' }}>Join Now</Link>
            </div>
        </div>
    );
};

export default Home;
