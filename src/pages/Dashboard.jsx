import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Heart, PlusCircle, Calendar, Eye } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [myConfessions, setMyConfessions] = useState([]);

    useEffect(() => {
        const fetchConfessions = async () => {
            try {
                const { data } = await api.get('/confessions/my');
                setMyConfessions(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchConfessions();
    }, []);

    return (
        <div className="container page-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <Heart style={{ width: '40px', height: '40px', color: 'var(--primary-color)' }} />
                <div>
                    <h1 style={{ margin: 0 }}>Welcome, {user?.currentAlias}</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Your HeartDrop Dashboard</p>
                </div>
            </div>
            <div className="card">
                <div className="flex justify-between items-center mb-4">
                    <h2 style={{ margin: 0 }}>My Confessions</h2>
                    <Link to="/create" className="btn btn-primary">
                        <PlusCircle className="icon-sm" style={{ marginRight: '0.5rem' }} />
                        New Confession
                    </Link>
                </div>
                {myConfessions.length === 0 ? (
                    <div className="text-center" style={{ padding: '2rem' }}>
                        <Heart style={{ width: '64px', height: '64px', color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
                        <p style={{ color: 'var(--text-muted)' }}>You haven't posted any confessions yet.</p>
                        <Link to="/create" className="btn btn-primary mt-4">Share Your First Confession</Link>
                    </div>
                ) : (
                    <div className="mt-4">
                        {myConfessions.map((confession) => (
                            <div key={confession._id} className="card" style={{ backgroundColor: 'var(--bg-color)' }}>
                                <h3>{confession.title}</h3>
                                <p>{confession.content.substring(0, 100)}...</p>
                                <div className="flex justify-between mt-4" style={{ alignItems: 'center' }}>
                                    <div className="flex gap-2" style={{ alignItems: 'center' }}>
                                        <Calendar className="icon-sm" style={{ color: 'var(--text-muted)' }} />
                                        <span className="card-meta">{new Date(confession.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex gap-2" style={{ alignItems: 'center' }}>
                                        <Eye className="icon-sm" style={{ color: 'var(--text-muted)' }} />
                                        <span className="card-meta">{confession.visibility}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
