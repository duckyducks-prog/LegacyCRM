import { useState } from 'react';

export default function ChatSupport() {
  const [showTyping, setShowTyping] = useState(false);

  const handleClick = () => {
    setShowTyping(true);

    // Show "typing" for a few seconds, then open mailto
    setTimeout(() => {
      setShowTyping(false);
      window.location.href = 'mailto:support@legacycrm.local?subject=Support%20Request%20-%20LegacyCRM%20Pro&body=Please%20describe%20your%20issue%20below.%20Average%20response%20time%3A%203-5%20business%20days.%0A%0A---%0AIssue%3A%0A%0A';
    }, 3000);
  };

  return (
    <>
      <button className="chat-support-btn" onClick={handleClick}>
        💬 Chat with Support
      </button>

      {showTyping && (
        <div style={{
          position: 'fixed',
          bottom: '70px',
          right: '20px',
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '15px',
          boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
          width: '250px',
          zIndex: 1000,
        }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>
            LegacyCRM Support
          </div>
          <div style={{ fontSize: '10px', color: '#666' }}>
            <span style={{ display: 'inline-block', animation: 'pulse 1s infinite' }}>
              Support agent is typing...
            </span>
          </div>
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
