import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

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
            <h1 className="text-center mb-4">Public Confessions</h1>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {confessions.map((confession) => (
                    <div key={confession._id} className="card">
                        <div className="card-header">
                            <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{confession.alias}</span>
                            <span className="card-meta">{new Date(confession.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="mb-4">{confession.title}</h3>
                        <p style={{ fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>{confession.content}</p>
                        <div className="mt-4 flex gap-2">
                            <Link to={`/confession/${confession._id}`} className="btn-link">
                                Read more & Reply
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
