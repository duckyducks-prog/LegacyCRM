import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { widgetNames, getRandomError, fakeDelay, getLoadingMessage } from '../utils/dysfunction';

// Widget component with various states of dysfunction
function Widget({ name, type = 'normal' }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState('Loading...');

  useEffect(() => {
    // Random loading time between 1-5 seconds
    const loadTime = 1000 + Math.random() * 4000;

    const msgInterval = setInterval(() => {
      setLoadingMsg(getLoadingMessage());
    }, 1500);

    const timeout = setTimeout(() => {
      clearInterval(msgInterval);

      // 30% chance of error, 20% chance of "unavailable"
      const rand = Math.random();
      if (rand < 0.3) {
        setError(getRandomError());
      } else if (rand < 0.5) {
        setError('UNAVAILABLE');
      }
      setLoading(false);
    }, loadTime);

    return () => {
      clearTimeout(timeout);
      clearInterval(msgInterval);
    };
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="widget-loading">
          <div className="loading-spinner" style={{ width: '30px', height: '30px', margin: '0 auto' }}></div>
          <div style={{ marginTop: '10px' }}>{loadingMsg}</div>
        </div>
      );
    }

    if (error === 'UNAVAILABLE') {
      return (
        <div className="widget-unavailable">
          Data Unavailable
          <br />
          <span style={{ fontSize: '9px' }}>Contact Administrator</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="widget-error">
          ❌ {error}
        </div>
      );
    }

    // Render based on widget type
    switch (type) {
      case 'pie':
        return <PieChartWidget />;
      case 'calendar':
        return <CalendarWidget />;
      case 'stats':
        return <StatsWidget />;
      case 'list':
        return <ListWidget />;
      case 'graph':
        return <GraphWidget />;
      default:
        return (
          <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📊</div>
            Widget data loaded successfully.
            <div style={{ fontSize: '9px', marginTop: '5px', color: '#999' }}>
              (No data to display)
            </div>
          </div>
        );
    }
  };

  return (
    <div className="widget">
      <div className="widget-header">
        {name}
        <span
          className="widget-menu"
          onClick={() => alert('Widget settings require Admin access.\n\nTo customize widgets, submit form IT-WIDGET-CONFIG-847.')}
        >
          ⋮
        </span>
      </div>
      <div className="widget-body">
        {renderContent()}
      </div>
    </div>
  );
}

// Pie chart with 23 segments
function PieChartWidget() {
  const segments = [
    'Q1 Revenue', 'Q2 Revenue', 'Q3 Revenue', 'Q4 Revenue',
    'New Leads', 'Qualified Leads', 'Proposals Sent', 'Deals Won',
    'Deals Lost', 'Pending Deals', 'Follow-ups', 'Meetings',
    'Calls Made', 'Emails Sent', 'Website Visits', 'Form Submissions',
    'Support Tickets', 'Renewals', 'Upsells', 'Cross-sells',
    'Churned', 'At Risk', 'Other'
  ];

  const colors = Array(23).fill(0).map((_, i) =>
    `hsl(${210 + (i * 3)}, ${50 + (i % 3) * 10}%, ${40 + (i % 5) * 5}%)`
  );

  return (
    <div className="pie-chart-container">
      <div className="pie-chart"></div>
      <div className="pie-legend">
        {segments.map((seg, i) => (
          <div key={i} className="pie-legend-item">
            <div className="pie-legend-color" style={{ background: colors[i] }}></div>
            <span>{seg}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '8px', color: '#999', marginTop: '5px', textAlign: 'center' }}>
        * Data may not be accurate. Last synced: March 2016
      </div>
    </div>
  );
}

// Calendar showing old events
function CalendarWidget() {
  const oldEvents = [
    { date: 'Mar 15, 2019', title: 'Q1 Review Meeting' },
    { date: 'Feb 28, 2019', title: 'Sales Training' },
    { date: 'Jan 10, 2019', title: 'Team Offsite' },
    { date: 'Dec 20, 2018', title: 'Holiday Party' },
  ];

  return (
    <div className="calendar-widget">
      <div style={{ fontSize: '10px', color: '#999', marginBottom: '10px' }}>
        Showing events from: 2019
      </div>
      {oldEvents.map((event, i) => (
        <div key={i} className="event">
          <div className="event-date">{event.date}</div>
          <div>{event.title}</div>
        </div>
      ))}
      <div style={{ fontSize: '9px', color: '#999', marginTop: '10px' }}>
        Calendar sync currently unavailable. Contact IT.
      </div>
    </div>
  );
}

// Stats widget
function StatsWidget() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#336699' }}>--</div>
        <div style={{ fontSize: '9px', color: '#666' }}>Total Contacts</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#336699' }}>$--</div>
        <div style={{ fontSize: '9px', color: '#666' }}>Pipeline Value</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#cc0000' }}>847</div>
        <div style={{ fontSize: '9px', color: '#666' }}>Overdue Tasks</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#008000' }}>0%</div>
        <div style={{ fontSize: '9px', color: '#666' }}>Goal Progress</div>
      </div>
    </div>
  );
}

