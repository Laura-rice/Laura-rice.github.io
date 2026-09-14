import { describe, expect, it } from 'vitest';
import { resolveProfileUrl } from '../../core/social_profile';

describe('resolveProfileUrl', () => {
  it('returns the profile when a valid GitHub URL is configured', () => {
    expect(resolveProfileUrl({ id: 'github', url: ' https://github.com/octocat ' })).toBe('https://github.com/octocat');
  });
  it('preserves share parameters when a Xiaohongshu profile is configured', () => {
    const url = 'https://www.xiaohongshu.com/user/profile/example123?source=share';
    expect(resolveProfileUrl({ id: 'xiaohongshu', url })).toBe(url);
  });
  it.each(['', undefined, 'javascript:alert(1)', 'https://github.com.evil.test/user', 'https://github.com/a/repo', 'http://github.com/name', 'https://name:secret@github.com/user'])(
    'returns null when a GitHub URL is missing or unsafe: %s', (url) => {
      expect(resolveProfileUrl({ id: 'github', url })).toBeNull();
    },
  );
  it('rejects a homepage when no personal profile is provided', () => {
    expect(resolveProfileUrl({ id: 'xiaohongshu', url: 'https://www.xiaohongshu.com/' })).toBeNull();
  });
});
