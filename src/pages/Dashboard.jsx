import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';

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
            <h1 className="mb-4">Welcome, {user?.currentAlias}</h1>
            <div className="card">
                <h2>My Confessions</h2>
                {myConfessions.length === 0 ? (
                    <p>You haven't posted any confessions yet.</p>
                ) : (
                    <div className="mt-4">
                        {myConfessions.map((confession) => (
                            <div key={confession._id} className="card" style={{ backgroundColor: 'var(--bg-color)' }}>
                                <h3>{confession.title}</h3>
                                <p>{confession.content.substring(0, 100)}...</p>
                                <div className="flex justify-between mt-4">
                                    <span className="card-meta">{new Date(confession.createdAt).toLocaleDateString()}</span>
                                    <span className="card-meta">{confession.visibility}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Link to="/create" className="btn btn-primary mt-4">Post a Confession</Link>
            </div>
        </div>
    );
};

export default Dashboard;
