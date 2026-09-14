const PROFILE_RULES = {
  github: { hosts: ['github.com', 'www.github.com'], path: /^\/[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?\/?$/i },
  xiaohongshu: { hosts: ['xiaohongshu.com', 'www.xiaohongshu.com'], path: /^\/user\/profile\/[a-z\d_-]+\/?$/i },
};

/** Returns a verified HTTPS profile URL, or null for a missing/invalid value. */
export function resolveProfileUrl({ id, url }) {
  const candidate = typeof url === 'string' ? url.trim() : '';
  const rule = PROFILE_RULES[id];
  if (!rule || !URL.canParse(candidate)) return null;
  const profileUrl = new URL(candidate);
  const isValid = profileUrl.protocol === 'https:' && !profileUrl.username && !profileUrl.password
    && !profileUrl.port && rule.hosts.includes(profileUrl.hostname) && rule.path.test(profileUrl.pathname);
  return isValid ? profileUrl.href : null;
}
