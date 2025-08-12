import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Memories.css';

const Memories = () => {
  const [memories, setMemories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const optimizeImageUrl = (url) => {
    if (!url) return '';

    
    if (url.includes('res.cloudinary.com')) {
      return url.replace('/upload/', '/upload/q_auto,f_auto,w_800/');
    }
    
  
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/file\/d\/([^/]+)/)?.[1] || 
                    url.match(/id=([^&]+)/)?.[1];
      return fileId 
        ? `https://lh3.googleusercontent.com/d/${fileId}=w800-h600` 
        : url;
    }
    
  
    if (url.includes('imgbb.com')) {
      return url.replace('.com/', '.com/resize/800x600/');
    }
    
    return url;
  };

  document.addEventListener('click', function(e) {
  const heart = document.createElement('div');
  heart.className = 'heart-float';
  heart.innerHTML = '❤️';
  heart.style.left = e.pageX + 'px';
  heart.style.top = e.pageY + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
});

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/image/list`);
        
        const processedMemories = response.data.message.map(item => ({
          ...item,
          img: optimizeImageUrl(item.img),
          thumbnail: optimizeImageUrl(item.img).replace('w_800', 'w_200') // Smaller for thumbnails
        }));

        setMemories(processedMemories);
      } catch (err) {
        setError('Failed to load memories. Please try again.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    const interval = isAutoPlaying && memories.length > 0
      ? setInterval(() => {
          setCurrentIndex(prev => (prev + 1) % memories.length);
        }, 3000)
      : null;
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, memories.length]);

  const navigate = (direction) => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => 
      direction === 'prev' 
        ? prev === 0 ? memories.length - 1 : prev - 1
        : (prev + 1) % memories.length
    );
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading your memories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>⚠️ Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Memories Found</h3>
        <p>Add some memories to get started!</p>
      </div>
    );
  }

  return (
    <div className="memories-gallery">
      <header className="gallery-header">
        <h1>Our Precious Moments</h1>
        <div className="controls">
          <button 
            className="control-btn"
            onClick={() => navigate('prev')}
            aria-label="Previous"
          >
            ❮
          </button>
          <span>{currentIndex + 1} / {memories.length}</span>
          <button 
            className="control-btn"
            onClick={() => navigate('next')}
            aria-label="Next"
          >
            ❯
          </button>
        </div>
      </header>

      <div className="main-viewer">
        <div className="image-wrapper">
          <img
            src={memories[currentIndex].img}
            alt={memories[currentIndex].title}
            className="main-image"
            loading="eager"
            decoding="sync"
            onError={(e) => {
              e.target.src = `https://placehold.co/800x500?text=${encodeURIComponent(memories[currentIndex]?.title || 'Memory')}`;
              e.target.className += ' fallback-image';
            }}
          />
          <div className="image-caption">
            <h2>{memories[currentIndex].title}</h2>
          </div>
        </div>
      </div>

      <div className="thumbnail-track">
        {memories.map((memory, index) => (
          <div 
            key={memory._id}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
          >
            <img
              src={memory.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memories;