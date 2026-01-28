import { useState } from 'react';
import { getRandomError, getLoadingMessage } from '../utils/dysfunction';

// Generate 400 field options with no descriptions
const generateReportFields = () => {
  const prefixes = ['Contact', 'Account', 'Lead', 'Opportunity', 'Campaign', 'Activity', 'Task', 'Event', 'Case', 'Product'];
  const attributes = ['ID', 'Name', 'Type', 'Status', 'Stage', 'Amount', 'Date', 'Owner', 'Created', 'Modified', 'Score', 'Rating', 'Priority', 'Source', 'Region', 'Segment', 'Category', 'Tag', 'Note', 'Description'];
  const suffixes = ['', ' (Legacy)', ' (v2)', ' (Old)', ' (New)', ' (Deprecated)', ' (Custom)', ' (System)', ' (Calc)', ' (Derived)'];

  const fields = [];
  prefixes.forEach(prefix => {
    attributes.forEach(attr => {
      suffixes.forEach(suffix => {
        fields.push(`${prefix}.${attr}${suffix}`);
      });
    });
  });

  return fields.slice(0, 400);
};

export default function Reports() {
  const [selectedFields, setSelectedFields] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [reportError, setReportError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const reportFields = generateReportFields();

  const handleFieldToggle = (field) => {
    setSelectedFields(prev => {
      if (prev.includes(field)) {
        return prev.filter(f => f !== field);
      }
      return [...prev, field];
    });
  };

  const handleGenerateReport = async () => {
    if (selectedFields.length === 0) {
      alert('Please select at least one field.\n\n(Good luck figuring out which ones you need.)');
      return;
    }

    setIsGenerating(true);
    setReportError(null);
    setLoadingMessage('Initializing report engine...');

    // Show different messages
    const messages = [
      'Connecting to database...',
      'Querying records...',
      'Processing data...',
      'Applying filters...',
      'Calculating metrics...',
      'Optimizing results...',
      'Preparing output...',
      'Almost there...',
      'Still working...',
      'Any moment now...',
    ];

    let msgIndex = 0;
    const msgInterval = setInterval(() => {
      setLoadingMessage(messages[msgIndex % messages.length]);
      msgIndex++;
    }, 3000);

    // Long delay
    await new Promise(r => setTimeout(r, 5000 + Math.random() * 5000));

    clearInterval(msgInterval);

    // High chance of "success" message that isn't really success
    if (Math.random() < 0.3) {
      setReportError(getRandomError());
    } else {
      alert(
        'Report generation initiated!\n\n' +
        'This may take up to 4 hours.\n\n' +
        'You will receive an email when the report is ready.\n\n' +
        '(Check your spam folder. If not received within 48 hours, contact IT.)'
      );
    }

    setIsGenerating(false);
  };

  const handlePreview = () => {
    if (selectedFields.length === 0) {
      alert('Please select fields to preview.');
      return;
    }
    setShowPreview(true);
  };

  // Generate preview data (first 3 rows only)
  const previewData = [
    selectedFields.reduce((acc, field) => ({ ...acc, [field]: '--' }), {}),
    selectedFields.reduce((acc, field) => ({ ...acc, [field]: 'NULL' }), {}),
    selectedFields.reduce((acc, field) => ({ ...acc, [field]: '[N/A]' }), {}),
  ];

  // Generate graph colors (50 shades of blue)
  const graphBars = Array(12).fill(0).map((_, i) => ({
    height: 30 + Math.random() * 50,
    color: `hsl(210, ${50 + i}%, ${40 + i * 2}%)`
  }));

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h2>📈 Report Builder</h2>
        <p style={{ fontSize: '11px', color: '#666', margin: '5px 0 0 0' }}>
          Build custom reports by selecting fields below. Note: No field descriptions are available.
        </p>
      </div>

      <div className="reports-body">
        {/* Date picker with 30-day limit */}
        <div className="date-picker-container">
          <span className="date-picker-label">Date Range:</span>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              max={new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              min={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              max={new Date().toISOString().split('T')[0]}
              min={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            />
          </div>
          <div className="date-warning">
            ⚠️ Date picker is limited to the last 30 days. For historical data, submit form IT-ARCHIVE-REQ-847.
          </div>
        </div>

        <div className="report-builder">
          {/* Field Selector */}
          <div className="field-selector">
            <div className="field-selector-header">
              Available Fields ({reportFields.length})
              <div style={{ fontWeight: 'normal', fontSize: '9px', color: '#666' }}>
                Selected: {selectedFields.length}
              </div>
            </div>
            <div style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>
              <input
                type="text"
                placeholder="Search fields... (partial match not supported)"
                style={{ width: '100%', padding: '5px', fontSize: '10px' }}
                disabled
              />
              <div style={{ fontSize: '9px', color: '#999', marginTop: '3px' }}>
                Field search coming in v2.4
              </div>
            </div>
            <div className="field-list">
              {reportFields.map((field, i) => (
                <label key={i} className="field-option">
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(field)}
                    onChange={() => handleFieldToggle(field)}
                  />
                  <span
                    className="tooltip"
                    data-tooltip="[DOCUMENTATION PENDING]"
                    style={{
                      color: field.includes('Deprecated') ? '#cc0000' :
                             field.includes('Legacy') ? '#666' :
                             field.includes('Old') ? '#999' : 'inherit',
                      textDecoration: field.includes('Deprecated') ? 'line-through' : 'none'
                    }}
                  >
                    {field}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Report Preview */}
          <div className="report-preview">
            <div className="report-preview-header">
              Report Preview
              <span style={{ fontWeight: 'normal', fontSize: '10px', marginLeft: '10px' }}>
                (First 3 rows only)
              </span>
            </div>
            <div className="report-preview-body">
              {!showPreview ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
                  Select fields and click "Preview" to see sample data
                </div>
              ) : (
                <>
                  <div className="table-wrapper" style={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <table className="report-table" style={{ minWidth: Math.max(500, selectedFields.length * 100) }}>
                      <thead>
                        <tr>
                          {selectedFields.map((field, i) => (
                            <th key={i} style={{ minWidth: '100px' }}>{field}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, i) => (
                          <tr key={i}>
                            {selectedFields.map((field, j) => (
                              <td key={j}>{row[field]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ marginTop: '10px', fontSize: '10px', color: '#999' }}>
                    Showing 3 of ??? records (full count unavailable in preview)
                  </div>

                  {/* Graph preview - 50 shades of blue */}
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '11px', marginBottom: '10px' }}>
                      Visualization Preview
                    </div>
                    <div className="report-graph">
                      {graphBars.map((bar, i) => (
                        <div
                          key={i}
                          className="graph-bar"
                          style={{
                            height: `${bar.height}%`,
                            background: bar.color
                          }}
                        />
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '10px', flexWrap: 'wrap' }}>
                      {graphBars.slice(0, 12).map((bar, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '8px' }}>
                          <div style={{ width: '10px', height: '10px', background: bar.color }}></div>
                          <span>Series {i + 1}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '9px', color: '#999', marginTop: '5px' }}>
                      * Colors are 50 shades of blue for accessibility compliance (pending review)
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={() => setSelectedFields([])}>
            Clear Selection
          </button>
          <button className="btn btn-secondary" onClick={handlePreview}>
            Preview Report
          </button>
          <button
            className="btn btn-primary"
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
        </div>

        {/* Error display */}
        {reportError && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#ffeeee', border: '1px solid #cc0000' }}>
            <strong style={{ color: '#cc0000' }}>Report Generation Error</strong>
            <p style={{ margin: '10px 0 0 0', fontSize: '11px' }}>{reportError}</p>
          </div>
        )}

        {/* Saved Reports Section */}
        <div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '13px', marginBottom: '10px' }}>
            📁 Saved Reports
            <span className="beta-label" style={{ marginLeft: '10px' }}>BETA</span>
          </h3>
          <div style={{ background: '#f5f5f5', padding: '20px', textAlign: 'center', color: '#666', fontSize: '11px' }}>
            No saved reports found.
            <div style={{ marginTop: '10px', fontSize: '10px' }}>
              Saving reports requires Premium license or approval from IT.
            </div>
          </div>
        </div>

        {/* Scheduled Reports */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ fontSize: '13px', marginBottom: '10px' }}>
            ⏰ Scheduled Reports
            <span className="deprecated-label" style={{ marginLeft: '10px' }}>DEPRECATED</span>
          </h3>
          <div style={{ background: '#fff3cd', padding: '15px', fontSize: '11px' }}>
            ⚠️ Scheduled Reports feature has been deprecated as of Q2 2015.
            <br /><br />
            For automated reporting, please:
            <ol style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
              <li>Submit form IT-AUTO-REPORT-847</li>
              <li>Wait for IT approval (2-4 weeks)</li>
              <li>Schedule a meeting with the BI team</li>
              <li>Complete security training module 12B</li>
              <li>Resubmit form with manager signature</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Generating overlay */}
      {isGenerating && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">{loadingMessage}</div>
          <div style={{ marginTop: '15px', fontSize: '10px', color: '#666' }}>
            This may take several minutes. Please do not close this window.
          </div>
          <div style={{ marginTop: '10px', fontSize: '9px', color: '#999' }}>
            Tip: Report generation runs faster during off-peak hours (3am-5am PST)
          </div>
        </div>
      )}
    </div>
  );
}
