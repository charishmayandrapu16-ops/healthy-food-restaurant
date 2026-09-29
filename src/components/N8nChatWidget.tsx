import React, { useEffect, useRef } from 'react';

const WEBHOOK_URL = 'https://charishma0563.app.n8n.cloud/webhook/9052539d-960e-4cb2-936c-3e8f54b2cffa/chat';

export const openN8nChat = () => {
  const toggleBtn = document.querySelector<HTMLButtonElement | HTMLElement>('.chat-window-toggle');
  if (toggleBtn) {
    toggleBtn.click();
  }
};

export const N8nChatWidget: React.FC = () => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // 1. Inject n8n Chat CSS if not already injected
    const cssId = 'n8n-chat-style';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
      document.head.appendChild(link);
    }

    // 2. Inject custom theme styling variables matching Verde aesthetic
    const customThemeId = 'n8n-chat-theme-override';
    if (!document.getElementById(customThemeId)) {
      const style = document.createElement('style');
      style.id = customThemeId;
      style.innerHTML = `
        :root {
          --chat--color-primary: #064e3b;
          --chat--color-primary-shade-50: #065f46;
          --chat--color-secondary: #047857;
          --chat--toggle--background: #064e3b;
          --chat--toggle--hover--background: #065f46;
          --chat--toggle--color: #ffffff;
          --chat--toggle--width: 56px;
          --chat--toggle--height: 56px;
          --chat--header--background: #064e3b;
          --chat--header--color: #ffffff;
          --chat--header--padding: 1.25rem;
          --chat--message--user--background: #064e3b;
          --chat--message--user--color: #ffffff;
          --chat--message--bot--background: #F5F5F0;
          --chat--message--bot--color: #1C1917;
          --chat--message--border-radius: 1rem;
          --chat--window--border-radius: 1.25rem;
          --chat--window--border: 1px solid #E7E5E4;
          --chat--window--bottom: 1.5rem;
          --chat--window--right: 1.5rem;
          --chat--window--width: 390px;
          --chat--window--height: 600px;
          --chat--window--z-index: 9999;
          --chat--font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          --chat--body--background: #FAF9F5;
          --chat--footer--background: #FAF9F5;
        }

        .chat-window-wrapper .chat-window {
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }

        .chat-window-wrapper .chat-window-toggle {
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.15), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          border: 2px solid #ecfdf5;
        }

        .chat-layout .chat-header h1 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
      `;
      document.head.appendChild(style);
    }

    // 3. Dynamically import createChat from CDN and instantiate
    const loadN8nChat = async () => {
      try {
        // @ts-ignore
        const { createChat } = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');
        
        createChat({
          webhookUrl: WEBHOOK_URL,
          initialMessages: [
            'Hello! Welcome to Verde Organic Kitchen 🌿',
            'I am your AI dining and wellness assistant. You can ask me about our seasonal menu, nutrition & macros, farm origins, table reservations, or custom dietary requests!'
          ],
          i18n: {
            en: {
              title: 'Verde AI Concierge',
              subtitle: 'Online · Powered by n8n',
              footer: 'Verde Organic Kitchen · Clean Food AI',
              getStarted: 'Start Chat',
              inputPlaceholder: 'Ask about meals, calories, reservations...'
            }
          }
        });
      } catch (err) {
        console.error('Failed to initialize n8n chat widget:', err);
      }
    };

    loadN8nChat();
  }, []);

  return null;
};
