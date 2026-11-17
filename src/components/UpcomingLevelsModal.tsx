import { useState } from 'react';
import { X, Lock, Sparkles, CheckCircle2, Clock, Calendar, Bell, BookCheck } from 'lucide-react';
import { upcomingLevels } from '../data/resources';

interface UpcomingLevelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLevel?: 'a2' | 'b1';
}

export default function UpcomingLevelsModal({
  isOpen,
  onClose,
  initialLevel = 'a2'
}: UpcomingLevelsModalProps) {
  const [selectedLevelId, setSelectedLevelId] = useState<'a2' | 'b1'>(initialLevel);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const currentLevel = upcomingLevels.find((l) => l.id === selectedLevelId) || upcomingLevels[0];

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="upcoming-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="upcoming-header">
          <div className="upcoming-badge">
            <Lock size={15} />
            <span>Future Roadmap</span>
          </div>
          <h2>Upcoming German Levels: A2 & B1</h2>
          <p>
            Build your long-term German fluency. Here is what we are preparing for the next phases after A1.
          </p>
        </div>

        {/* Level Switcher Tabs */}
        <div className="upcoming-tabs">
          {upcomingLevels.map((lvl) => (
            <button
              key={lvl.id}
              className={`upcoming-tab-btn ${selectedLevelId === lvl.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedLevelId(lvl.id);
                setSubscribed(false);
              }}
            >
              <span className="lvl-tag">{lvl.level}</span>
              <span className="lvl-title">{lvl.title}</span>
              <span className="lvl-status-pill">{lvl.status}</span>
            </button>
          ))}
        </div>

        {/* Level Content */}
        <div className="upcoming-body">
          <div className="upcoming-info-card">
            <div className="info-top">
              <div>
                <h3>{currentLevel.title}</h3>
                <p className="subtitle">{currentLevel.subtitle}</p>
              </div>
              <div className="time-badge">
                <Clock size={16} />
                <span>{currentLevel.estimatedHours}</span>
              </div>
            </div>

            <div className="cefr-box">
              <strong>Official CEFR Capability:</strong>
              <p>„{currentLevel.cefrDescription}“</p>
            </div>

            <div className="meta-row">
              <div className="meta-item">
                <Calendar size={16} />
                <span>Expected Launch: <strong>{currentLevel.expectedRelease}</strong></span>
              </div>
              <div className="meta-item">
                <Sparkles size={16} />
                <span>Interactive Exercises, Audio & Quizzes included</span>
              </div>
            </div>
          </div>

          {/* Curriculum Preview */}
          <div className="curriculum-preview-section">
            <h4>
              <BookCheck size={18} /> Planned Curriculum Modules ({currentLevel.topics.length} Units)
            </h4>
            <div className="curriculum-topics-grid">
              {currentLevel.topics.map((topic, idx) => (
                <div key={idx} className="curriculum-topic-card">
                  <div className="topic-header">
                    <span className="topic-icon">{topic.icon}</span>
                    <h5>{topic.title}</h5>
                  </div>
                  <p>{topic.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Waitlist Form */}
          <div className="waitlist-card">
            <div className="waitlist-text">
              <Bell size={24} className="bell-icon" />
              <div>
                <h4>Get Notified First for {currentLevel.level} Release</h4>
                <p>Be the first to access early beta lessons and exclusive study materials.</p>
              </div>
            </div>

            {subscribed ? (
              <div className="waitlist-success">
                <CheckCircle2 size={20} />
                <span>You're on the waitlist! We'll notify you as soon as {currentLevel.level} opens.</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="waitlist-form">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  required
                />
                <button type="submit" className="primary-action-btn">
                  Join {currentLevel.level} Waitlist
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
