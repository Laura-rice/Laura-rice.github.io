export function WonderPageFrame({ children, immersive = false }) {
  return <div className={immersive ? 'wonder-page wonder-page--immersive' : 'wonder-page'}>{children}</div>;
}
