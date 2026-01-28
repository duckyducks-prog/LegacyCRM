// Utility functions for maximum enterprise dysfunction

// Fake delay that occasionally goes backwards
export const fakeDelay = (baseMs = 3000) => {
  return new Promise((resolve) => {
    const actualDelay = baseMs + Math.random() * 2000;
    setTimeout(resolve, actualDelay);
  });
};

// Progress bar that sometimes goes backwards
export const calculateProgress = (elapsed, total) => {
  const base = (elapsed / total) * 100;
  // Occasionally go backwards
  if (Math.random() < 0.2 && base > 20) {
    return Math.max(0, base - Math.random() * 15);
  }
  return Math.min(99, base); // Never quite reach 100
};

// Generate random error codes
export const generateErrorCode = () => {
  const prefixes = ['7B', '4X', 'E3', 'NULL', 'SYS', 'DB', 'AUTH', 'CONN'];
  const suffixes = ['X4', 'ERROR', '000', 'FATAL', '??', 'undefined'];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}-${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
};

// Ridiculous error messages
export const errorMessages = [
  "Error {code}: An error has occurred. Error.",
  "Error {code}: Something went wrong. Or maybe it didn't. We're not sure.",
  "Error {code}: The operation completed with errors. Or warnings. Or success. Check your email.",
  "Error {code}: Contact your system administrator. Good luck finding them.",
  "Error {code}: This should never happen. And yet, here we are.",
  "Error {code}: Please try again later. (Later is undefined.)",
  "Error {code}: The system is experiencing technical difficulties. As usual.",
  "Error {code}: Your session may have expired. Or not. It's complicated.",
  "Error {code}: An unexpected error occurred. We expected a different error.",
  "Error {code}: Operation failed successfully.",
];

export const getRandomError = () => {
  const code = generateErrorCode();
  const message = errorMessages[Math.floor(Math.random() * errorMessages.length)];
  return message.replace('{code}', code);
};

// Confirmation dialogs that spawn more dialogs
export const confirmationMessages = [
  "Are you sure you want to continue?",
  "Are you really sure?",
  "This action cannot be undone. Are you absolutely certain?",
  "Final confirmation: Do you really, truly want to proceed?",
  "By clicking OK, you agree to our 847-page Terms of Service. Continue?",
  "Warning: This may affect other records. Maybe. Proceed?",
];

// Loading messages that change
export const loadingMessages = [
  "Loading...",
  "Still loading...",
  "Almost there...",
  "Just a moment...",
  "Contacting server...",
  "Establishing connection...",
  "Fetching data...",
  "Processing request...",
  "Please wait...",
  "Any second now...",
  "Optimizing experience...",
  "Syncing databases...",
  "Validating session...",
  "Checking permissions...",
  "Consulting legacy systems...",
  "Warming up the hamster...",
  "Reticulating splines...",
];

// Random loading message
export const getLoadingMessage = () => {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
};

