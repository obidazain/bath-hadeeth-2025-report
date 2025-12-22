import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root');

if (root) {
  try {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    root.innerHTML = '<div style="padding: 20px; direction: rtl;">خطأ في التحميل. يرجى تحديث الصفحة.</div>';
    console.error('React render error:', error);
  }
} else {
  document.body.innerHTML = '<div style="padding: 20px; direction: rtl;">لم يتم العثور على عنصر root</div>';
}
