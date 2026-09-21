import React, { useState, useEffect } from 'react';
import { Shield, Building2, User, Lock, Eye, EyeOff, CheckCircle, Activity, Database } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    login: '',
    department: 'SOC',
    password: '',
    confirmPassword: ''
  });

  const terminalMessages = [
    '> Initializing VulnDB System...',
    '> Loading CVE database...',
    '> Connecting to NVD mirror...',
    '> Syncing vulnerability feeds...',
    '> System ready for authentication'
  ];

  useEffect(() => {
    setTerminalLines([]);
    terminalMessages.forEach((msg, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, msg]);
      }, index * 400);
    });
  }, [isLogin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (loginForm.identifier.toLowerCase() === 'admin' && loginForm.password === 'Admin') {
        onLogin();
      } else {
        setError('Invalid credentials. Use: Admin / Admin');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLogin(true);
      setIsLoading(false);
    }, 1000);
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: '#0a0e1a',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative'
  };

  const gridStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    pointerEvents: 'none'
  };

  const glowStyle1: React.CSSProperties = {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
    top: '-100px',
    left: '-100px',
    animation: 'pulse 4s infinite',
    pointerEvents: 'none'
  };

  const glowStyle2: React.CSSProperties = {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)',
    bottom: '-50px',
    right: '10%',
    animation: 'pulse 4s infinite reverse',
    pointerEvents: 'none'
  };

  const leftPanelStyle: React.CSSProperties = {
    width: isLogin ? '45%' : '0%',
    opacity: isLogin ? 1 : 0,
    transform: isLogin ? 'translateX(0)' : 'translateX(-80px)',
    filter: isLogin ? 'blur(0)' : 'blur(8px)',
    transition: 'all 0.5s ease',
    padding: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '40px'
  };

  const terminalContainerStyle: React.CSSProperties = {
    background: 'rgba(15,23,42,0.8)',
    border: '1px solid rgba(99,102,241,0.2)',
    borderRadius: '8px',
    padding: '20px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '14px',
    minHeight: '200px'
  };

  const statusRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '20px',
    padding: '12px',
    background: 'rgba(99,102,241,0.1)',
    borderRadius: '6px'
  };

  const formContainerStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: isLogin ? 'flex-start' : 'center',
    paddingLeft: isLogin ? '12%' : '0',
    transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)'
  };

  const formStyle: React.CSSProperties = {
    width: isLogin ? '420px' : '520px',
    padding: '40px',
    background: 'rgba(30,41,59,0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(99,102,241,0.2)',
    borderRadius: '16px',
    boxShadow: isLogin 
      ? '0 4px 20px rgba(0,0,0,0.3)' 
      : '0 8px 32px rgba(99,102,241,0.2)',
    transition: 'all 0.5s ease'
  };

  const inputGroupStyle: React.CSSProperties = {
    marginBottom: '20px',
    position: 'relative'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    paddingLeft: '44px',
    background: 'rgba(15,23,42,0.6)',
    border: '1px solid rgba(99,102,241,0.3)',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle}></div>
      <div style={glowStyle1}></div>
      <div style={glowStyle2}></div>

      <div style={leftPanelStyle}>
        <div style={logoStyle}>
          {isLogin ? (
            <Shield size={48} color="#ef4444" style={{ filter: 'drop-shadow(0 0 10px rgba(239,68,68,0.5))' }} />
          ) : (
            <Building2 size={48} color="#8b5cf6" style={{ filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.5))' }} />
          )}
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              VulnDB
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Local Vulnerability Database</p>
          </div>
        </div>

        <div style={terminalContainerStyle}>
          {terminalLines.map((line, index) => (
            <div key={index} style={{ marginBottom: '8px', animation: 'fadeIn 0.3s ease' }}>
              {line}
              {index === terminalLines.length - 1 && (
                <span style={{ animation: 'blink 1s infinite', color: '#6366f1' }}>█</span>
              )}
            </div>
          ))}
        </div>

        <div style={statusRowStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={16} color="#22c55e" style={{ filter: 'drop-shadow(0 0 5px rgba(34,197,94,0.5))' }} />
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>Monitoring</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={16} color="#22c55e" style={{ filter: 'drop-shadow(0 0 5px rgba(34,197,94,0.5))' }} />
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>CVE Feed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={16} color="#8b5cf6" style={{ filter: 'drop-shadow(0 0 5px rgba(139,92,246,0.5))' }} />
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>Auth</span>
          </div>
        </div>
      </div>

      <div style={formContainerStyle}>
        <div style={formStyle}>
          <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#e2e8f0' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: '30px', fontSize: '14px' }}>
            {isLogin ? 'Enter your credentials to access VulnDB' : 'Register a new account'}
          </p>

          {error && (
            <div style={{ 
              padding: '12px', 
              background: 'rgba(239,68,68,0.1)', 
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '6px',
              color: '#ef4444',
              marginBottom: '20px',
              animation: 'shake 0.5s ease',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div style={inputGroupStyle}>
                <User size={20} color="#6366f1" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Identifier"
                  value={loginForm.identifier}
                  onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <Lock size={20} color="#6366f1" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  style={{ ...inputStyle, paddingRight: '44px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6366f1'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button type="submit" style={buttonStyle} disabled={isLoading}>
                {isLoading ? (
                  <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                ) : (
                  <>
                    <Lock size={18} />
                    Login to System
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={inputGroupStyle}>
                  <User size={20} color="#6366f1" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={registerForm.fullName}
                    onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={inputGroupStyle}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div style={inputGroupStyle}>
                <User size={20} color="#6366f1" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Login"
                  value={registerForm.login}
                  onChange={(e) => setRegisterForm({ ...registerForm, login: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <select
                  value={registerForm.department}
                  onChange={(e) => setRegisterForm({ ...registerForm, department: e.target.value })}
                  style={{ ...inputStyle, appearance: 'none' }}
                >
                  <option value="SOC">SOC</option>
                  <option value="Пентест">Пентест</option>
                  <option value="DevSecOps">DevSecOps</option>
                  <option value="Комплаенс">Комплаенс</option>
                  <option value="IR">IR</option>
                </select>
              </div>

              <div style={inputGroupStyle}>
                <Lock size={20} color="#6366f1" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <Lock size={20} color="#6366f1" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <button type="submit" style={buttonStyle} disabled={isLoading}>
                {isLoading ? (
                  <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          )}

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#6366f1',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto'
              }}
            >
              ← {isLogin ? 'Create new account' : 'Back to login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
