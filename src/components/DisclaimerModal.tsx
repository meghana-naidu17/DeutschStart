import { useState } from 'react';
import { X, AlertTriangle, Video, BookOpen, ExternalLink, CheckCircle, Lightbulb, Compass } from 'lucide-react';
import { youtubeResources, bookResources } from '../data/resources';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DisclaimerModal({ isOpen, onClose }: DisclaimerModalProps) {
  const [activeTab, setActiveTab] = useState<'disclaimer' | 'youtube' | 'books'>('disclaimer');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="disclaimer-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="disclaimer-header">
          <div className="disclaimer-alert-badge">
            <AlertTriangle size={18} />
            <span>Essential Study Guidance</span>
          </div>
          <h2>Study Disclaimer & Companion Resources</h2>
          <p>
            Please read this important notice regarding your German A1 learning journey.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="disclaimer-tabs">
          <button
            className={`disclaimer-tab-btn ${activeTab === 'disclaimer' ? 'active' : ''}`}
            onClick={() => setActiveTab('disclaimer')}
          >
            <Compass size={16} /> The Study Disclaimer
          </button>
          <button
            className={`disclaimer-tab-btn ${activeTab === 'youtube' ? 'active' : ''}`}
            onClick={() => setActiveTab('youtube')}
          >
            <Video size={16} /> Recommended YouTube Channels
          </button>
          <button
            className={`disclaimer-tab-btn ${activeTab === 'books' ? 'active' : ''}`}
            onClick={() => setActiveTab('books')}
          >
            <BookOpen size={16} /> Standard Textbooks & Workbooks
          </button>
        </div>

        {/* Tab 1: Disclaimer Main Notice */}
        {activeTab === 'disclaimer' && (
          <div className="disclaimer-tab-content">
            <div className="disclaimer-callout-box">
              <div className="callout-icon">
                <AlertTriangle size={32} />
              </div>
              <div className="callout-text">
                <h3>DeutschStart is Your Path, But Not Sufficient Alone</h3>
                <p>
                  <strong>DeutschStart</strong> provides an intuitive, step-by-step roadmap, interactive grammar drills, and vocabulary translated into your language. However, <strong>website practice alone is NOT enough to complete German A1 or pass the official Goethe-Zertifikat A1 (Start Deutsch 1) exam.</strong>
                </p>
              </div>
            </div>

            <div className="disclaimer-reasons">
              <h4>Why is self-study on any website not enough for complete A1?</h4>
              
              <div className="reasons-grid">
                <div className="reason-card">
                  <div className="reason-number">1</div>
                  <div className="reason-info">
                    <strong>Hören (Listening Comprehension)</strong>
                    <p>
                      Official exams feature real native German speakers speaking at full natural speed with background noise (announcements at train stations, phone voicemails, supermarket dialogues). You must listen to authentic German videos and audio files repeatedly.
                    </p>
                  </div>
                </div>

                <div className="reason-card">
                  <div className="reason-number">2</div>
                  <div className="reason-info">
                    <strong>Sprechen (Spoken Partner Conversation)</strong>
                    <p>
                      In the Goethe A1 exam, Part 2 and Part 3 require you to ask and answer questions with a live human partner using prompt cards. You must practice speaking aloud, repeating after native videos, and formulating sentences orally.
                    </p>
                  </div>
                </div>

                <div className="reason-card">
                  <div className="reason-number">3</div>
                  <div className="reason-info">
                    <strong>Schreiben (Handwritten Letter/Email & Form Filling)</strong>
                    <p>
                      The exam requires handwritten filling of German registration forms (Name, Postleitzahl, Geburtsdatum, Unterschrift) and writing a 30-word formal/informal email. Coursebook workbooks provide the necessary handwritten practice.
                    </p>
                  </div>
                </div>

                <div className="reason-card">
                  <div className="reason-number">4</div>
                  <div className="reason-info">
                    <strong>Standardized Exam Timing & Format</strong>
                    <p>
                      Official test prep books (like <em>Fit fürs Goethe-Zertifikat A1</em>) contain full model test papers with official scoring grids and answer sheets.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="disclaimer-formula-box">
              <div className="formula-heading">
                <Lightbulb size={20} />
                <strong>The Proven Formula to Clear Goethe / Telc A1:</strong>
              </div>
              <ul className="formula-list">
                <li>
                  <CheckCircle size={16} className="text-success" />
                  <strong>30% DeutschStart:</strong> Learn grammar rules, interactive exercises, vocabulary, and verify words on dict.cc.
                </li>
                <li>
                  <CheckCircle size={16} className="text-success" />
                  <strong>40% YouTube Practice:</strong> Watch authentic native speaker videos (Easy German, DW Nicos Weg, Anja) for natural listening and pronunciation.
                </li>
                <li>
                  <CheckCircle size={16} className="text-success" />
                  <strong>30% Standard Textbooks:</strong> Work through a certified A1 coursebook (Netzwerk neu A1 or Studio d) and official sample exam papers.
                </li>
              </ul>
            </div>

            <div className="disclaimer-actions">
              <button
                className="secondary-action-btn"
                onClick={() => setActiveTab('youtube')}
              >
                <Video size={16} /> Explore YouTube Channels
              </button>
              <button
                className="primary-action-btn"
                onClick={() => setActiveTab('books')}
              >
                <BookOpen size={16} /> Explore Standard Books
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: YouTube Channels */}
        {activeTab === 'youtube' && (
          <div className="disclaimer-tab-content">
            <p className="tab-lead-text">
              We strongly recommend watching these structured YouTube channels daily alongside DeutschStart to train your ears for natural German:
            </p>

            <div className="resource-cards-list">
              {youtubeResources.map((yt) => (
                <div key={yt.id} className="resource-card yt-card">
                  <div className="resource-card-top">
                    <div className="resource-badge">{yt.badge}</div>
                    <span className="resource-subscribers">{yt.subscribers}</span>
                  </div>

                  <h3>{yt.channelName}</h3>
                  <p className="resource-creator">By {yt.creator}</p>
                  <p className="resource-desc">{yt.description}</p>

                  <div className="resource-recommended">
                    <strong>Best for:</strong> {yt.recommendedFor}
                  </div>

                  <div className="resource-topics">
                    {yt.topics.map((t, idx) => (
                      <span key={idx} className="topic-pill">{t}</span>
                    ))}
                  </div>

                  <div className="resource-footer">
                    <span className="playlist-tag">Featured: {yt.featuredPlaylist}</span>
                    <a
                      href={yt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-link-btn"
                    >
                      Watch on YouTube <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Books */}
        {activeTab === 'books' && (
          <div className="disclaimer-tab-content">
            <p className="tab-lead-text">
              Use these certified textbooks and exercise workbooks to ensure complete coverage of the European Framework (CEFR A1) syllabus:
            </p>

            <div className="resource-cards-list">
              {bookResources.map((book) => (
                <div key={book.id} className="resource-card book-card">
                  <div className="resource-card-top">
                    <span className="book-emoji">{book.coverEmoji}</span>
                    <span className="book-type-pill">{book.type}</span>
                    <span className="book-level-pill">{book.level}</span>
                  </div>

                  <h3>{book.title}</h3>
                  <p className="resource-creator">Published by {book.authorOrPublisher}</p>
                  <p className="resource-desc">{book.description}</p>

                  <div className="book-highlights">
                    <strong>Key Features:</strong>
                    <ul>
                      {book.highlights.map((h, idx) => (
                        <li key={idx}>
                          <CheckCircle size={14} /> {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="resource-footer">
                    <a
                      href={book.isbnOrStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-link-btn"
                    >
                      Publisher Details & Store <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
