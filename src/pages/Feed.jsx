import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Calendar } from 'lucide-react';

const Feed = () => {
    const [confessions, setConfessions] = useState([]);

    useEffect(() => {
        const fetchConfessions = async () => {
            try {
                const { data } = await api.get('/confessions/public');
                setConfessions(data.confessions);
            } catch (error) {
                console.error(error);
            }
        };
        fetchConfessions();
    }, []);

    return (
        <div className="container page-container">
            <div className="text-center mb-4">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Heart style={{ width: '40px', height: '40px', color: 'var(--primary-color)' }} />
                    <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Public Confessions</h1>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Anonymous hearts sharing their stories</p>
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {confessions.length === 0 ? (
                    <div className="card text-center" style={{ padding: '3rem' }}>
                        <Heart style={{ width: '64px', height: '64px', color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No confessions yet. Be the first to share!</p>
                        <Link to="/create" className="btn btn-primary mt-4">Share Your Confession</Link>
                    </div>
                ) : (
                    confessions.map((confession) => (
                        <div key={confession._id} className="card" style={{ marginBottom: '1.5rem' }}>
                            <div className="card-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Heart style={{ width: '20px', height: '20px', color: 'var(--primary-color)' }} />
                                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{confession.alias}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar className="icon-sm" style={{ color: 'var(--text-muted)' }} />
                                    <span className="card-meta">{new Date(confession.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <h3 className="mb-4" style={{ fontSize: '1.5rem' }}>{confession.title}</h3>
                            <p style={{ fontSize: '1.1rem', whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{confession.content}</p>
                            <div className="mt-4 flex gap-2">
                                <Link to={`/confession/${confession._id}`} className="btn-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MessageCircle className="icon-sm" />
                                    Read more & Reply
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Feed;
