import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    bg: string;
    bgSecondary: string;
    text: string;
    textSecondary: string;
    primary: string;
    primaryGlow: string;
    cardBg: string;
    border: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('vulndb-theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vulndb-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const colors = theme === 'dark' 
    ? {
        bg: '#0f172a',
        bgSecondary: '#1e293b',
        text: '#e2e8f0',
        textSecondary: '#94a3b8',
        primary: '#6366f1',
        primaryGlow: 'rgba(99, 102, 241, 0.3)',
        cardBg: '#1e293b',
        border: '#334155'
      }
    : {
        bg: '#f8fafc',
        bgSecondary: '#ffffff',
        text: '#1e293b',
        textSecondary: '#64748b',
        primary: '#4f46e5',
        primaryGlow: 'rgba(79, 70, 229, 0.3)',
        cardBg: '#ffffff',
        border: '#e2e8f0'
      };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
