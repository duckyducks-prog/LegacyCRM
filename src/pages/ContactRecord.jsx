import { useState, useEffect } from 'react';
import {
  getRandomSystemUser,
  getAncientTimestamp,
  countriesList,
  generateJobTitles,
  phoneFormatError,
  fieldLabels,
  getRandomError
} from '../utils/dysfunction';

// Generate a ton of fake fields
const generateFields = () => {
  const fields = [];

  // Basic Info fields
  const basicFields = [
    { name: 'prefix', label: 'Prefix', type: 'select', options: ['', 'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Hon.', 'Rev.', 'Sir', 'Dame', 'Lord', 'Lady', 'Mx.', 'Other', 'Prefer Not to Say', '[Ask Contact]'] },
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'middleName', label: 'Middle Name(s)', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'suffix', label: 'Suffix', type: 'select', options: ['', 'Jr.', 'Sr.', 'III', 'IV', 'PhD', 'MD', 'Esq.', 'CPA'] },
    { name: 'nickname', label: 'Nickname / Preferred Name', type: 'text' },
    { name: 'formerName', label: 'Former Name(s)', type: 'text' },
    { name: 'email', label: 'Email (Primary)', type: 'email', required: Math.random() > 0.5 },
    { name: 'email2', label: 'Email (Secondary)', type: 'email' },
    { name: 'email3', label: 'Email (Work)', type: 'email' },
    { name: 'email4', label: 'Email (Personal)', type: 'email' },
    { name: 'emailOld', label: 'Email (Old - Do Not Use)', type: 'email', deprecated: true },
    { name: 'phone1', label: 'Phone (Main)', type: 'tel' },
    { name: 'phone2', label: 'Phone (Mobile)', type: 'tel' },
    { name: 'phone3', label: 'Phone (Work)', type: 'tel' },
    { name: 'phone4', label: 'Phone (Home)', type: 'tel' },
    { name: 'phone5', label: 'Phone (Fax)', type: 'tel' },
    { name: 'phoneOld', label: 'Phone (Legacy)', type: 'tel', deprecated: true },
  ];

  // Address fields (repeated for different types)
  const addressTypes = ['Mailing', 'Billing', 'Shipping', 'Home', 'Work', 'Other', 'Former'];
  addressTypes.forEach(type => {
    fields.push(
      { name: `${type.toLowerCase()}Address1`, label: `${type} Address Line 1`, type: 'text', tab: 'Address' },
      { name: `${type.toLowerCase()}Address2`, label: `${type} Address Line 2`, type: 'text', tab: 'Address' },
      { name: `${type.toLowerCase()}Address3`, label: `${type} Address Line 3`, type: 'text', tab: 'Address' },
      { name: `${type.toLowerCase()}City`, label: `${type} City`, type: 'text', tab: 'Address' },
      { name: `${type.toLowerCase()}State`, label: `${type} State/Province/Region`, type: 'text', tab: 'Address' },
      { name: `${type.toLowerCase()}Zip`, label: `${type} Postal Code`, type: 'text', tab: 'Address' },
      { name: `${type.toLowerCase()}Country`, label: `${type} Country`, type: 'select', options: countriesList, tab: 'Address' },
    );
  });

  // Company fields
  const companyFields = [
    { name: 'company', label: 'Company Name', type: 'text', tab: 'Company' },
    { name: 'companyLegal', label: 'Company (Legal Name)', type: 'text', tab: 'Company' },
    { name: 'companyDBA', label: 'Company (DBA)', type: 'text', tab: 'Company' },
    { name: 'companyFormer', label: 'Company (Former)', type: 'text', tab: 'Company' },
    { name: 'department', label: 'Department', type: 'text', tab: 'Company' },
    { name: 'division', label: 'Division', type: 'text', tab: 'Company' },
    { name: 'jobTitle', label: 'Job Title', type: 'select', options: generateJobTitles().slice(0, 3000), tab: 'Company' },
    { name: 'jobTitleOther', label: 'Job Title (If Other)', type: 'text', tab: 'Company' },
    { name: 'reportsTo', label: 'Reports To', type: 'text', tab: 'Company' },
    { name: 'employeeId', label: 'Employee ID', type: 'text', tab: 'Company' },
    { name: 'employeeIdOld', label: 'Employee ID (Legacy System)', type: 'text', tab: 'Company', deprecated: true },
  ];

  // Custom fields (the mysterious ones)
  const customFields = [];
  for (let i = 1; i <= 50; i++) {
    customFields.push({
      name: `custom${i}`,
      label: `Custom Field ${i}`,
      type: Math.random() > 0.5 ? 'text' : 'select',
      options: Math.random() > 0.5 ? ['Option 1', 'Option 2', 'Option 3', 'Other'] : undefined,
      tab: 'Custom Fields',
      hint: '[DOCUMENTATION PENDING]',
    });
  }

  // Legacy fields
  const legacyFields = [];
  for (let i = 1; i <= 30; i++) {
    legacyFields.push({
      name: `legacy${i}`,
      label: `Legacy Field ${i}`,
      type: 'text',
      tab: 'Legacy Data',
      deprecated: true,
      hint: 'Do not modify - used by legacy integrations',
    });
  }

  // Jim's fields
  const jimsFields = [
    { name: 'jimField1', label: 'Contact Type (Jim)', type: 'text', tab: "Jim's Fields" },
    { name: 'jimField2', label: 'Priority Score', type: 'text', tab: "Jim's Fields" },
    { name: 'jimField3', label: 'Special Flag', type: 'text', tab: "Jim's Fields" },
    { name: 'jimField4', label: 'Notes for Jim', type: 'text', tab: "Jim's Fields" },
    { name: 'jimField5', label: 'Ask Jim About This', type: 'text', tab: "Jim's Fields" },
  ];

  // DO NOT USE fields
  const doNotUseFields = [];
  for (let i = 1; i <= 15; i++) {
    doNotUseFields.push({
      name: `doNotUse${i}`,
      label: `[DO NOT USE] Field ${i}`,
      type: 'text',
      tab: 'DO NOT USE',
      deprecated: true,
      hint: 'CRITICAL: Do not modify under any circumstances',
    });
  }

  return [
    ...basicFields.map(f => ({ ...f, tab: f.tab || 'Info 1' })),
    ...companyFields,
    ...fields, // addresses
    ...customFields,
    ...legacyFields,
    ...jimsFields,
    ...doNotUseFields,
  ];
};

