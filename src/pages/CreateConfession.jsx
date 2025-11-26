import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

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
                <h2 className="text-center mb-4">Create Confession</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Post Confession</button>
                </form>
            </div>
        </div>
    );
};

export default CreateConfession;
