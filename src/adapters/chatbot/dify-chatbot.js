const DIFY_SCRIPT_ID = 'dify-chatbot-embed';
const DIFY_BUBBLE_BUTTON_ID = 'dify-chatbot-bubble-button';

export function loadDifyChatbot({ token, baseUrl }) {
  if (!token || !baseUrl || typeof document === 'undefined') {
    return false;
  }

  window.difyChatbotConfig = {
    token,
    baseUrl,
    inputs: {},
    systemVariables: {},
    userVariables: {},
  };

  if (document.getElementById(DIFY_SCRIPT_ID)) {
    return true;
  }

  const script = document.createElement('script');
  script.id = DIFY_SCRIPT_ID;
  script.src = `${baseUrl}/embed.min.js`;
  script.defer = true;
  document.body.appendChild(script);
  return true;
}

export function openDifyChatbot() {
  if (typeof document === 'undefined') return false;
  const bubbleButton = document.getElementById(DIFY_BUBBLE_BUTTON_ID);
  if (!(bubbleButton instanceof HTMLElement)) return false;
  bubbleButton.click();
  return true;
}
