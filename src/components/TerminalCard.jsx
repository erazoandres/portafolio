/**
 * Reusable terminal-style card with macOS-like window chrome (dots + filename).
 */
export default function TerminalCard({ filename, children, className = '', onFlip, ...props }) {
  return (
    <div className={`term-card ${className}`} tabIndex={0} {...props}>
      <div className="term-header">
        <div className="term-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="term-filename">{filename}</span>
        {onFlip && (
          <button type="button" className="terminal-flip-btn" onClick={onFlip} title="Girar tarjeta">
            <i className="fas fa-sync-alt" aria-hidden="true"></i>
          </button>
        )}
      </div>
      <div className="term-body">
        {children}
      </div>
    </div>
  );
}