// List widget
function ListWidget() {
  const items = [
    { text: 'Update customer records', status: 'overdue', days: 847 },
    { text: 'Send follow-up emails', status: 'overdue', days: 234 },
    { text: 'Complete training module', status: 'overdue', days: 156 },
    { text: 'Submit expense report', status: 'pending', days: 45 },
    { text: 'Review dashboard metrics', status: 'pending', days: 12 },
  ];

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{
          padding: '6px',
          marginBottom: '4px',
          background: item.status === 'overdue' ? '#ffeeee' : '#f5f5f5',
          borderLeft: `3px solid ${item.status === 'overdue' ? '#cc0000' : '#336699'}`,
          fontSize: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>{item.text}</span>
          <span style={{ color: item.status === 'overdue' ? '#cc0000' : '#666' }}>
            {item.days} days
          </span>
        </div>
      ))}
    </div>
  );
}

// Graph widget with 50 shades of blue
function GraphWidget() {
  const bars = Array(12).fill(0).map(() => 20 + Math.random() * 60);

  return (
    <div className="report-graph" style={{ height: '100px', padding: '10px' }}>
      {bars.map((height, i) => (
        <div
          key={i}
          className="graph-bar"
          style={{
            height: `${height}%`,
            background: `hsl(210, ${50 + i * 2}%, ${40 + i * 3}%)`
          }}
        />
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [showAddContact, setShowAddContact] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);

  const handleAddContact = () => {
    setShowAddContact(true);
  };

  const handleRequestAccess = () => {
    setPermissionRequested(true);
    setTimeout(() => {
      alert('Your request has been sent to 47 approvers.\n\nAverage response time: 12 days.\n\nYou will receive an email when your request is processed.\n\n(Check your spam folder)');
      setShowAddContact(false);
      setPermissionRequested(false);
    }, 2000);
  };

  // Generate widget list with types
  const widgets = widgetNames.slice(0, 47).map((name, i) => {
    let type = 'normal';
    if (i === 0) type = 'pie';
    if (i === 3) type = 'calendar';
    if (i === 5 || i === 12) type = 'stats';
    if (i === 8 || i === 15) type = 'list';
    if (i === 10 || i === 20) type = 'graph';
    return { name, type };
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-message">
          Hello, <span className="user-name">{user?.firstName || 'User'} {user?.lastName || '[NULL]'}</span>!
          <span style={{ fontSize: '10px', color: '#666', marginLeft: '10px' }}>
            Last login: {user?.lastLogin || 'Unknown'}
          </span>
        </div>

        <div className="quick-actions">
          <button className="btn btn-primary" onClick={handleAddContact}>
            + Add New Contact
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/search')}>
            🔍 Quick Search
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => alert('Quick Report feature requires Premium license.\n\nContact sales@legacycrm.com for upgrade options.')}
          >
            📊 Quick Report
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => alert('Email integration temporarily disabled.\n\nReason: Security review pending since Q2 2015.')}
            style={{ opacity: 0.5 }}
          >
            ✉️ Send Email
          </button>
        </div>
      </div>

      {/* Widget grid */}
      <div className="widget-grid">
        {widgets.map((widget, i) => (
          <Widget key={i} name={widget.name} type={widget.type} />
        ))}
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              ⚠️ Permission Required
              <button className="modal-close" onClick={() => setShowAddContact(false)}>×</button>
            </div>
            <div className="modal-body">
              {permissionRequested ? (
                <div style={{ textAlign: 'center' }}>
                  <div className="loading-spinner" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
                  <p style={{ marginTop: '15px' }}>Submitting access request...</p>
                </div>
              ) : (
                <>
                  <p style={{ marginTop: 0 }}>
                    <strong>You don't have permission to add contacts.</strong>
                  </p>
                  <p style={{ fontSize: '11px', color: '#666' }}>
                    Your current role ({user?.role || 'Standard User'}) does not include contact creation privileges.
                  </p>
                  <p style={{ fontSize: '11px', color: '#666' }}>
                    Would you like to request access? Your request will be sent to the following approvers:
                  </p>
                  <ul style={{ fontSize: '10px', color: '#666', maxHeight: '150px', overflowY: 'auto' }}>
                    <li>Your Direct Manager</li>
                    <li>Department Head</li>
                    <li>IT Security Team</li>
                    <li>Compliance Officer</li>
                    <li>HR Representative</li>
                    <li>Data Privacy Officer</li>
                    <li>Regional Director</li>
                    <li>... and 40 others</li>
                  </ul>
                </>
              )}
            </div>
            {!permissionRequested && (
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddContact(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleRequestAccess}>
                  Request Access
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
