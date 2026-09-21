import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Bell, Search, UserCircle } from 'lucide-react';
import { notifications } from '../data/mockData';

interface HeaderProps {
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const { colors, theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const pageDescriptions: Record<string, string> = {
    dashboard: 'Overview of your security posture',
    vulnerabilities: 'Manage and track vulnerabilities',
    scanner: 'Run vulnerability scans',
    reports: 'Generate security reports',
    settings: 'Configure application settings'
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      background: colors.bgSecondary,
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      zIndex: 90
    }}>
      {/* Left Section - Page Info */}
      <div>
        <h2 style={{ color: colors.text, fontSize: '24px', fontWeight: 600, textTransform: 'capitalize' }}>
          {currentPage}
        </h2>
        <p style={{ color: colors.textSecondary, fontSize: '14px' }}>
          {pageDescriptions[currentPage] || ''}
        </p>
      </div>

      {/* Right Section - Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={18} color={colors.textSecondary} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search CVE..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '250px',
              padding: '10px 12px 10px 40px',
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              color: colors.text,
              fontSize: '14px'
            }}
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            padding: '10px',
            color: colors.text,
            cursor: 'pointer'
          }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              padding: '10px',
              color: colors.text,
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                background: '#ef4444',
                borderRadius: '50%',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              width: '350px',
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              maxHeight: '400px',
              overflow: 'auto'
            }}>
              <div style={{ padding: '16px', borderBottom: `1px solid ${colors.border}` }}>
                <h4 style={{ color: colors.text }}>Notifications</h4>
              </div>
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    style={{
                      padding: '16px',
                      borderBottom: `1px solid ${colors.border}`,
                      background: !notification.read ? `rgba(${colors.primary}, 0.05)` : 'transparent'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: notification.type === 'error' ? '#ef4444' :
                                   notification.type === 'warning' ? '#f97316' :
                                   notification.type === 'success' ? '#22c55e' : '#3b82f6',
                        flexShrink: 0,
                        marginTop: '4px'
                      }} />
                      <div>
                        <p style={{ color: colors.text, fontSize: '14px', marginBottom: '4px' }}>{notification.title}</p>
                        <p style={{ color: colors.textSecondary, fontSize: '12px' }}>{notification.message}</p>
                        <p style={{ color: colors.textSecondary, fontSize: '11px', marginTop: '4px' }}>{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '20px', borderLeft: `1px solid ${colors.border}` }}>
          <UserCircle size={32} color={colors.primary} />
          <div>
            <p style={{ color: colors.text, fontSize: '14px', fontWeight: 600 }}>Admin User</p>
            <p style={{ color: colors.textSecondary, fontSize: '12px' }}>SOC Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
