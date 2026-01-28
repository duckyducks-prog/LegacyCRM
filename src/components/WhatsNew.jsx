import { versionHistory } from '../utils/dysfunction';

export default function WhatsNew({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal whats-new-modal" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          🆕 What&apos;s New in LegacyCRM Pro™
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {versionHistory.map((version, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <div className="version-header">
                Version {version.version}
                {idx === 0 && <span className="enterprise-badge" style={{ marginLeft: '10px' }}>CURRENT</span>}
              </div>
              <div className="version-date">Released: {version.date}</div>
              <ul>
                {version.features.map((feature, fidx) => (
                  <li key={fidx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}

          <div style={{
            background: '#f5f5f5',
            padding: '15px',
            marginTop: '20px',
            border: '1px solid #ddd'
          }}>
            <strong>Coming in Version 2.4:</strong>
            <ul style={{ marginBottom: 0 }}>
              <li>Mobile-responsive design (postponed from v2.2)</li>
              <li>Improved search functionality (pending review)</li>
              <li>Dark mode that actually works (in development since 2014)</li>
              <li>Export to modern formats like CSV (under consideration)</li>
              <li>Single Sign-On integration (waiting for vendor)</li>
            </ul>
            <p style={{ fontSize: '10px', color: '#666', marginBottom: 0, marginTop: '10px' }}>
              * Release date TBD. Features subject to change based on resource availability.
            </p>
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '20px',
            padding: '10px',
            background: '#fff3cd',
            border: '1px solid #ffc107',
            fontSize: '11px'
          }}>
            📢 For feature requests, please submit form IT-FEATURE-REQ-847
            and allow 6-8 weeks for initial review.
          </div>
        </div>
        <div className="modal-footer">
          <label style={{ fontSize: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="checkbox" disabled />
            Don&apos;t show this again (Feature coming in v2.4)
          </label>
          <button className="btn btn-primary" onClick={onClose}>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
