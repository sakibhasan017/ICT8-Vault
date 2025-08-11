import { useState, useEffect } from 'react';
import axios from 'axios';
import './Notice.css';
import { useNavigate } from 'react-router-dom';

export default function Notice() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('list');
  const [formData, setFormData] = useState({
    title: '',
    extraInfo: '',
    date: '',
    section: '',
    additional: ''
  });
  const [notices, setNotices] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/notice/list`);
      setNotices(res.data.message || []);
    } catch (err) {
      console.error("Error fetching notices:", err);
      setNotices([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/notice/update/${editId}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/notice/add`, formData);
      }
      fetchNotices();
      setMode('list');
      setFormData({ title: '', extraInfo: '', date: '', section: '', additional: '' });
      setEditId(null);
    } catch (error) {
      console.error("Error saving notice:", error);
    }
  };

  const handleEdit = (notice) => {
    setFormData({
      title: notice.title,
      extraInfo: notice.extraInfo,
      date: notice.date,
      section: notice.section,
      additional: notice.additional
    });
    setEditId(notice._id);
    setMode('add');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/notice/delete/${id}`);
      fetchNotices();
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <div className="notice-container">
      <div className="notice-header">
        <h1>{mode === 'list' ? 'Notices' : (editId ? 'Edit Notice' : 'Add Notice')}</h1>
        <button 
          onClick={() => {
            setMode(mode === 'list' ? 'add' : 'list');
            setEditId(null);
            setFormData({ title: '', extraInfo: '', date: '', section: '', additional: '' });
          }}
          className="toggle-button"
        >
          {mode === 'list' ? 'Add Notice' : 'View Notices'}
        </button>
      </div>

      {mode === 'add' ? (
        <form onSubmit={handleSubmit} className="notice-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Extra Info About Title (Optional)</label>
            <textarea
              name="extraInfo"
              value={formData.extraInfo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date (Optional)</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Additional Info (Optional)</label>
            <textarea
              name="additional"
              value={formData.additional}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              {editId ? 'Update' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('list');
                setFormData({ title: '', extraInfo: '', date: '', section: '', additional: '' });
                setEditId(null);
              }}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="notice-list">
          {notices.length === 0 ? (
            <p className="no-notices">No notices available</p>
          ) : (
            <div className="notice-cards">
              {notices.map((notice) => (
                <div key={notice._id} className="notice-card">
                  <div className="notice-card-header">
                    <h3>{notice.title}</h3>
                    <div className="notice-actions">
                      <button onClick={() => handleEdit(notice)}>Edit</button>
                      <button onClick={() => handleDelete(notice._id)}>Delete</button>
                    </div>
                  </div>
                  <p className="notice-section">Section: {notice.section}</p>
                  {notice.date && <p className="notice-date">Date: {new Date(notice.date).toLocaleDateString()}</p>}
                  <p className="notice-extra">{notice.extraInfo}</p>
                  {notice.additional && <p className="notice-additional">{notice.additional}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="bottom-actions">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Dashboard
        </button>
      </div>
      
    </div>
  );
}