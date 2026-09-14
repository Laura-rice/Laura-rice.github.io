import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SocialLinks } from '../../../components/social/social-links';

const GITHUB_PROFILE = { id: 'github', label: 'GitHub', description: '代码', url: 'https://github.com/octocat' };

describe('SocialLinks', () => {
  it('opens the correct destination when a profile is configured', () => {
    render(<SocialLinks profiles={[GITHUB_PROFILE]} />);
    const link = screen.getByRole('link', { name: /GitHub个人主页/ });
    expect(link).toHaveAttribute('href', GITHUB_PROFILE.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
  it('shows pending text when the address is missing', () => {
    render(<SocialLinks profiles={[{ ...GITHUB_PROFILE, url: '' }]} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('待连接')).toBeVisible();
  });
  it('keeps invalid destinations non-interactive when a URL is malformed', () => {
    render(<SocialLinks profiles={[{ ...GITHUB_PROFILE, url: 'javascript:alert(1)' }]} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
