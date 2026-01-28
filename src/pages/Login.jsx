import { useState, useEffect } from 'react';
import { useApp } from '../App';
import { getLoadingMessage, calculateProgress } from '../utils/dysfunction';

export default function Login() {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // Default checked but doesn't work
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [loginError, setLoginError] = useState('');

  // Loading message cycle
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessage(getLoadingMessage());
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Quick progress bar
  useEffect(() => {
    if (isLoading) {
      const startTime = Date.now();
      const totalTime = 1500; // Fast for dev — just 1.5 seconds

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = calculateProgress(elapsed, totalTime);
        setProgress(newProgress);

        if (elapsed >= totalTime) {
          clearInterval(interval);
          setProgress(100);
          // Actually log in — extract a display name from the email/username
          const enteredName = username || 'jsmith';
          const displayFirst = enteredName.includes('@')
            ? enteredName.split('@')[0].split('.')[0]
            : enteredName;
          const displayFirstCap = displayFirst.charAt(0).toUpperCase() + displayFirst.slice(1);

          login({
            firstName: displayFirstCap,
            lastName: null, // Always null for the [NULL] joke
            username: enteredName,
            email: enteredName.includes('@') ? enteredName : enteredName + '@company.local',
            department: 'Sales (Legacy)',
            role: 'Standard User (Restricted)',
            lastLogin: '47 years ago',
          });
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isLoading, login, username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    // Start login immediately — no CAPTCHA gate
    setIsLoading(true);
    setLoadingMessage('Contacting server...');
    setProgress(0);
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <div className="loading-text">{loadingMessage}</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text">{Math.floor(progress)}% complete</div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>LegacyCRM Pro™ Enterprise Suite</h1>
          <div className="version">Version 2.3.0 (Build 847-STABLE-FINAL-v2)</div>
        </div>

        <div className="login-body">
          <div className="login-logo">
            <div className="logo-text">LegacyCRM</div>
            <div className="logo-tagline">
              "Synergizing Your Customer Relationships Since 2003!"
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username / Employee ID / Email:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. demo@legacycrm.com"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onMouseEnter={() => setShowPassword(true)}
                  onMouseLeave={() => setShowPassword(false)}
                  placeholder="••••••••"
                  autoComplete="off"
                />
                <span className="password-reveal">
                  {showPassword ? '👁' : ''}
                </span>
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">
                Remember me for 15 minutes
                <span className="tooltip" data-tooltip="This feature is currently unavailable"> (?)</span>
              </label>
            </div>

            {loginError && (
              <div className="security-notice" style={{ background: '#ffcccc', borderColor: '#cc0000' }}>
                {loginError}
              </div>
            )}

            <button type="submit" className="login-button" style={{ marginTop: '15px' }}>
              Sign In to LegacyCRM
            </button>

            <div className="forgot-password">
              Forgot password? <a href="mailto:it-support@company.local?subject=Password%20Reset%20Request%20-%20LegacyCRM">Contact IT</a>
              <br />
              <span style={{ fontSize: '9px', color: '#999' }}>
                (ext. 4072, Mon-Thu 9am-11am PST only)
              </span>
            </div>

            <div className="security-notice">
              ⚠️ This system is for authorized use only. All activities are logged
              and monitored. By logging in, you agree to our{' '}
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service document is 847 pages. Please contact Legal department for a printed copy.'); }}>
                Terms of Service
              </a>{' '}
              (847 pages).
            </div>
          </form>
        </div>

        <div className="login-footer">
          © 2003-2016 LegacyCRM Technologies Inc. All Rights Reserved.
          <br />
          Best viewed in Internet Explorer 6.0 at 1024x768 resolution.
          <br />
          <span style={{ fontSize: '8px' }}>
            Patent Pending | HIPAA Compliant* | SOC 2 Type II Certified**
            <br />
            *Compliance pending audit | **Certification expired 2014
          </span>
        </div>
      </div>
    </div>
  );
}
