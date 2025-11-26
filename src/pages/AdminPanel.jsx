import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Users, FileText, MessageCircle, Shield, Trash2, Heart } from 'lucide-react';

const AdminPanel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [confessions, setConfessions] = useState([]);
    const [activeTab, setActiveTab] = useState('stats');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            const [statsRes, usersRes, confessionsRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/users'),
                api.get('/admin/confessions'),
            ]);
            setStats(statsRes.data);
            setUsers(usersRes.data);
            setConfessions(confessionsRes.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user? This will also delete all their confessions and replies.')) {
            return;
        }
        try {
            await api.delete(`/admin/users/${userId}`);
            setUsers(users.filter(u => u._id !== userId));
            fetchData(); // Refresh stats
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete user');
        }
    };

    const handleDeleteConfession = async (confessionId) => {
        if (!window.confirm('Are you sure you want to delete this confession?')) {
            return;
        }
        try {
            await api.delete(`/admin/confessions/${confessionId}`);
            setConfessions(confessions.filter(c => c._id !== confessionId));
            fetchData(); // Refresh stats
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete confession');
        }
    };

    if (loading) {
        return (
            <div className="container page-container text-center">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                <p>Loading admin panel...</p>
            </div>
        );
    }

    return (
        <div className="container page-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <Shield style={{ width: '40px', height: '40px', color: 'var(--primary-color)' }} />
                <div>
                    <h1 style={{ margin: 0 }}>Admin Panel</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Manage HeartDrop Platform</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <button
                    onClick={() => setActiveTab('stats')}
                    className={activeTab === 'stats' ? 'btn btn-primary' : 'btn'}
                    style={{ border: activeTab !== 'stats' ? '1px solid var(--border-color)' : '' }}
                >
                    Dashboard
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={activeTab === 'users' ? 'btn btn-primary' : 'btn'}
                    style={{ border: activeTab !== 'users' ? '1px solid var(--border-color)' : '' }}
                >
                    Users ({users.length})
                </button>
                <button
                    onClick={() => setActiveTab('confessions')}
                    className={activeTab === 'confessions' ? 'btn btn-primary' : 'btn'}
                    style={{ border: activeTab !== 'confessions' ? '1px solid var(--border-color)' : '' }}
                >
                    Confessions ({confessions.length})
                </button>
            </div>

            {/* Stats Tab */}
            {activeTab === 'stats' && stats && (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="card text-center">
                            <Users style={{ width: '48px', height: '48px', color: 'var(--primary-color)', margin: '0 auto 1rem' }} />
                            <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--primary-color)' }}>{stats.totalUsers}</h3>
                            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Total Users</p>
                        </div>
                        <div className="card text-center">
                            <FileText style={{ width: '48px', height: '48px', color: 'var(--primary-color)', margin: '0 auto 1rem' }} />
                            <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--primary-color)' }}>{stats.totalConfessions}</h3>
                            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Total Confessions</p>
                        </div>
                        <div className="card text-center">
                            <MessageCircle style={{ width: '48px', height: '48px', color: 'var(--primary-color)', margin: '0 auto 1rem' }} />
                            <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--primary-color)' }}>{stats.totalReplies}</h3>
                            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Total Replies</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div className="card">
                            <h4>Public Confessions</h4>
                            <p style={{ fontSize: '2rem', color: 'var(--success-color)', margin: 0 }}>{stats.publicConfessions}</p>
                        </div>
                        <div className="card">
                            <h4>Private Confessions</h4>
                            <p style={{ fontSize: '2rem', color: 'var(--text-muted)', margin: 0 }}>{stats.privateConfessions}</p>
                        </div>
                        <div className="card">
                            <h4>Archived Confessions</h4>
                            <p style={{ fontSize: '2rem', color: 'var(--error-color)', margin: 0 }}>{stats.archivedConfessions}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <div className="card">
                    <h2 className="mb-4">All Users</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Alias</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Role</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Verified</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Joined</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem' }}>{u.email}</td>
                                        <td style={{ padding: '1rem' }}>{u.currentAlias}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                backgroundColor: u.role === 'admin' ? 'var(--primary-color)' : 'var(--bg-color)',
                                                borderRadius: '1rem',
                                                fontSize: '0.875rem'
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {u.isVerified ? '✅' : '❌'}
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {u._id !== user._id && (
                                                <button
                                                    onClick={() => handleDeleteUser(u._id)}
                                                    className="btn-link text-error"
                                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                                >
                                                    <Trash2 className="icon-sm" />
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Confessions Tab */}
            {activeTab === 'confessions' && (
                <div>
                    <h2 className="mb-4">All Confessions</h2>
                    {confessions.map((confession) => (
                        <div key={confession._id} className="card" style={{ marginBottom: '1rem' }}>
                            <div className="flex justify-between mb-2">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Heart style={{ width: '20px', height: '20px', color: 'var(--primary-color)' }} />
                                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{confession.alias}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                        ({confession.author?.email})
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDeleteConfession(confession._id)}
                                    className="btn-link text-error"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Trash2 className="icon-sm" />
                                    Delete
                                </button>
                            </div>
                            <h3>{confession.title}</h3>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{confession.content.substring(0, 200)}...</p>
                            <div className="flex justify-between mt-2" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                <span>{new Date(confession.createdAt).toLocaleDateString()}</span>
                                <span>{confession.visibility} {confession.isArchived && '(Archived)'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
