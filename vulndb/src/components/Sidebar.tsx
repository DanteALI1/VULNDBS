import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, ShieldAlert, ScanLine, FileText, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, onLogout }) => {
  const { colors } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: ShieldAlert },
    { id: 'scanner', label: 'Scanner', icon: ScanLine },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div style={{ 
      width: collapsed ? '5rem' : '16rem', 
      height: '100vh', 
      background: colors.bgSecondary,
      borderRight: `1px solid ${colors.border}`,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s ease',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100
    }}>
      <div style={{ padding: '20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
        {!collapsed && (
          <h1 style={{ fontSize: '20px', fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            VulnDB
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{ background: 'none', border: 'none', color: colors.text, cursor: 'pointer', padding: '8px' }}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav style={{ flex: 1, padding: '16px 8px' }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              marginBottom: '4px',
              background: currentPage === item.id ? 'rgba(99,102,241,0.1)' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: currentPage === item.id ? colors.primary : colors.text,
              cursor: 'pointer',
              justifyContent: collapsed ? 'center' : 'flex-start',
              transition: 'all 0.2s ease'
            }}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div style={{ padding: '16px 8px', borderTop: `1px solid ${colors.border}` }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            background: 'transparent',
            border: 'none',
            borderRadius: '8px',
            color: '#ef4444',
            cursor: 'pointer',
            justifyContent: collapsed ? 'center' : 'flex-start'
          }}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