export default function ContactRecord() {
  const [activeTab, setActiveTab] = useState('Info 1');
  const [fields] = useState(generateFields);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);
  const [notes, setNotes] = useState('');
  const [locked, setLocked] = useState(true);
  const [showOverrideConfirm, setShowOverrideConfirm] = useState(false);
  const [relatedContacts] = useState([
    { name: 'John Smith', relationship: 'Unknown' },
    { name: 'Jane Doe', relationship: 'Unknown' },
    { name: 'Bob Johnson', relationship: 'Unknown' },
    { name: 'Alice Williams', relationship: 'Unknown' },
    { name: 'Charlie Brown', relationship: 'Unknown' },
    // ... imagine 10,000 more
    { name: '... and 10,847 more', relationship: '(scroll to load)' },
  ]);

  const tabs = [
    'Info 1', 'Info 2', 'Info 3 (Deprecated)', 'Address',
    'Company', 'Custom Fields', 'Legacy Data', "Jim's Fields",
    'DO NOT USE', 'Misc', 'Other', 'TEMP_DO_NOT_EDIT'
  ];

  const handleChange = (name, value) => {
    // Validate phone numbers with impossible rules
    if (name.startsWith('phone')) {
      const phoneError = phoneFormatError(value);
      setErrors(prev => ({ ...prev, [name]: phoneError }));
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveProgress(0);

    // Fake slow save with progress
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(r => setTimeout(r, Math.random() * 200 + 100));

      // Sometimes go backwards
      if (Math.random() < 0.1 && i > 20) {
        i -= Math.floor(Math.random() * 10);
      }

      setSaveProgress(Math.min(i, 99));
    }

    // After all that, fail or "succeed" but lose changes
    await new Promise(r => setTimeout(r, 500));
    setSaving(false);

    if (Math.random() < 0.5) {
      alert(getRandomError());
    } else {
      alert('Success! Your changes have been saved.\n\n(Just kidding, they were lost when the page refreshed.)');
      window.location.reload();
    }
  };

  const handleOverrideLock = () => {
    setShowOverrideConfirm(true);
  };

  const confirmOverride = () => {
    setShowOverrideConfirm(false);
    // Still locked, but now in "read-only" mode
    alert('Lock override successful!\n\nNote: Field is now in read-only mode for data integrity purposes.');
  };

  const tabFields = fields.filter(f => (f.tab || 'Info 1') === activeTab);

  return (
    <div className="contact-record">
      <div className="record-header">
        <div>
          <div className="record-title">Contact Record: John Smith</div>
          <div className="record-id">
            ID: 847-NULL-{Math.random().toString(36).substring(7).toUpperCase()}
          </div>
        </div>
        <div>
          {locked && (
            <span style={{ color: '#cc0000', fontSize: '11px', marginRight: '10px' }}>
              🔒 Record locked by {getRandomSystemUser()}
            </span>
          )}
          <button className="btn btn-secondary" onClick={handleOverrideLock}>
            Override Lock
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="record-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`record-tab ${activeTab === tab ? 'active' : ''} ${tab.includes('DO NOT USE') || tab.includes('Deprecated') || tab.includes('TEMP') ? 'deprecated' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === "Jim's Fields" && <span style={{ fontSize: '8px', marginLeft: '4px' }}>(Ask Jim)</span>}
          </button>
        ))}
      </div>

      {/* Form fields */}
      <div className="record-body">
        <div className="field-row">
          {tabFields.map((field, i) => (
            <div key={i} className="field">
              <label>
                {field.label}
                {field.required && <span className="required"> *</span>}
                {field.deprecated && <span className="deprecated-label" style={{ marginLeft: '5px' }}>DEPRECATED</span>}
              </label>

              {field.type === 'select' ? (
                <div className="mega-dropdown">
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    disabled={locked}
                  >
                    {(field.options || []).slice(0, 100).map((opt, j) => (
                      <option key={j} value={opt}>{opt}</option>
                    ))}
                    {(field.options || []).length > 100 && (
                      <option disabled>... {(field.options || []).length - 100} more options (scroll unavailable)</option>
                    )}
                  </select>
                  {(field.options || []).length > 50 && (
                    <div className="dropdown-warning">
                      ⚠️ {(field.options || []).length} options. Search unavailable.
                    </div>
                  )}
                </div>
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  readOnly={locked}
                />
              )}

              {field.hint && (
                <div className="field-hint">{field.hint}</div>
              )}
              {errors[field.name] && (
                <div className="field-error">{errors[field.name]}</div>
              )}
            </div>
          ))}
        </div>

        {/* Notes field */}
        <div className="field-group" style={{ marginTop: '20px' }}>
          <div className="field-group-title">Notes</div>
          <div className="notes-field">
            <textarea
              value={notes}
              onChange={(e) => {
                if (e.target.value.length <= 140) {
                  setNotes(e.target.value);
                }
              }}
              placeholder="Enter notes here (limited to 140 characters for legacy compatibility)"
              disabled={locked}
            />
            <div className="notes-counter">
              {notes.length}/140 characters
              {notes.length > 100 && <span style={{ color: '#cc0000' }}> (nearing limit!)</span>}
            </div>
          </div>
        </div>

        {/* Related contacts */}
        <div className="field-group" style={{ marginTop: '20px' }}>
          <div className="field-group-title">
            Related Contacts
            <span style={{ fontWeight: 'normal', color: '#666', marginLeft: '10px' }}>
              (Showing all contacts in database)
            </span>
          </div>
          <div className="related-contacts">
            {relatedContacts.map((contact, i) => (
              <div key={i} className="related-contact">
                <span>{contact.name}</span>
                <span style={{ color: '#999' }}>{contact.relationship}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="record-footer">
        <div className="last-modified">
          Last Modified: {getAncientTimestamp()} by {getRandomSystemUser()}
          <br />
          <span style={{ fontSize: '9px', color: '#999' }}>
            Record created: 1/1/1970 (migrated from legacy system)
          </span>
        </div>
        <div>
          <button className="btn btn-secondary" style={{ marginRight: '10px' }}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? `Saving... ${saveProgress}%` : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Override Lock Confirmation */}
      {showOverrideConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              ⚠️ Confirm Lock Override
            </div>
            <div className="modal-body">
              <p style={{ marginTop: 0 }}>
                <strong>Are you sure you want to override the lock?</strong>
              </p>
              <p style={{ fontSize: '11px', color: '#666' }}>
                This record is currently locked by {getRandomSystemUser()}.
              </p>
              <p style={{ fontSize: '11px', color: '#cc0000' }}>
                ⚠️ This action cannot be undone and will be logged.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowOverrideConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmOverride}>
                Yes, Override Lock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saving overlay */}
      {saving && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">Submitting changes...</div>
          <div className="progress-bar" style={{ marginTop: '15px' }}>
            <div className="progress-fill" style={{ width: `${saveProgress}%` }}></div>
          </div>
          <div className="progress-text">{saveProgress}%</div>
          <div style={{ marginTop: '10px', fontSize: '10px', color: '#666' }}>
            Please do not close this window or navigate away.
          </div>
        </div>
      )}
    </div>
  );
}
