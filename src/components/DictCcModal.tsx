import { useState } from 'react';
import { X, ExternalLink, Search, Check, Sparkles, BookA, ShieldCheck, Volume2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dictCcInfo } from '../data/resources';
import { useTheme } from '../context/ThemeContext';

interface DictCcModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export default function DictCcModal({ isOpen, onClose, initialQuery = '' }: DictCcModalProps) {
  const { targetLanguage, searchDictionary, currentLanguage } = useLanguage();
  const { settings } = useTheme();
  const [query, setQuery] = useState(initialQuery);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const results = searchDictionary(query);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = settings.audioSpeed;
    window.speechSynthesis.speak(utterance);
  };

  const openDictCcUrl = (term: string) => {
    const finalTerm = term.trim() || 'Deutsch';
    const url = `https://www.dict.cc/?s=${encodeURIComponent(finalTerm)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = (word: string) => {
    navigator.clipboard.writeText(word);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="dictcc-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="dictcc-header">
          <div className="dictcc-badge">
            <span className="dictcc-logo-text">dict.cc</span>
            <span className="dictcc-verified-tag">
              <ShieldCheck size={14} /> Official Verified Translation Reference
            </span>
          </div>
          <h2>Precision German Translation with dict.cc</h2>
          <p className="dictcc-tagline">
            Always verify German words on <strong>dict.cc</strong> for 100% accurate grammatical gender (<strong>der/die/das</strong>), plural endings, and verified pronunciation.
          </p>
        </div>

        {/* Why dict.cc is essential banner */}
        <div className="dictcc-why-box">
          <div className="why-box-title">
            <Sparkles size={16} /> Why use dict.cc for German translation?
          </div>
          <div className="why-grid">
            {dictCcInfo.whyDictCc.map((item, idx) => (
              <div key={idx} className="why-item">
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Search Tool */}
        <div className="dictcc-search-section">
          <h3>Quick Word Lookup & dict.cc Direct Search</h3>
          <p className="search-instruction">
            Type any German word (or English / {currentLanguage.name} word) below. View instant translation, or click to open dict.cc:
          </p>

          <div className="dictcc-input-wrap">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="e.g. Apfel, Haus, Wasser, gehen, verstehen..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button className="clear-btn" onClick={() => setQuery('')}>
                <X size={16} />
              </button>
            )}
            <button
              className="dictcc-direct-btn"
              onClick={() => openDictCcUrl(query)}
              title="Search this word directly on dict.cc"
            >
              Look up on dict.cc <ExternalLink size={15} />
            </button>
          </div>

          {/* Quick chip suggestions */}
          <div className="quick-chips">
            <span className="chips-label">Popular searches:</span>
            {['Apfel', 'Wasser', 'Haus', 'Freund', 'Sprechen', 'Entschuldigung'].map((chip) => (
              <button
                key={chip}
                className="chip-btn"
                onClick={() => setQuery(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Instant Matches */}
          <div className="dictcc-results-list">
            {results.length > 0 ? (
              results.map((item, idx) => {
                const articleColor =
                  item.article === 'der'
                    ? 'article-der'
                    : item.article === 'die'
                    ? 'article-die'
                    : item.article === 'das'
                    ? 'article-das'
                    : '';

                return (
                  <div key={idx} className="dictcc-result-item">
                    <div className="result-left">
                      <div className="result-de-row">
                        {item.article && (
                          <span className={`article-pill ${articleColor}`}>
                            {item.article}
                          </span>
                        )}
                        <strong className="german-word">{item.german}</strong>
                        {item.plural && (
                          <span className="plural-badge">Plural: {item.plural}</span>
                        )}
                        <button
                          className="audio-icon-btn"
                          onClick={() => speak(item.german)}
                          title="Listen to German pronunciation"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>

                      <div className="result-pronounce">
                        <small>Pronunciation: <em>/{item.pronunciation}/</em></small>
                        <span className="category-tag">{item.category}</span>
                      </div>

                      <div className="result-translation-row">
                        <span className="lang-flag">{currentLanguage.flag}</span>
                        <strong className="trans-text">
                          {item.translations[targetLanguage] || item.translations.en}
                        </strong>
                        {targetLanguage !== 'en' && (
                          <span className="trans-en-sub">({item.translations.en})</span>
                        )}
                      </div>

                      <div className="result-example">
                        <span className="example-de">„{item.exampleSentenceDe}“</span>
                        <span className="example-trans">
                          — {item.exampleTranslation[targetLanguage] || item.exampleTranslation.en}
                        </span>
                      </div>
                    </div>

                    <div className="result-actions">
                      <button
                        className="copy-btn"
                        onClick={() => handleCopy(item.german)}
                        title="Copy word"
                      >
                        {copied ? <Check size={15} /> : <BookA size={15} />}
                      </button>
                      <button
                        className="open-dict-btn"
                        onClick={() => openDictCcUrl(item.german)}
                        title={`View ${item.german} on dict.cc with all declensions`}
                      >
                        dict.cc <ExternalLink size={13} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="dictcc-no-results">
                <p>Word not found in local quick cache.</p>
                <button
                  className="primary-action-btn"
                  onClick={() => openDictCcUrl(query)}
                >
                  Search "{query}" directly on dict.cc ↗
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="dictcc-footer-note">
          <p>
            💡 <strong>Pro-Tip for German Learners:</strong> When learning any German noun, always learn it together with its article: <strong>der</strong>, <strong>die</strong>, or <strong>das</strong>, and its plural form. dict.cc provides the most reliable data.
          </p>
        </div>
      </div>
    </div>
  );
}
