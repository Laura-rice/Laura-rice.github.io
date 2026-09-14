import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AiTrigger } from './AiTrigger';

describe('AiTrigger', () => {
  it('renders a reserved English AI assistant button', () => {
    render(<AiTrigger />);
    expect(screen.getByRole('button', { name: 'AI ASSISTANT' })).toBeVisible();
  });
});
