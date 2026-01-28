import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import SessionWarning from './SessionWarning';
import WhatsNew from './WhatsNew';
import ChatSupport from './ChatSupport';

export default function Layout() {
  const { user, logout, unreadNotifications, sessionWarning, darkMode, toggleDarkMode } = useApp();
  const navigate = useNavigate();
  const [showWhatsNew, setShowWhatsNew] = useState(true); // Always show on first load
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Keyboard shortcuts that do the opposite
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') {
          e.preventDefault();
          navigate('/search'); // Ctrl+S opens search instead of saving
        }
        if (e.key === 'p') {
          e.preventDefault();
          alert('Print functionality has been deprecated. Please use Export > PDF > Legacy Format > Print Queue.');
        }
        if (e.key === 'f') {
          e.preventDefault();
          alert('Find functionality is available in Search module. Redirecting...');
          setTimeout(() => navigate('/search'), 2000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleLogout = () => {
    const confirmations = [
      'Are you sure you want to log out?',
      'Are you really sure? Unsaved changes will be lost.',
      'Final confirmation: This will end your session.',
    ];

    for (const msg of confirmations) {
      if (!window.confirm(msg)) {
        return;
      }
    }

    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      {/* Top navigation bar */}
      <div className="top-bar">
        <div className="app-title">
          LegacyCRM Pro™
        </div>

        <nav className="top-nav">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/contacts" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            👥 Contacts
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            🔍 Search
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            📈 Reports
          </NavLink>
          <span className="nav-item" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="Module not licensed">
            📧 Email
          </span>
          <span className="nav-item" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="Coming Soon (Since 2012)">
            📱 Mobile
          </span>
        </nav>

        <div className="top-actions">
          <div
            className="notification-bell"
            onClick={() => alert(`You have ${unreadNotifications.toLocaleString()} unread notifications.\n\nClearing notifications requires Administrator access.\n\nTo request access, submit form IT-ACCESS-847-C.`)}
          >
            🔔
            <span className="notification-badge">{unreadNotifications.toLocaleString()}</span>
          </div>

          <div
            className="user-menu"
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{ position: 'relative' }}
          >
            👤 Hello, {user?.firstName || 'User'} {user?.lastName || '[NULL]'} ▼

            {showUserMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'white',
                border: '1px solid #ccc',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
                minWidth: '200px',
                zIndex: 100,
              }}>
                <div style={{ padding: '10px', borderBottom: '1px solid #eee', fontSize: '10px', color: '#666' }}>
                  <div><strong>Logged in as:</strong></div>
                  <div>{user?.email}</div>
                  <div>Role: {user?.role}</div>
                  <div>Last login: {user?.lastLogin}</div>
                </div>
                <div
                  style={{ padding: '8px 10px', cursor: 'pointer', fontSize: '11px' }}
                  onClick={() => alert('Profile settings are managed by IT. Submit form HR-PROFILE-UPDATE-847 to request changes.')}
                >
                  ⚙️ Profile Settings
                </div>
                <div
                  style={{ padding: '8px 10px', cursor: 'pointer', fontSize: '11px' }}
                  onClick={toggleDarkMode}
                >
                  {darkMode ? '☀️' : '🌙'} {darkMode ? 'Light' : 'Dark'} Mode
                  <span style={{ fontSize: '9px', color: '#999' }}> (Beta)</span>
                </div>
                <div
                  style={{ padding: '8px 10px', cursor: 'pointer', fontSize: '11px', borderTop: '1px solid #eee' }}
                  onClick={handleLogout}
                >
                  🚪 Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System status banner */}
      <div className="system-status">
        <span className="status-icon">⚠️</span>
        System Status: Partially Operational |
        <span style={{ marginLeft: '10px' }}>
          Scheduled maintenance: Every other Thursday 2-6 AM PST (may extend)
        </span>
        <span style={{ marginLeft: '10px', fontSize: '9px', opacity: 0.8 }}>
          | Last updated: March 15, 2016
        </span>
      </div>

      {/* Marquee notice for extra chaos */}
      <div className="marquee-notice">
        <span>
          🚨 IMPORTANT: Database migration scheduled for Q4 2017. Please backup all critical data.
          Contact migration-team@company.local for questions.
          🚨 REMINDER: Annual security training due by December 31, 2016.
          🚨 NEW: Version 2.4 coming soon with exciting features! (Timeline TBD)
        </span>
      </div>

      {/* Main content */}
      <div className="main-content">
        <aside className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-header">Quick Access</div>
            <NavLink to="/dashboard" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
              📊 Dashboard
            </NavLink>
            <NavLink to="/contacts" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
              👤 My Contacts
            </NavLink>
            <span className="sidebar-item" style={{ opacity: 0.5 }}>
              ⭐ Favorites (Empty)
            </span>
            <span className="sidebar-item" style={{ opacity: 0.5 }}>
              🕐 Recent (Loading...)
            </span>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-header">Tools</div>
            <NavLink to="/search" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
              🔍 Search
            </NavLink>
            <NavLink to="/reports" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
              📈 Reports
            </NavLink>
            <span
              className="sidebar-item"
              onClick={() => alert('Import/Export functionality requires additional licensing. Contact sales@legacycrm.com.')}
              style={{ cursor: 'pointer' }}
            >
              📤 Import/Export
            </span>
            <span
              className="sidebar-item"
              onClick={() => alert('Calendar integration coming in version 3.0!')}
              style={{ cursor: 'pointer' }}
            >
              📅 Calendar
            </span>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-header">Support</div>
            <span
              className="sidebar-item"
              onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
              style={{ cursor: 'pointer' }}
            >
              📹 Tutorial Video
            </span>
            <span
              className="sidebar-item"
              onClick={() => alert('Documentation is currently being updated. ETA: Q2 2017.')}
              style={{ cursor: 'pointer' }}
            >
              📖 Help Docs
            </span>
            <span
              className="sidebar-item"
              onClick={() => setShowWhatsNew(true)}
              style={{ cursor: 'pointer' }}
            >
              🆕 What&apos;s New
            </span>
          </div>

          <div style={{ padding: '15px', fontSize: '9px', color: '#999', borderTop: '1px solid #ddd', marginTop: 'auto' }}>
            v2.3.0 (Build 847)
            <br />
            © 2003-2016 LegacyCRM
            <br />
            <a href="#rate" onClick={(e) => {
              e.preventDefault();
              const rating = window.confirm('Rate your experience:\n\nClick OK for "Excellent"\nClick Cancel for "Very Excellent"');
              alert(rating ? 'Thank you for rating us Excellent!' : 'Thank you for rating us Very Excellent!');
            }} style={{ color: '#336699' }}>
              Rate Your Experience
            </a>
          </div>
        </aside>

        <main className="content-area">
          <Outlet />
        </main>
      </div>

      {/* Session warning modal */}
      {sessionWarning && <SessionWarning />}

      {/* What's New popup */}
      {showWhatsNew && <WhatsNew onClose={() => setShowWhatsNew(false)} />}

      {/* Chat support button */}
      <ChatSupport />
    </div>
  );
}
