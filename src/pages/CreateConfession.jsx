import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Heart, Send } from 'lucide-react';

const CreateConfession = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState('public');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/confessions', { title, content, visibility });
            navigate('/feed');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container page-container" style={{ maxWidth: '600px' }}>
            <div className="card">
                <div className="text-center mb-4">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Heart style={{ width: '32px', height: '32px', color: 'var(--primary-color)' }} />
                        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--primary-color)' }}>HeartDrop</h1>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Share your confession anonymously</p>
                </div>
                <h2 className="text-center mb-4">Create Confession</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Give your confession a title..."
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share what's on your heart..."
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Visibility</label>
                        <select
                            className="form-control"
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                        >
                            <option value="public">Public - Everyone can see</option>
                            <option value="private">Private - Only you can see</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Send className="icon-sm" />
                        Post Confession
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateConfession;
