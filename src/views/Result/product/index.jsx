import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// API
// ============================================================================
const API = '/api';

async function startAnalysis(keyFeatures) {
  const res = await fetch(`${API}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyFeatures }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to start analysis');
  }
  return res.json();
}

async function getProject(id) {
  const res = await fetch(`${API}/projects/${id}`);
  if (!res.ok) throw new Error('Failed to fetch project');
  return res.json();
}

async function retryProject(id) {
  const res = await fetch(`${API}/projects/${id}/retry`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to retry');
  return res.json();
}

// ============================================================================
// MAIN APP
// ============================================================================
export default function App() {
  const [view, setView] = useState('input');
  const [projectId, setProjectId] = useState(null);
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');

  const handleStart = useCallback(async (keyFeatures) => {
    try {
      setError('');
      const data = await startAnalysis(keyFeatures);
      setProjectId(data.projectId);
      setView('processing');
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const handleRetry = useCallback(async () => {
    if (!projectId) return;
    try {
      setError('');
      await retryProject(projectId);
      setView('processing');
    } catch (err) {
      setError(err.message);
    }
  }, [projectId]);

  const handleReset = useCallback(() => {
    setView('input');
    setProjectId(null);
    setProject(null);
    setError('');
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <button className="logo" onClick={handleReset}>
            <span className="logo-icon">◈</span>
            <span>Invention Mapper</span>
          </button>
          {view !== 'input' && (
            <button className="btn-ghost" onClick={handleReset}>← New Analysis</button>
          )}
        </div>
      </header>

      <main className="main">
        {error && (
          <div className="error-bar">
            <span>{error}</span>
            <button onClick={() => setError('')}>✕</button>
          </div>
        )}
        {view === 'input' && <InputView onSubmit={handleStart} />}
        {view === 'processing' && (
          <ProcessingView
            projectId={projectId}
            onComplete={(proj) => { setProject(proj); setView('results'); }}
            onFail={(proj) => { setProject(proj); setError(proj.error || 'Analysis failed'); }}
          />
        )}
        {view === 'results' && project && (
          <ResultsView project={project} onRetry={handleRetry} />
        )}
      </main>
    </div>
  );
}

// ============================================================================
// INPUT VIEW
// ============================================================================
function InputView({ onSubmit }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => { textareaRef.current?.focus(); }, []);

  const charCount = text.trim().length;
  const isValid = charCount >= 20 && charCount <= 5000;

  const handleSubmit = async () => {
    if (!isValid || loading) return;
    setLoading(true);
    try { await onSubmit(text.trim()); } finally { setLoading(false); }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  return (
    <div className="input-view">
      <div className="input-hero">
        <h1>Map your invention to real products</h1>
        <p className="subtitle">
          Describe your invention's key features and we'll find which commercial
          products implement similar technology — with evidence-backed mapping charts.
        </p>
      </div>

      <div className="input-card">
        <label className="input-label" htmlFor="features">Invention Key Features</label>
        <textarea
          ref={textareaRef}
          id="features"
          className="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`e.g., A wireless communication system that uses adaptive beamforming with real-time channel estimation to optimize signal quality. The system employs machine learning algorithms to predict optimal beam patterns based on user mobility data. It includes a distributed antenna array that can dynamically reconfigure its geometry based on network load conditions...`}
          rows={8}
          maxLength={5000}
          disabled={loading}
        />
        <div className="input-footer">
          <span className={`char-count ${charCount > 0 && !isValid ? 'invalid' : ''}`}>
            {charCount.toLocaleString()} / 5,000 characters
            {charCount > 0 && charCount < 20 && ' (minimum 20)'}
          </span>
          <button className="btn-primary" onClick={handleSubmit} disabled={!isValid || loading}>
            {loading ? (<><span className="spinner" /> Starting...</>) : 'Analyze Features →'}
          </button>
        </div>
      </div>

      <div className="input-info">
        <div className="info-item">
          <span className="info-icon">⏱</span>
          <div><strong>~10-15 min</strong><span>Deep analysis across markets</span></div>
        </div>
        <div className="info-item">
          <span className="info-icon">🔍</span>
          <div><strong>20 products scanned</strong><span>Top 5 analyzed with web evidence</span></div>
        </div>
        <div className="info-item">
          <span className="info-icon">📊</span>
          <div><strong>Feature-by-feature charts</strong><span>With source citations</span></div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PROCESSING VIEW
// ============================================================================
function ProcessingView({ projectId, onComplete, onFail }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState('Starting analysis...');
  const [elapsed, setElapsed] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (!projectId) return;
    let alive = true;

    const poll = async () => {
      try {
        const data = await getProject(projectId);
        if (!alive) return;
        setProgress(data.progress);
        setStep(data.currentStep || 'Processing...');

        if (data.status === 'completed') {
          setProgress(100);
          setTimeout(() => onComplete(data), 600);
          return;
        }
        if (data.status === 'failed') { onFail(data); return; }
      } catch { /* ignore transient errors */ }
      if (alive) setTimeout(poll, 3000);
    };

    poll();
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.current) / 1000));
    }, 1000);
    return () => { alive = false; clearInterval(timer); };
  }, [projectId, onComplete, onFail]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="processing-view">
      <div className="processing-card">
        <div className="processing-anim">
          <div className="orbit">
            <div className="orbit-dot" />
            <div className="orbit-dot d2" />
            <div className="orbit-dot d3" />
          </div>
        </div>
        <h2>Analyzing your invention</h2>
        <p className="step-label">{step}</p>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${Math.max(progress, 2)}%` }} />
        </div>
        <div className="progress-meta">
          <span>{progress}%</span>
          <span>{formatTime(elapsed)} elapsed</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// RESULTS VIEW
