import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMagnetic } from '../hooks/useMagnetic';

/**
 * Premium Contact Section — Redesigned with advanced interactions, 
 * magnetic elements, and robust form state management.
 */
export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success
  
  const containerRef = useRef(null);
  
  // Magnetic effects
  const githubRef = useMagnetic({ strength: 30 });
  const linkedinRef = useMagnetic({ strength: 30 });
  const submitBtnRef = useMagnetic({ strength: 40 });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  useGSAP(() => {
    // Scroll reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    });

    tl.from('.contact-info-panel > *', {
      x: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    })
    .from('.contact-form-panel', {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6');

  }, { scope: containerRef });

  return (
    <section id="contact" className="section premium-contact-section" ref={containerRef}>
      <div className="contact-ambient-glow"></div>
      
      <div className="premium-contact-container">
        
        {/* Left Side: Information */}
        <div className="contact-info-panel">
           <div className="status-badge">
             <div className="status-dot"></div>
             <span>Disponible ahora</span>
           </div>
           
           <h2 className="contact-heading">
             Hablemos de tu <br/>
             <span className="text-glow">próximo éxito.</span>
           </h2>
           
           <p className="contact-subheading">
             ¿Tienes una idea audaz? Estoy listo para transformarla en una realidad digital de alto rendimiento.
           </p>

           <div className="contact-methods">
              <a href="mailto:erazoandres14@gmail.com" className="method-card group">
                 <div className="method-icon"><i className="fas fa-envelope"></i></div>
                 <div className="method-text">
                   <span className="method-label">Email</span>
                   <span className="method-value">erazoandres14@gmail.com</span>
                 </div>
                 <div className="card-arrow"><i className="fas fa-arrow-right"></i></div>
              </a>

              <div className="social-methods">
                <a 
                  ref={githubRef}
                  href="https://github.com/erazoandres" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-circle"
                  aria-label="GitHub"
                >
                   <i className="fab fa-github"></i>
                </a>
                <a 
                  ref={linkedinRef}
                  href="https://www.linkedin.com/in/erazoandres1408/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-circle"
                  aria-label="LinkedIn"
                >
                   <i className="fab fa-linkedin"></i>
                </a>
              </div>
           </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="contact-form-panel">
          <div className="form-glass-container">
            <div className="glass-reflection"></div>
            
            {status === 'success' ? (
              <div className="form-success-message">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>¡Mensaje Recibido!</h3>
                <p>Te responderé en menos de 24 horas. ¡Hablemos pronto!</p>
                <button className="btn btn-ghost" style={{ marginTop: '1.5rem' }} onClick={() => setStatus('idle')}>
                  Enviar otro
                </button>
              </div>
            ) : (
              <form className="premium-form" onSubmit={handleSubmit}>
                <h3 className="form-title">Proyectar ahora</h3>
                
                <div className="input-row">
                    <div className="input-group">
                        <input 
                          type="text" 
                          id="name" 
                          value={formState.name} 
                          onChange={handleChange} 
                          placeholder=" " 
                          required 
                          disabled={status === 'sending'}
                        />
                        <label htmlFor="name">Nombre</label>
                        <div className="focus-border"></div>
                    </div>
                    <div className="input-group">
                        <input 
                          type="email" 
                          id="email" 
                          value={formState.email} 
                          onChange={handleChange} 
                          placeholder=" " 
                          required 
                          disabled={status === 'sending'}
                        />
                        <label htmlFor="email">Email</label>
                        <div className="focus-border"></div>
                    </div>
                </div>
                
                <div className="input-group textarea-group">
                    <textarea 
                      id="message" 
                      rows="4" 
                      value={formState.message} 
                      onChange={handleChange} 
                      placeholder=" " 
                      required
                      disabled={status === 'sending'}
                    ></textarea>
                    <label htmlFor="message">¿En qué puedo ayudarte?</label>
                    <div className="focus-border"></div>
                </div>

                <button 
                  ref={submitBtnRef}
                  type="submit" 
                  className={`premium-submit-btn ${status === 'sending' ? 'loading' : ''}`}
                  disabled={status === 'sending'}
                >
                    <span className="btn-text">
                      {status === 'sending' ? 'Enviando...' : 'Enviar Propuesta'}
                    </span>
                    <div className="btn-icon">
                       <i className={`fas ${status === 'sending' ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                    </div>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
