/**
 * Reusable terminal-style card with macOS-like window chrome (dots + filename).
 */
export default function TerminalCard({ filename, children, className = '', ...props }) {
  return (
    <div className={`term-card ${className}`} tabIndex={0} {...props}>
      <div className="term-header">
        <div className="term-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="term-filename">{filename}</span>
      </div>
      <div className="term-body">
        {children}
      </div>
    </div>
  );
}
