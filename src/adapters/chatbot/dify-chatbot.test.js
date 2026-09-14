import { afterEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';
import { loadDifyChatbot, openDifyChatbot } from './dify-chatbot';

const CHATBOT_CONFIG = {
  token: 'test-token',
  baseUrl: 'https://udify.app',
};

afterEach(() => {
  document.body.innerHTML = '';
  delete window.difyChatbotConfig;
});

describe('loadDifyChatbot', () => {
  it('testLoadsEmbedScriptWhenConfigIsValid', () => {
    expect(loadDifyChatbot(CHATBOT_CONFIG)).toBe(true);
    expect(window.difyChatbotConfig).toEqual({
      ...CHATBOT_CONFIG,
      inputs: {},
      systemVariables: {},
      userVariables: {},
    });
    expect(document.querySelector('script').src).toBe('https://udify.app/embed.min.js');
  });

  it('testSkipsLoadingWhenTokenIsMissing', () => {
    expect(loadDifyChatbot({ ...CHATBOT_CONFIG, token: '' })).toBe(false);
    expect(document.querySelector('script')).toBeNull();
  });

  it('testDoesNotDuplicateScriptWhenLoadedTwice', () => {
    loadDifyChatbot(CHATBOT_CONFIG);
    loadDifyChatbot(CHATBOT_CONFIG);
    expect(document.querySelectorAll('script')).toHaveLength(1);
  });
});

describe('openDifyChatbot', () => {
  it('opens the embedded assistant through its hidden launcher', () => {
    const bubbleButton = document.createElement('button');
    bubbleButton.id = 'dify-chatbot-bubble-button';
    bubbleButton.click = vi.fn();
    document.body.appendChild(bubbleButton);

    expect(openDifyChatbot()).toBe(true);
    expect(bubbleButton.click).toHaveBeenCalledOnce();
  });

  it('returns false before the embedded assistant is ready', () => {
    expect(openDifyChatbot()).toBe(false);
  });
});
