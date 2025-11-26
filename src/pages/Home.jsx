import { Link } from 'react-router-dom';
import { Heart, Lock, Users, MessageCircle } from 'lucide-react';

const Home = () => {
    return (
        <div className="container page-container">
            {/* Hero Section */}
            <div className="text-center" style={{ padding: '3rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Heart style={{ width: '64px', height: '64px', color: 'var(--primary-color)' }} />
                    <h1 style={{ fontSize: '4rem', margin: 0 }}>HeartDrop</h1>
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '300' }}>
                    Share Your Secrets, <span style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Anonymously</span>
                </h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    HeartDrop is a safe space to confess, connect, and let go. Your identity stays hidden while your voice is heard.
                </p>
                <div className="flex justify-center gap-2" style={{ marginBottom: '4rem' }}>
                    <Link to="/feed" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '0.75rem 2rem' }}>
                        Read Confessions
                    </Link>
                    <Link to="/signup" className="btn" style={{ fontSize: '1.2rem', padding: '0.75rem 2rem', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}>
                        Join Now
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div className="card text-center">
                    <Lock style={{ width: '48px', height: '48px', color: 'var(--primary-color)', margin: '0 auto 1rem' }} />
                    <h3 style={{ marginBottom: '0.5rem' }}>100% Anonymous</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Use public aliases to protect your identity while sharing your thoughts</p>
                </div>
                <div className="card text-center">
                    <Users style={{ width: '48px', height: '48px', color: 'var(--primary-color)', margin: '0 auto 1rem' }} />
                    <h3 style={{ marginBottom: '0.5rem' }}>Safe Community</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Connect with others in a judgment-free environment</p>
                </div>
                <div className="card text-center">
                    <MessageCircle style={{ width: '48px', height: '48px', color: 'var(--primary-color)', margin: '0 auto 1rem' }} />
                    <h3 style={{ marginBottom: '0.5rem' }}>Public & Private</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Share publicly or keep your confessions private</p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="card text-center" style={{ background: 'linear-gradient(135deg, var(--card-bg) 0%, #2d1b3d 100%)', padding: '3rem' }}>
                <Heart style={{ width: '64px', height: '64px', color: 'var(--primary-color)', margin: '0 auto 1rem' }} />
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Share?</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Join thousands of people sharing their stories anonymously
                </p>
                <Link to="/signup" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '0.75rem 2.5rem' }}>
                    Get Started Free
                </Link>
            </div>
        </div>
    );
};

export default Home;
