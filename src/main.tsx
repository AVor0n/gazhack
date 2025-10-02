import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { handleUrlParam } from '@/shared/libs';

handleUrlParam('reset', () => {
    localStorage.clear();
});


const root = document.getElementById('root')!

createRoot(root).render(<App />)
