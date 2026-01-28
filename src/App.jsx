import { useState, createContext, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ContactRecord from './pages/ContactRecord'
import Search from './pages/Search'
import Reports from './pages/Reports'
import Layout from './components/Layout'

// Global app context for session state
export const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [sessionWarning, setSessionWarning] = useState(false);
  const [unreadNotifications] = useState(2847);
  const [darkMode, setDarkMode] = useState(false);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    // Show session timeout warning immediately after login
    setTimeout(() => setSessionWarning(true), 3000);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setSessionWarning(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      user,
      login,
      logout,
      sessionWarning,
      setSessionWarning,
      unreadNotifications,
      darkMode,
      toggleDarkMode
    }}>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contacts" element={<ContactRecord />} />
            <Route path="/contacts/:id" element={<ContactRecord />} />
            <Route path="/search" element={<Search />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
