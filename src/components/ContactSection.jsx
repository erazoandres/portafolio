import { useState, useRef } from 'react';
import FadeIn from './FadeIn';

/**
 * Premium Contact Section — sleek asymmetrical layout with glassmorphism interactions.
 */
export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const containerRef = useRef(null);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  return (
    <section id="contact" className="section premium-contact-section" ref={containerRef}>
      {/* Background Ambience */}
      <div className="contact-ambient-glow"></div>
      
      <div className="premium-contact-container">
        
        {/* Left Side: Typography and Info */}
        <div className="contact-info-panel">
           <FadeIn as="div" className="status-badge">
             <div className="status-dot"></div>
             <span>Disponible para nuevos proyectos</span>
           </FadeIn>
           
           <FadeIn as="h2" className="contact-heading">
             Hagamos algo <br/>
             <span className="text-glow">increíble.</span>
           </FadeIn>
           
           <FadeIn as="p" className="contact-subheading" delay={0.1}>
             Si tienes una idea en mente, un proyecto en desarrollo o simplemente quieres decir hola, mi bandeja de entrada siempre está abierta.
           </FadeIn>

           <FadeIn as="div" className="contact-methods" delay={0.2}>
              <a href="mailto:erazoandres14@gmail.com" className="method-card">
                 <div className="method-icon"><i className="fas fa-envelope"></i></div>
                 <div className="method-text">
                   <span className="method-label">Email Directo</span>
                   <span className="method-value">erazoandres14@gmail.com</span>
                 </div>
              </a>
              <div className="social-methods">
                <a href="https://github.com/erazoandres" target="_blank" rel="noreferrer" className="social-circle">
                   <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/erazoandres1408/" target="_blank" rel="noreferrer" className="social-circle">
                   <i className="fab fa-linkedin"></i>
                </a>
              </div>
           </FadeIn>
        </div>

        {/* Right Side: Form */}
        <div className="contact-form-panel">
          <FadeIn className="form-glass-container" delay={0.3}>
            <div className="glass-reflection"></div>
            <form className="premium-form" onSubmit={(e) => e.preventDefault()}>
              <h3 className="form-title">Envíame un mensaje</h3>
              <div className="input-row">
                  <div className="input-group">
                      <input type="text" id="name" value={formState.name} onChange={handleChange} placeholder=" " required />
                      <label htmlFor="name">Nombre</label>
                      <div className="focus-border"></div>
                  </div>
                  <div className="input-group">
                      <input type="email" id="email" value={formState.email} onChange={handleChange} placeholder=" " required />
                      <label htmlFor="email">Email</label>
                      <div className="focus-border"></div>
                  </div>
              </div>
              <div className="input-group textarea-group">
                  <textarea id="message" rows="4" value={formState.message} onChange={handleChange} placeholder=" " required></textarea>
                  <label htmlFor="message">Tu Mensaje</label>
                  <div className="focus-border"></div>
              </div>
              <button type="submit" className="premium-submit-btn">
                  <span className="btn-text">Enviar Mensaje</span>
                  <div className="btn-icon">
                     <i className="fas fa-paper-plane"></i>
                  </div>
              </button>
            </form>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
