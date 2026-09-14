import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ServicesSection } from './services-section';

describe('ServicesSection', () => {
  it('opens one working stage by default', () => {
    render(<ServicesSection />);
    expect(screen.getByRole('button', { name: /AUDIT/ })).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses an open stage when it is selected again', () => {
    render(<ServicesSection />);
    const auditButton = screen.getByRole('button', { name: /AUDIT/ });
    fireEvent.click(auditButton);
    expect(auditButton).toHaveAttribute('aria-expanded', 'false');
  });
});
