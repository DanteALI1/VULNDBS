import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Shield, Database, Plug, Key, ChevronDown, ChevronUp } from 'lucide-react';

const Settings: React.FC = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'database' | 'integrations' | 'api'>('profile');
  const [expandedIntegration, setExpandedIntegration] = useState<string | null>(null);

  const cardStyle: React.CSSProperties = {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '24px'
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'api', label: 'API Keys', icon: Key }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ width: '250px' }}>
          <div style={cardStyle}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px',
                  background: activeTab === tab.id ? colors.bgSecondary : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: activeTab === tab.id ? colors.primary : colors.text,
                  cursor: 'pointer',
                  marginBottom: '4px',
                  textAlign: 'left'
                }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          {activeTab === 'profile' && (
            <div style={cardStyle}>
              <h3 style={{ color: colors.text, marginBottom: '20px' }}>Profile Settings</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 700, color: 'white' }}>AS</div>
                <div>
                  <button style={{ padding: '8px 16px', background: colors.bgSecondary, border: `1px solid ${colors.border}`, borderRadius: '6px', color: colors.text, cursor: 'pointer', marginRight: '8px' }}>Change Avatar</button>
                  <button style={{ padding: '8px 16px', background: 'transparent', border: `1px solid ${colors.border}`, borderRadius: '6px', color: colors.textSecondary, cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: 'First Name', value: 'Admin' },
                  { label: 'Last Name', value: 'User' },
                  { label: 'Email', value: 'admin@vulndb.local' },
                  { label: 'Position', value: 'SOC Manager' }
                ].map((field, index) => (
                  <div key={index}>
                    <label style={{ display: 'block', color: colors.textSecondary, marginBottom: '8px', fontSize: '14px' }}>{field.label}</label>
                    <input type="text" defaultValue={field.value} style={{ width: '100%', padding: '12px', background: colors.bgSecondary, border: `1px solid ${colors.border}`, borderRadius: '8px', color: colors.text }} />
                  </div>
                ))}
              </div>
              <button style={{ marginTop: '20px', padding: '12px 24px', background: colors.primary, border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>Save Changes</button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div style={cardStyle}>
              <h3 style={{ color: colors.text, marginBottom: '20px' }}>Notification Preferences</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Critical Vulnerabilities', desc: 'Immediate alerts for critical severity issues', enabled: true },
                  { label: 'High Severity', desc: 'Notifications for high severity vulnerabilities', enabled: true },
                  { label: 'Scan Complete', desc: 'When scheduled scans finish', enabled: false },
                  { label: 'Weekly Reports', desc: 'Summary report every Monday', enabled: true },
                  { label: 'New CVE Alerts', desc: 'When new CVEs are published', enabled: false }
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: colors.bgSecondary, borderRadius: '8px' }}>
                    <div>
                      <div style={{ color: colors.text, fontWeight: 600 }}>{item.label}</div>
                      <div style={{ color: colors.textSecondary, fontSize: '14px' }}>{item.desc}</div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                      <input type="checkbox" defaultChecked={item.enabled} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: 'absolute', inset: 0, background: item.enabled ? colors.primary : colors.border, borderRadius: '26px', transition: '0.3s' }}>
                        <span style={{ position: 'absolute', left: item.enabled ? '26px' : '2px', top: '2px', width: '22px', height: '22px', background: 'white', borderRadius: '50%', transition: '0.3s' }}></span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={cardStyle}>
              <h3 style={{ color: colors.text, marginBottom: '20px' }}>Security Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security', enabled: false },
                  { label: 'Login Alerts', desc: 'Get notified on new logins', enabled: true },
                  { label: 'API Authentication Required', desc: 'Require auth for all API calls', enabled: true },
                  { label: 'Audit Logging', desc: 'Log all user actions', enabled: true }
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: colors.bgSecondary, borderRadius: '8px' }}>
                    <div>
                      <div style={{ color: colors.text, fontWeight: 600 }}>{item.label}</div>
                      <div style={{ color: colors.textSecondary, fontSize: '14px' }}>{item.desc}</div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                      <input type="checkbox" defaultChecked={item.enabled} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: 'absolute', inset: 0, background: item.enabled ? colors.primary : colors.border, borderRadius: '26px', transition: '0.3s' }}>
                        <span style={{ position: 'absolute', left: item.enabled ? '26px' : '2px', top: '2px', width: '22px', height: '22px', background: 'white', borderRadius: '50%', transition: '0.3s' }}></span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
              <div style={{ padding: '20px', background: colors.bgSecondary, borderRadius: '8px' }}>
                <h4 style={{ color: colors.text, marginBottom: '16px' }}>Change Password</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <input type="password" placeholder="Current Password" style={{ padding: '12px', background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '8px', color: colors.text }} />
                  <input type="password" placeholder="New Password" style={{ padding: '12px', background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '8px', color: colors.text }} />
                </div>
                <button style={{ padding: '10px 20px', background: colors.primary, border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}>Update Password</button>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div style={cardStyle}>
              <h3 style={{ color: colors.text, marginBottom: '20px' }}>Database Settings</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Version', value: '2.4.1' },
                  { label: 'Total Records', value: '15,432' },
                  { label: 'Database Size', value: '245 MB' },
                  { label: 'Last Update', value: '2 hours ago' }
                ].map((stat, index) => (
                  <div key={index} style={{ padding: '16px', background: colors.bgSecondary, borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ color: colors.primary, fontSize: '24px', fontWeight: 700 }}>{stat.value}</div>
                    <div style={{ color: colors.textSecondary, fontSize: '12px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button style={{ padding: '10px 20px', background: colors.primary, border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}>Update Now</button>
                <button style={{ padding: '10px 20px', background: colors.bgSecondary, border: `1px solid ${colors.border}`, borderRadius: '6px', color: colors.text, cursor: 'pointer' }}>Import</button>
                <button style={{ padding: '10px 20px', background: colors.bgSecondary, border: `1px solid ${colors.border}`, borderRadius: '6px', color: colors.text, cursor: 'pointer' }}>Export</button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div style={cardStyle}>
              <h3 style={{ color: colors.text, marginBottom: '20px' }}>Integrations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'SMTP', host: 'smtp.company.local', port: 587, enabled: true },
                  { name: 'Microsoft Exchange', url: 'https://exchange.company.local/ews', enabled: false },
                  { name: 'LDAP/AD', server: 'dc01.company.local', port: 389, enabled: true },
                  { name: 'SSO (SAML)', entityId: 'https://idp.company.local', enabled: false }
                ].map((integration, index) => (
                  <div key={index} style={{ border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
                    <button
                      onClick={() => setExpandedIntegration(expandedIntegration === integration.name ? null : integration.name)}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: colors.bgSecondary, border: 'none', cursor: 'pointer', color: colors.text }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Plug size={18} color={integration.enabled ? colors.primary : colors.textSecondary} />
                        <span>{integration.name}</span>
                        <span style={{ fontSize: '12px', color: colors.textSecondary, marginLeft: '8px' }}>{integration.host || integration.url || integration.server || integration.entityId}</span>
                      </div>
                      {expandedIntegration === integration.name ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div style={cardStyle}>
              <h3 style={{ color: colors.text, marginBottom: '20px' }}>API Keys</h3>
              <button style={{ marginBottom: '20px', padding: '10px 20px', background: colors.primary, border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}>+ Create New Key</button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Production Key', key: 'vk_prod_***abc123', status: 'Active', created: '2024-01-15' },
                  { name: 'Development Key', key: 'vk_dev_***xyz789', status: 'Active', created: '2024-03-20' },
                  { name: 'Legacy Key', key: 'vk_leg_***old456', status: 'Revoked', created: '2023-06-10' }
                ].map((apiKey, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: colors.bgSecondary, borderRadius: '8px' }}>
                    <div>
                      <div style={{ color: colors.text, fontWeight: 600 }}>{apiKey.name}</div>
                      <div style={{ color: colors.textSecondary, fontSize: '12px', fontFamily: 'monospace' }}>{apiKey.key}</div>
                      <div style={{ color: colors.textSecondary, fontSize: '12px' }}>Created: {apiKey.created}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ padding: '4px 12px', background: apiKey.status === 'Active' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: apiKey.status === 'Active' ? '#22c55e' : '#ef4444', borderRadius: '4px', fontSize: '12px' }}>{apiKey.status}</span>
                      <button style={{ padding: '6px 12px', background: 'transparent', border: `1px solid ${colors.border}`, borderRadius: '4px', color: colors.textSecondary, cursor: 'pointer', fontSize: '12px' }}>Revoke</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
