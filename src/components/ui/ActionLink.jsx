import { Link } from 'react-router-dom';

export function ActionLink({ to, children, variant = 'primary' }) {
  const className = `action-link action-link--${variant}`;
  return to.startsWith('/') ? <Link className={className} to={to}>{children}<span>↗</span></Link> : <a className={className} href={to}>{children}<span>↗</span></a>;
}
