export function MetalFallback() {
  return (
    <div className="metal-fallback" aria-hidden="true">
      <div className="metal-fallback__orb" />
      <div className="metal-fallback__ring metal-fallback__ring--outer" />
      <div className="metal-fallback__ring metal-fallback__ring--inner" />
      <span className="metal-fallback__axis metal-fallback__axis--x" />
      <span className="metal-fallback__axis metal-fallback__axis--y" />
    </div>
  );
}
