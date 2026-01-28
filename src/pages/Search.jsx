import { useState } from 'react';
import { getRandomError, getLoadingMessage } from '../utils/dysfunction';

// Fake search results
const fakeContacts = [
  { id: 1, name: 'John Smith', email: 'jsmith@company.com', phone: '555-0100', company: 'Acme Corp', status: 'Active' },
  { id: 2, name: 'Jane Doe', email: 'jdoe@example.org', phone: '555-0101', company: 'Widgets Inc', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob.j@test.net', phone: '555-0102', company: 'Tech Solutions', status: 'Pending' },
  { id: 4, name: 'Alice Williams', email: 'alice@demo.co', phone: '555-0103', company: 'Data Systems', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@peanuts.com', phone: '555-0104', company: 'Entertainment LLC', status: 'Active' },
  { id: 6, name: 'Diana Prince', email: 'diana@amazon.ws', phone: '555-0105', company: 'Wonder Enterprises', status: 'Active' },
  { id: 7, name: 'Edward Norton', email: 'ed@movies.film', phone: '555-0106', company: 'Film Productions', status: 'Inactive' },
  { id: 8, name: 'Frank Castle', email: 'frank@security.mil', phone: '555-0107', company: 'Defense Corp', status: 'Classified' },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [searchError, setSearchError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Advanced search fields
  const [advancedFields, setAdvancedFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    booleanOperator: 'AND',
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchError(null);
    setLoadingMessage('Searching...');

    // Change loading message periodically
    const msgInterval = setInterval(() => {
      setLoadingMessage(getLoadingMessage());
    }, 1500);

    // Fake delay
    await new Promise(r => setTimeout(r, 2000 + Math.random() * 3000));

    clearInterval(msgInterval);

    // Chance of error
    if (Math.random() < 0.15) {
      setSearchError(getRandomError());
      setIsSearching(false);
      setHasSearched(true);
      return;
    }

    // "Search" - only exact matches work, results are random
    let results = [];

    if (searchQuery) {
      // Check for exact match (the only thing that works)
      const exactMatch = fakeContacts.find(c =>
        c.name.toLowerCase() === searchQuery.toLowerCase() ||
        c.email.toLowerCase() === searchQuery.toLowerCase()
      );

      if (exactMatch) {
        results = [exactMatch];
      } else {
        // Return random results if not exact match
        const shuffled = [...fakeContacts].sort(() => Math.random() - 0.5);
        results = shuffled.slice(0, Math.floor(Math.random() * 5) + 1);
      }
    } else {
      // No query = all results (random order because "relevance")
      results = [...fakeContacts].sort(() => Math.random() - 0.5);
    }

    // Apply "sorting" (it's actually random)
    if (sortBy === 'relevance') {
      results = results.sort(() => Math.random() - 0.5);
    } else if (sortBy === 'name') {
      // Sort backwards
      results = results.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'date') {
      // Random again
      results = results.sort(() => Math.random() - 0.5);
    }

    setSearchResults(results);
    setIsSearching(false);
    setHasSearched(true);
  };

  const handleExport = () => {
    // "Export" to proprietary format
    const confirmation = window.confirm(
      'Export search results?\n\n' +
      'Available formats:\n' +
      '• .lcrmx (LegacyCRM Proprietary Format)\n\n' +
      'Note: CSV and Excel export requires Premium license.'
    );

    if (confirmation) {
      setTimeout(() => {
        alert(
          'Export initiated!\n\n' +
          'Your file will be available in:\n' +
          '\\\\fileserver\\exports\\user\\pending\\queue\\2016\\03\\temp\\\n\n' +
          'Estimated processing time: 4-6 hours\n\n' +
          'You will receive an email when ready (check spam folder).'
        );
      }, 2000);
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h2>🔍 Contact Search</h2>
        <p>Search for contacts in the database. Note: Only exact matches are supported.</p>
      </div>

      <form onSubmit={handleSearch}>
        <div className="search-box">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter exact name or email address..."
          />
          <button type="submit" className="btn btn-primary" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced
          </button>
        </div>
      </form>

      {/* Search info */}
      <div className="search-info">
        <strong>Search Tips:</strong>
        <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
          <li>Searches are exact match only (partial matching coming in v2.4)</li>
          <li>Boolean operators: "AND" means OR, "OR" means AND (known issue since 2012)</li>
          <li>Wildcards (*) are not supported</li>
          <li>Results sorted by "relevance" (algorithm proprietary)</li>
        </ul>
      </div>

      {/* Advanced Search */}
      {showAdvanced && (
        <div className="advanced-search">
          <div className="advanced-search-header">
            ⚠️ Advanced Search (Beta)
            <span style={{ fontWeight: 'normal', fontSize: '10px', marginLeft: '10px' }}>
              Note: Advanced search is actually less functional than basic search
            </span>
          </div>
          <div className="advanced-search-body">
            <div className="field-row">
              <div className="field">
                <label>First Name</label>
                <input
                  type="text"
                  value={advancedFields.firstName}
                  onChange={(e) => setAdvancedFields(prev => ({ ...prev, firstName: e.target.value }))}
                  disabled
                  placeholder="(Feature disabled)"
                />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input
                  type="text"
                  value={advancedFields.lastName}
                  onChange={(e) => setAdvancedFields(prev => ({ ...prev, lastName: e.target.value }))}
                  disabled
                  placeholder="(Feature disabled)"
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  type="text"
                  value={advancedFields.email}
                  onChange={(e) => setAdvancedFields(prev => ({ ...prev, email: e.target.value }))}
                  disabled
                  placeholder="(Use basic search)"
                />
              </div>
              <div className="field">
                <label>Company</label>
                <input
                  type="text"
                  value={advancedFields.company}
                  onChange={(e) => setAdvancedFields(prev => ({ ...prev, company: e.target.value }))}
                  disabled
                  placeholder="(Coming soon)"
                />
              </div>
            </div>

            <div className="field-row" style={{ marginTop: '15px' }}>
              <div className="field">
                <label>Boolean Operator</label>
                <select
                  value={advancedFields.booleanOperator}
                  onChange={(e) => setAdvancedFields(prev => ({ ...prev, booleanOperator: e.target.value }))}
                >
                  <option value="AND">AND (works like OR)</option>
                  <option value="OR">OR (works like AND)</option>
                  <option value="NOT">NOT (works like AND)</option>
                  <option value="XOR">XOR (undefined behavior)</option>
                </select>
                <div className="field-hint">
                  Known issue: Boolean logic is inverted. Fix scheduled for v3.0.
                </div>
              </div>

              <div className="field">
                <label>Date Range From</label>
                <input
                  type="date"
                  value={advancedFields.dateFrom}
                  onChange={(e) => setAdvancedFields(prev => ({ ...prev, dateFrom: e.target.value }))}
                  max={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                />
                <div className="field-hint">
                  Note: Date picker limited to 30 days ago
                </div>
              </div>
            </div>

            <div style={{ marginTop: '15px', padding: '10px', background: '#fff3cd', border: '1px solid #ffc107', fontSize: '10px' }}>
              ⚠️ Advanced Search is in beta. Results may not be accurate. For reliable results, please use basic search or contact IT for a custom database query (allow 2-3 weeks).
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isSearching && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
          <div style={{ marginTop: '15px', color: '#666' }}>{loadingMessage}</div>
        </div>
      )}

      {/* Error state */}
      {searchError && (
        <div style={{ padding: '20px', background: '#ffeeee', border: '1px solid #cc0000', marginTop: '20px' }}>
          <strong style={{ color: '#cc0000' }}>Search Error</strong>
          <p style={{ margin: '10px 0 0 0', fontSize: '11px' }}>{searchError}</p>
          <button className="btn btn-secondary" style={{ marginTop: '10px' }} onClick={() => setSearchError(null)}>
            Try Again
          </button>
        </div>
      )}

      {/* Results */}
      {hasSearched && !isSearching && !searchError && (
        <div className="search-results" style={{ marginTop: '20px' }}>
          <div className="search-results-header">
            <span>
              Results: {searchResults.length} found
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label style={{ fontSize: '10px' }}>
                Sort by:
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ marginLeft: '5px' }}
                >
                  <option value="relevance">Relevance (random)</option>
                  <option value="name">Name (Z-A)</option>
                  <option value="date">Date (random)</option>
                </select>
              </label>
              <button className="btn btn-secondary" onClick={handleExport} style={{ fontSize: '10px', padding: '4px 8px' }}>
                📤 Export
              </button>
            </div>
          </div>

          {searchResults.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
              No results found.
              <div style={{ fontSize: '10px', marginTop: '10px' }}>
                Try searching for an exact name or email address.
                <br />
                Partial matching is not supported.
              </div>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="wide-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>
                      <input type="checkbox" disabled title="Bulk actions require Premium license" />
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Modified</th>
                    <th>Owner</th>
                    <th>Region</th>
                    <th>Score</th>
                    <th>Tags</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result) => (
                    <tr key={result.id}>
                      <td>
                        <input type="checkbox" disabled />
                      </td>
                      <td>CRM-{result.id.toString().padStart(6, '0')}</td>
                      <td>{result.name}</td>
                      <td>{result.email}</td>
                      <td>{result.phone}</td>
                      <td>{result.company}</td>
                      <td>
                        <span style={{
                          padding: '2px 6px',
                          background: result.status === 'Active' ? '#d4edda' : result.status === 'Inactive' ? '#f8d7da' : '#fff3cd',
                          fontSize: '9px',
                        }}>
                          {result.status}
                        </span>
                      </td>
                      <td>03/15/2016</td>
                      <td>47 years ago</td>
                      <td>SYSTEM_USER</td>
                      <td>Unknown</td>
                      <td>--</td>
                      <td>None</td>
                      <td>
                        <button
                          className="button-link"
                          onClick={() => alert('View functionality requires navigation approval.\n\nSubmit form IT-NAV-847 to request access.')}
                        >
                          View
                        </button>
                        {' | '}
                        <button
                          className="button-link"
                          onClick={() => alert('Edit functionality is locked.\n\nReason: Record owned by SYSTEM_USER')}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {searchResults.length > 0 && (
            <div style={{ padding: '10px', background: '#f5f5f5', fontSize: '10px', color: '#666' }}>
              Showing {searchResults.length} of {searchResults.length} results |
              Page 1 of 1 |
              <span style={{ marginLeft: '10px' }}>
                Export options: .lcrmx (CSV requires Premium license)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
