import { useState, useEffect } from 'react';
import { useApp } from '../App';
import { fakeDelay, getLoadingMessage, calculateProgress } from '../utils/dysfunction';

// Generate impossible CAPTCHA text
const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const confusingPairs = ['O0', 'Il1', 'S5', 'Z2', 'B8'];
  let captcha = '';

  // Mix in confusing characters
  for (let i = 0; i < 7; i++) {
    if (Math.random() < 0.4 && confusingPairs.length > 0) {
      const pair = confusingPairs[Math.floor(Math.random() * confusingPairs.length)];
      captcha += pair[Math.floor(Math.random() * pair.length)];
    } else {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  return captcha;
};

export default function Login() {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // Default checked but doesn't work
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [captchaAttempts, setCaptchaAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [loginError, setLoginError] = useState('');

  // Loading message cycle
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessage(getLoadingMessage());
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Progress bar (that goes backwards sometimes)
  useEffect(() => {
    if (isLoading) {
      const startTime = Date.now();
      const totalTime = 8000 + Math.random() * 4000; // 8-12 seconds

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setCaptchaError('');

    // Validate CAPTCHA (almost always wrong... unless they've suffered enough)
    const mercyThreshold = 5;
    const hasMercy = captchaAttempts >= mercyThreshold;

    if (!hasMercy && captchaInput !== captcha) {
      setCaptchaAttempts(prev => prev + 1);

      const errors = [
        "CAPTCHA verification failed. Please try again.",
        "Incorrect CAPTCHA. The characters are case-sensitive.",
        "CAPTCHA mismatch. Note: 0 and O are different characters.",
        "Verification failed. Hint: Some characters may be rotated.",
        "CAPTCHA error. If you're having trouble, contact IT (ext. 4072).",
        // After 5 attempts, they'll get mercy on the next try
      ];

      setCaptchaError(errors[Math.min(captchaAttempts, errors.length - 1)]);
      setCaptcha(generateCaptcha()); // Generate new impossible captcha
      setCaptchaInput('');
      return;
    }

    // If mercy mode, accept anything but show a condescending message
    if (hasMercy && captchaInput !== captcha) {
      setCaptchaError("Close enough. (System override: too many failed attempts.)");
    }

    // Start the painfully slow login process
    setIsLoading(true);
    setLoadingMessage('Contacting server...');
    setProgress(0);
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
    setCaptchaError('');
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
        {progress > 30 && progress < 50 && (
          <div style={{ marginTop: '15px', fontSize: '10px', color: '#999' }}>
            Validating license...
          </div>
        )}
        {progress > 60 && progress < 80 && (
          <div style={{ marginTop: '15px', fontSize: '10px', color: '#999' }}>
            Loading 847 mandatory plugins...
          </div>
        )}
        {progress > 90 && (
          <div style={{ marginTop: '15px', fontSize: '10px', color: '#666' }}>
            Almost there! Preparing personalized experience...
          </div>
        )}
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

            <div className="captcha-container">
              <div className="captcha-header">
                🔒 Security Verification (Required)
              </div>
              <div className="captcha-image">
                {captcha.split('').map((char, i) => (
                  <span
                    key={i}
                    style={{
                      '--rotation': `${(Math.random() - 0.5) * 30}deg`,
                      '--offset': `${(Math.random() - 0.5) * 8}px`,
                      color: `hsl(${Math.random() * 60 + 200}, 30%, ${Math.random() * 30 + 30}%)`,
                      textDecoration: Math.random() > 0.7 ? 'line-through' : 'none',
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter the characters above"
                style={{ marginBottom: '8px' }}
              />
              {captchaError && (
                <div style={{ color: '#cc0000', fontSize: '10px', marginBottom: '8px' }}>
                  {captchaError}
                </div>
              )}
              <div className="captcha-refresh" onClick={refreshCaptcha}>
                🔄 Can't read this? Get a new image (equally difficult)
              </div>
              {captchaAttempts >= 3 && captchaAttempts < 5 && (
                <div style={{ fontSize: '9px', color: '#666', marginTop: '5px', fontStyle: 'italic' }}>
                  Pro tip: The CAPTCHA is case-sensitive and may contain ambiguous characters.
                  Contact IT if you need accessibility accommodations (form IT-847-ACC required).
                </div>
              )}
              {captchaAttempts >= 5 && (
                <div style={{ fontSize: '9px', color: '#008000', marginTop: '5px', fontStyle: 'italic' }}>
                  ✅ Security override engaged. Any input will be accepted.
                  (Too many failed attempts triggers legacy bypass protocol.)
                </div>
              )}
            </div>

            {loginError && (
              <div className="security-notice" style={{ background: '#ffcccc', borderColor: '#cc0000' }}>
                {loginError}
              </div>
            )}

            <button type="submit" className="login-button">
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
