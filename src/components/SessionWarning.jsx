import { useState, useEffect } from 'react';
import { useApp } from '../App';

export default function SessionWarning() {
  const { setSessionWarning } = useApp();
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [extended, setExtended] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Don't actually log out, just reset the timer
          return 15 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExtend = () => {
    setExtended(true);
    setTimeLeft(15 * 60);

    // Show message then reset
    setTimeout(() => {
      setExtended(false);
    }, 3000);
  };

  const handleDismiss = () => {
    // Dismiss but it will come back
    setSessionWarning(false);
    setTimeout(() => {
      setSessionWarning(true);
    }, 30000); // Come back in 30 seconds
  };

  return (
    <div className="modal-overlay">
      <div className="modal session-warning">
        <div className="modal-header">
          ⚠️ Session Timeout Warning
          <button className="modal-close" onClick={handleDismiss}>×</button>
        </div>
        <div className="modal-body">
          {extended ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>✓</div>
              <p>Session extended!</p>
              <p style={{ fontSize: '10px', color: '#666' }}>
                (For another 15 minutes. This warning will appear again.)
              </p>
            </div>
          ) : (
            <>
              <p style={{ marginTop: 0 }}>
                <strong>Your session will expire in:</strong>
              </p>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: timeLeft < 60 ? '#cc0000' : '#336699',
                margin: '15px 0'
              }}>
                {formatTime(timeLeft)}
              </div>
              <p style={{ fontSize: '11px', color: '#666' }}>
                Due to security policies, sessions automatically expire after 15 minutes of activity.
                Yes, activity. We know. Please click "Extend Session" to continue working.
              </p>
              <p style={{ fontSize: '10px', color: '#999', fontStyle: 'italic' }}>
                Note: Session extensions are logged and may be reviewed by management.
              </p>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleDismiss}>
            Remind Me Later
          </button>
          <button className="btn btn-primary" onClick={handleExtend}>
            Extend Session
          </button>
        </div>
      </div>
    </div>
  );
}
