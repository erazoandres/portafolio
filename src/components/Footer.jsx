/**
 * Site footer with terminal-style exit command.
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <span className="footer-accent">process.exit(0);</span> // © {new Date().getFullYear()} Andrés
        Erazo
      </p>
    </footer>
  );
}