// ============================================================================
function ResultsView({ project, onRetry }) {
  const [activeTab, setActiveTab] = useState(0);

  const charts = project.results?.productCharts || [];
  const additionalProducts = project.results?.additionalProducts || [];
  const parsedFeatures = project.parsedFeatures || [];

  const sortedCharts = [...charts].sort((a, b) => {
    const scoreA = (a.foundCount || 0) * 3 + (a.partialCount || 0);
    const scoreB = (b.foundCount || 0) * 3 + (b.partialCount || 0);
    if (scoreB !== scoreA) return scoreB - scoreA;
    const tierOrder = { H: 3, M: 2, L: 1 };
    return (tierOrder[b.finalChart?.overallScore] || 0) - (tierOrder[a.finalChart?.overallScore] || 0);
  });

  if (project.status === 'failed') {
    return (
      <div className="results-view">
        <div className="fail-card">
          <h2>Analysis Failed</h2>
          <p>{project.error || 'An unexpected error occurred.'}</p>
          <button className="btn-primary" onClick={onRetry}>Retry Analysis</button>
        </div>
      </div>
    );
  }

  if (sortedCharts.length === 0) {
    return (
      <div className="results-view">
        <div className="fail-card">
          <h2>No results</h2>
          <p>The analysis completed but produced no mapping charts.</p>
        </div>
      </div>
    );
  }

  const activeChart = sortedCharts[activeTab];

  return (
    <div className="results-view">
      <div className="results-summary">
        <h2>Analysis Complete</h2>
        <p>{parsedFeatures.length} features mapped across {sortedCharts.length} products</p>
      </div>

      {/* Product tabs */}
      <div className="tabs-container">
        <div className="tabs-scroll">
          {sortedCharts.map((chart, idx) => (
            <button
              key={idx}
              className={`tab ${idx === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <ScoreBadge score={chart.finalChart?.overallScore} />
              <span className="tab-name">{chart.productName}</span>
              <span className="tab-company">{chart.company}</span>
              <span className="tab-stats">
                {chart.foundCount}F / {chart.partialCount}P /{' '}
                {(chart.totalFeatures || 0) - (chart.foundCount || 0) - (chart.partialCount || 0)}N
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeChart && <ChartPanel chart={activeChart} />}

      {additionalProducts.length > 0 && (
        <div className="additional-section">
          <h3>Additional Products Discovered</h3>
          <p className="additional-subtitle">15 more products identified during discovery — not deeply analyzed</p>
          <div className="additional-grid">
            {additionalProducts.map((p, i) => (
              <div key={i} className="additional-card">
                <div className="additional-header">
                  <span className="additional-name">{p.name}</span>
                </div>
                <span className="additional-company">{p.company}</span>
                <span className="additional-desc">{p.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// CHART PANEL — 4-column table layout
// ============================================================================
function ChartPanel({ chart }) {
  const { finalChart } = chart;
  const mappings = finalChart?.mappings || [];
  const urlMapping = finalChart?.urlMapping || {};

  return (
    <div className="chart-panel">
      {/* Summary header */}
      <div className="chart-summary">
        <div className="chart-summary-left">
          <ScoreBadge score={finalChart?.overallScore} large />
          <div>
            <h3>{chart.productName} <span className="company-tag">by {chart.company}</span></h3>
            <p className="score-rationale">{finalChart?.summary}</p>
          </div>
        </div>
        <div className="chart-stats-bar">
          <StatPill label="Found" count={chart.foundCount} total={chart.totalFeatures} cls="found" />
          <StatPill label="Partial" count={chart.partialCount} total={chart.totalFeatures} cls="partial" />
          <StatPill
            label="Not Found"
            count={(chart.totalFeatures || 0) - (chart.foundCount || 0) - (chart.partialCount || 0)}
            total={chart.totalFeatures}
            cls="notfound"
          />
        </div>
      </div>

      {/* ---- 4-COLUMN TABLE ---- */}
      <div className="chart-table-wrap">
        <table className="chart-table">
          <thead>
            <tr>
              <th className="th-feature">Key Feature</th>
              <th className="th-analysis">Analysis</th>
              <th className="th-evidence">Evidence</th>
              <th className="th-sources">Sources</th>
            </tr>
          </thead>
          <tbody>
            {mappings.map((m, idx) => {
              const statusCls = statusClass(m.status);
              const rowSources = (m.sourceNumbers || [])
                .map((n) => ({ num: n, url: urlMapping[String(n)] }))
                .filter((s) => s.url);

              return (
                <tr key={idx} className={`trow ${statusCls}`}>
                  {/* Col 1 — Feature */}
                  <td className="td-feature">
                    <span className="feat-num">{idx + 1}</span>
                    <span className={`status-dot ${statusCls}`} title={m.status} />
                    <span className="feat-text">{m.feature}</span>
                  </td>

                  {/* Col 2 — Analysis */}
                  <td className="td-analysis">
                    <span className={`status-tag ${statusCls}`}>{m.status}</span>
                    <p><RenderCited text={m.productAnalysis} urlMapping={urlMapping} /></p>
                  </td>

                  {/* Col 3 — Evidence */}
                  <td className="td-evidence">
                    {m.supportingEvidence
                      ? <p><RenderCited text={m.supportingEvidence} urlMapping={urlMapping} /></p>
                      : <span className="empty-cell">—</span>}
                  </td>

                  {/* Col 4 — Sources */}
                  <td className="td-sources">
                    {rowSources.length > 0 ? (
                      <div className="source-chips">
                        {rowSources.map((s) => (
                          <a
                            key={s.num}
                            href={cleanUrl(s.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-chip"
                            title={cleanUrl(s.url)}
                          >
                            [{s.num}]
                          </a>
                        ))}
                      </div>
                    ) : <span className="empty-cell">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Full source list */}
      {Object.keys(urlMapping).length > 0 && (
        <div className="sources-section">
          <h4>All Sources</h4>
          <div className="sources-list">
            {Object.entries(urlMapping).map(([num, url]) => (
              <a key={num} href={cleanUrl(url)} target="_blank" rel="noopener noreferrer" className="source-link">
                <span className="source-num">[{num}]</span>
                <span className="source-url">{cleanUrl(url)}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// RENDER CITED TEXT — [Source N] → clickable links
// ============================================================================
function RenderCited({ text, urlMapping }) {
  if (!text) return null;
  const parts = text.split(/(\[Source \d+\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/\[Source (\d+)\]/);
        if (match) {
          const num = match[1];
          const url = urlMapping[num];
          if (url) {
            return (
              <a key={i} href={cleanUrl(url)} target="_blank" rel="noopener noreferrer"
                className="inline-source" title={cleanUrl(url)}>[{num}]</a>
            );
          }
          return <span key={i} className="inline-source-dead">[{num}]</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ============================================================================
// SMALL COMPONENTS
// ============================================================================
function statusClass(status) {
  return { Found: 'found', Partial: 'partial', 'Not Found': 'notfound' }[status] || 'notfound';
}

function ScoreBadge({ score, large }) {
  const cls = { H: 'score-h', M: 'score-m', L: 'score-l' }[score] || 'score-l';
  const label = { H: 'High', M: 'Medium', L: 'Low' }[score] || score;
  return <span className={`score-badge ${cls} ${large ? 'large' : ''}`}>{large ? label : score}</span>;
}

function StatPill({ label, count, total, cls }) {
  return (
    <div className={`stat-pill ${cls}`}>
      <span className="stat-count">{count}</span>
      <span className="stat-label">{label} <span className="stat-of">/ {total}</span></span>
    </div>
  );
}

function cleanUrl(url) {
  if (!url) return '#';
  return url.replace(/[.,;:!?)]+$/, '');
}
