import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/legacy.css'

// Set the iconic pixelated question mark favicon
const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
link.rel = 'icon';
link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">❓</text></svg>';
document.head.appendChild(link);

// Randomly change page title to "Not Responding"
setInterval(() => {
  if (Math.random() < 0.1) {
    const originalTitle = document.title;
    document.title = 'Not Responding';
    setTimeout(() => {
      document.title = originalTitle;
    }, 2000);
  }
}, 15000);

// Random notification ding (only when logged in)
setInterval(() => {
  if (Math.random() < 0.05 && window.location.pathname !== '/' && window.location.pathname !== '/login') {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRl9vT19teleABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleAwAj9teleNqBAB4q9r/m1gAAA==');
      audio.volume = 0.2;
      audio.play().catch(() => {});
    } catch (e) {}
  }
}, 30000);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