// Generate a fake timestamp from decades ago
export const getAncientTimestamp = () => {
  const year = 1970 + Math.floor(Math.random() * 30);
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${month}/${day}/${year}`;
};

// Generate ridiculous user names
export const systemUsers = [
  "SYSTEM_USER",
  "UNKNOWN_USER",
  "LEGACY_ADMIN",
  "NULL",
  "undefined",
  "admin@temp.local",
  "test_user_DO_NOT_DELETE",
  "jsmith_old_2",
  "MIGRATION_BOT",
  "[DELETED]",
  "user.user.user",
  "READONLY_SYSTEM",
  "Jim's Account (Old)",
  "DO_NOT_USE_THIS_ACCOUNT",
];

export const getRandomSystemUser = () => {
  return systemUsers[Math.floor(Math.random() * systemUsers.length)];
};

// Generate fake field labels
export const fieldLabels = [
  "Info 1",
  "Info 2",
  "Info 3 (Deprecated)",
  "Legacy Data",
  "DO NOT USE",
  "Jim's Fields",
  "Misc",
  "Other",
  "Old System Data",
  "Migration Fields",
  "Custom 1",
  "Custom 2",
  "Custom 99",
  "TEMP_DO_NOT_EDIT",
  "Ask IT About This",
  "Unknown Purpose",
  "[DOCUMENTATION PENDING]",
];

// Phone format validation that's impossible to satisfy
export const phoneFormatError = (value) => {
  if (!value) return "Phone number is required";
  if (value.includes('(')) return "Phone number cannot contain parentheses";
  if (value.includes('-')) return "Phone number cannot contain hyphens";
  if (value.includes(' ')) return "Phone number cannot contain spaces";
  if (value.includes('+')) return "Phone number cannot start with +";
  if (!value.includes('(')) return "Invalid format. Use: +1 (XXX) XXX-XXXX";
  return "Invalid phone format. Contact IT for approved formats.";
};

// Names for widgets
export const widgetNames = [
  "Sales Pipeline Overview",
  "Customer Engagement Metrics",
  "Q3 Performance Dashboard",
  "Legacy Reports Widget",
  "System Health Monitor",
  "Task Queue Status",
  "Email Integration Status",
  "Calendar Sync Widget",
  "Document Repository",
  "Approval Workflow Status",
  "Budget Tracker (Read Only)",
  "Team Performance KPIs",
  "Customer Satisfaction Index",
  "Lead Conversion Funnel",
  "Activity Timeline",
  "Project Milestone Tracker",
  "Resource Allocation View",
  "Compliance Status Widget",
  "Data Quality Score",
  "Integration Health Check",
  "Notification Center",
  "Quick Links",
  "Recent Activities",
  "My Pending Tasks",
  "Team Announcements",
  "Company News Feed",
  "Training Progress",
  "Support Ticket Summary",
  "Inventory Levels",
  "Revenue Forecast",
  "Market Analysis",
  "Competitor Watch",
  "Social Media Feed",
  "Weather Widget",
  "Stock Ticker (Why?)",
  "Coffee Machine Status",
  "Parking Lot Availability",
  "Birthday Calendar",
  "Motivational Quote",
  "Random Stat Generator",
  "Legacy Widget (Do Not Remove)",
  "Test Widget (Jim's)",
  "DEPRECATED_WIDGET_OLD",
  "New Widget (Beta) (Alpha) (Deprecated)",
  "Widget Loading Error",
  "Untitled Widget",
  "[null]",
];

// Countries list (partial, unsorted, with duplicates and errors)
export const countriesList = [
  "Select Country...",
  "USA",
  "United States",
  "United States of America",
  "U.S.A.",
  "America",
  "UK",
  "United Kingdom",
  "Great Britain",
  "England",
  "Canada",
  "Canadia", // typo
  "Mexico",
  "France",
  "Germany",
  "Deutschland",
  "Spain",
  "Italia",
  "Italy",
  "Japan",
  "China",
  "People's Republic of China",
  "Taiwan (Province of China)",
  "Taiwan",
  "Australia",
  "New Zealand",
  "Brazil",
  "Brasil",
  "India",
  "Russia",
  "Russian Federation",
  "USSR", // outdated
  "Yugoslavia", // outdated
  "Czechoslovakia", // outdated
  "Other",
  "Not Listed",
  "Prefer Not to Say",
  "N/A",
  "NULL",
  "[Ask Administrator]",
  "TBD",
  // ... imagine 3000 more entries
];

// Job titles with 3000 options
export const generateJobTitles = () => {
  const prefixes = ['Senior', 'Junior', 'Lead', 'Principal', 'Associate', 'Executive', 'Chief', 'Vice', 'Assistant', 'Deputy', 'Acting', 'Interim', 'Global', 'Regional', 'Local'];
  const middles = ['Account', 'Sales', 'Marketing', 'Product', 'Project', 'Program', 'Business', 'Technical', 'Operations', 'Customer', 'Client', 'Partner', 'Strategy', 'Innovation', 'Digital'];
  const suffixes = ['Manager', 'Director', 'Executive', 'Specialist', 'Analyst', 'Coordinator', 'Administrator', 'Representative', 'Consultant', 'Advisor', 'Officer', 'Lead', 'Engineer', 'Architect'];

  const titles = [];
  for (let p of prefixes) {
    for (let m of middles) {
      for (let s of suffixes) {
        titles.push(`${p} ${m} ${s}`);
        titles.push(`${m} ${s}`);
        titles.push(`${p} ${s}`);
      }
    }
  }
  return titles;
};

// Industry codes (incomprehensible)
export const industryCodes = [
  "SIC-0100-AG",
  "SIC-0200-MN",
  "NAICS-11-2024",
  "LEGACY-IND-001",
  "CUSTOM-MFG-A",
  "UNDEFINED",
  "OTHER-SEE-NOTES",
  "ASK-COMPLIANCE",
  // ... 3000 more
];

// Version history for "What's New"
export const versionHistory = [
  {
    version: "2.3.0",
    date: "March 15, 2016",
    features: [
      "Added new dashboard widgets",
      "Improved search functionality",
      "Fixed 847 bugs (introduced 912 new ones)",
      "Updated color scheme (reverted next day)",
      "Added dark mode (broken)",
      "Performance improvements (slower now)",
    ]
  },
  {
    version: "2.2.9",
    date: "January 2, 2015",
    features: [
      "Y2K bug fix (just in case)",
      "Added support for Windows Vista",
      "Removed support for Internet Explorer (just kidding, it's required)",
    ]
  }
];
