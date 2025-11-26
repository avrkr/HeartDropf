import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Heart, Calendar, ArrowLeft, MessageCircle, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ConfessionDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [confession, setConfession] = useState(null);
    const [replies, setReplies] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [replyType, setReplyType] = useState('public');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConfession = async () => {
            try {
                const { data } = await api.get(`/confessions/${id}`);
                setConfession(data);

                // Fetch replies
                const repliesData = await api.get(`/replies/${id}?type=public`);
                setReplies(repliesData.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load confession');
                setLoading(false);
            }
        };
        fetchConfession();
    }, [id]);

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await api.post('/replies', {
                confessionId: id,
                content: replyContent,
                type: replyType,
            });
            setReplyContent('');
            // Refresh replies
            const repliesData = await api.get(`/replies/${id}?type=public`);
            setReplies(repliesData.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post reply');
        }
    };

    if (loading) {
        return (
            <div className="container page-container text-center">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                <p>Loading confession...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container page-container text-center">
                <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <h2 className="text-error mb-4">Error</h2>
                    <p>{error}</p>
                    <Link to="/feed" className="btn btn-primary mt-4">Back to Feed</Link>
                </div>
            </div>
        );
    }

    if (!confession) {
        return (
            <div className="container page-container text-center">
                <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <h2 className="mb-4">Confession Not Found</h2>
                    <Link to="/feed" className="btn btn-primary mt-4">Back to Feed</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container page-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Link to="/feed" className="btn-link mb-4" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft className="icon-sm" />
                    Back to Feed
                </Link>

                {/* Confession Card */}
                <div className="card" style={{ marginBottom: '2rem' }}>
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
                    <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{confession.title}</h1>
                    <p style={{ fontSize: '1.1rem', whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{confession.content}</p>
                    {confession.tags && confession.tags.length > 0 && (
                        <div className="mt-4 flex gap-2" style={{ flexWrap: 'wrap' }}>
                            {confession.tags.map((tag, index) => (
                                <span key={index} style={{
                                    padding: '0.25rem 0.75rem',
                                    backgroundColor: 'var(--bg-color)',
                                    borderRadius: '1rem',
                                    fontSize: '0.875rem',
                                    color: 'var(--text-muted)'
                                }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Replies Section */}
                <div className="card">
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <MessageCircle className="icon" />
                        Replies ({replies.length})
                    </h2>

                    {/* Reply Form */}
                    {user ? (
                        <form onSubmit={handleReplySubmit} className="mb-4" style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '0.5rem' }}>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Share your thoughts..."
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-between items-center">
                                <select
                                    className="form-control"
                                    style={{ width: 'auto' }}
                                    value={replyType}
                                    onChange={(e) => setReplyType(e.target.value)}
                                >
                                    <option value="public">Public Reply</option>
                                    <option value="private">Private Reply</option>
                                </select>
                                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Send className="icon-sm" />
                                    Post Reply
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center mb-4" style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '0.5rem' }}>
                            <p style={{ color: 'var(--text-muted)' }}>
                                <Link to="/login" style={{ color: 'var(--primary-color)' }}>Login</Link> to reply to this confession
                            </p>
                        </div>
                    )}

                    {/* Replies List */}
                    {replies.length === 0 ? (
                        <div className="text-center" style={{ padding: '2rem' }}>
                            <MessageCircle style={{ width: '48px', height: '48px', color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
                            <p style={{ color: 'var(--text-muted)' }}>No replies yet. Be the first to respond!</p>
                        </div>
                    ) : (
                        <div>
                            {replies.map((reply) => (
                                <div key={reply._id} className="card" style={{ backgroundColor: 'var(--bg-color)', marginBottom: '1rem' }}>
                                    <div className="flex justify-between mb-2">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Heart style={{ width: '16px', height: '16px', color: 'var(--primary-color)' }} />
                                            <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>{reply.alias}</span>
                                        </div>
                                        <span className="card-meta">{new Date(reply.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{reply.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfessionDetail;
