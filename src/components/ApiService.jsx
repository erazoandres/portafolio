import { useState, useEffect } from 'react';
import FadeIn from './FadeIn';
import TerminalCard from './TerminalCard';

/**
 * ApiService component - A live dashboard to consume and monitor 
 * the FastAPI backend at http://127.0.0.1:8000/
 */
export default function ApiService() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('checking'); // checking | online | offline
  const [endpoint, setEndpoint] = useState('/');
  const [error, setError] = useState(null);

  const fetchApiData = async (path = '/') => {
    setStatus('checking');
    try {
      // We use the '/api' prefix configured in vite.config.js proxy
      const response = await fetch(`/api${path}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      setData(json);
      setStatus('online');
      setError(null);
    } catch (err) {
      console.error('API Fetch Error:', err);
      setStatus('offline');
      setError(err.message);
      setData(null);
    }
  };

  useEffect(() => {
    fetchApiData(endpoint);
  }, []);

  return (
    <section id="services" className="section">
      <FadeIn as="span" className="section-label">Real-time Services</FadeIn>
      <FadeIn as="h2" className="section-heading">Microservicios & APIs</FadeIn>
      
      <div className="services-grid">
        <FadeIn>
          <TerminalCard filename="api_monitor.sh" className="api-monitor-card">
            <div className="monitor-header">
              <div className="monitor-status">
                <span className={`status-dot ${status}`}></span>
                <span className="status-text">Backend Status: {status.toUpperCase()}</span>
              </div>
              <div className="endpoint-selector">
                <span className="prompt">❯ GET </span>
                <input 
                  type="text" 
                  value={endpoint} 
                  onChange={(e) => setEndpoint(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && fetchApiData(endpoint)}
                  placeholder="/endpoint"
                  className="endpoint-input"
                />
                <button onClick={() => fetchApiData(endpoint)} className="fetch-btn">
                  <i className="fas fa-sync-alt"></i>
                </button>
              </div>
            </div>

            <div className="monitor-body">
              {status === 'checking' && (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Solicitando datos a FastAPI...</p>
                </div>
              )}

              {status === 'offline' && (
                <div className="error-state">
                  <i className="fas fa-exclamation-triangle"></i>
                  <p>No se pudo conectar con el servidor local.</p>
                  <span className="error-detail">{error}</span>
                  <div className="help-box">
                    <p>Asegúrate de que FastAPI esté corriendo en:</p>
                    <code>uvicorn main:app --reload</code>
                  </div>
                </div>
              )}

              {status === 'online' && data && (
                <div className="data-view">
                  <div className="data-header">Response JSON:</div>
                  <pre className="json-viewer">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </TerminalCard>
        </FadeIn>

        <FadeIn>
          <div className="api-description-panel">
            <h3>Conexión con FastAPI</h3>
            <p>
              Este panel consume una API local construida con **FastAPI**. 
              Utiliza un proxy dinámico en Vite para resolver problemas de CORS y 
              permitir una comunicación fluida entre el frontend React y el backend Python.
            </p>
            <ul className="api-features">
              <li><i className="fas fa-bolt"></i> Respuestas asíncronas de alto rendimiento.</li>
              <li><i className="fas fa-shield-alt"></i> Validación automática de tipos con Pydantic.</li>
              <li><i className="fas fa-project-diagram"></i> Documentación interactiva generada por Swagger.</li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
