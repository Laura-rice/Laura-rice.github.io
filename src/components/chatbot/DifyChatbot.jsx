import { useEffect } from 'react';
import { loadDifyChatbot } from '../../adapters/chatbot/dify-chatbot';

const DIFY_CONFIG = {
  token: import.meta.env.VITE_DIFY_CHATBOT_TOKEN,
  baseUrl: import.meta.env.VITE_DIFY_BASE_URL,
};

export function DifyChatbot() {
  useEffect(() => {
    loadDifyChatbot(DIFY_CONFIG);
  }, []);

  return null;
}
