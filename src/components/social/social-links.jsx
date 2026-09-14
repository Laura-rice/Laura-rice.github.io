import { SOCIAL_PROFILES } from '../../data/siteContent';
import { resolveProfileUrl } from '../../core/social_profile';

/** Real profile anchors open in a new tab; missing URLs stay non-interactive. */
export function SocialLinks({ profiles = SOCIAL_PROFILES, compact = false, label = '社交主页' }) {
  return (
    <div className={`social-links${compact ? ' social-links--compact' : ''}`} role="group" aria-label={label}>
      {profiles.map((profile) => {
        const href = resolveProfileUrl(profile);
        const content = <><span className="social-link__name">{profile.label}</span>
          {!compact && <span className="social-link__description">{profile.description}</span>}
          <span className="social-link__arrow" aria-hidden="true">{href ? '↗' : '待连接'}</span></>;
        return href ? (
          <a key={profile.id} className="social-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${profile.label}个人主页（新标签页打开）`}>{content}</a>
        ) : (
          <span key={profile.id} className="social-link social-link--pending" aria-label={`${profile.label}主页待连接`}>{content}</span>
        );
      })}
    </div>
  );
}
