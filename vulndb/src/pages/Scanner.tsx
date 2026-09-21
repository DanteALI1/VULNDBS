import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { scanResults } from '../data/mockData';
import { Play, Clock, CheckCircle, Loader, Shield, Globe, FileCheck } from 'lucide-react';

const Scanner: React.FC = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'scans' | 'new' | 'schedule'>('scans');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle size={18} color="#22c55e" />;
      case 'running': return <Loader size={18} color="#6366f1" style={{ animation: 'spin 1s linear infinite' }} />;
      default: return <Clock size={18} color="#eab308" />;
    }
  };

  const cardStyle: React.CSSProperties = {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '24px'
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[
          { id: 'scans', label: 'Scans', icon: FileCheck },
          { id: 'new', label: 'New Scan', icon: Play },
          { id: 'schedule', label: 'Schedule', icon: Clock }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: activeTab === tab.id ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : colors.bgSecondary,
              border: 'none',
              borderRadius: '8px',
              color: activeTab === tab.id ? 'white' : colors.text,
              cursor: 'pointer'
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'scans' && (
        <div style={cardStyle}>
          <h3 style={{ color: colors.text, marginBottom: '16px' }}>Scan History</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                <th style={{ padding: '12px', textAlign: 'left', color: colors.textSecondary }}>Target</th>
                <th style={{ padding: '12px', textAlign: 'left', color: colors.textSecondary }}>Host</th>
                <th style={{ padding: '12px', textAlign: 'center', color: colors.textSecondary }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'center', color: colors.textSecondary }}>Found</th>
                <th style={{ padding: '12px', textAlign: 'center', color: colors.textSecondary }}>Severity</th>
                <th style={{ padding: '12px', textAlign: 'left', color: colors.textSecondary }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {scanResults.map((scan) => (
                <tr key={scan.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <td style={{ padding: '16px 12px', color: colors.text }}>{scan.target}</td>
                  <td style={{ padding: '16px 12px', color: colors.textSecondary, fontFamily: 'monospace' }}>{scan.host}</td>
                  <td style={{ padding: '16px 12px', textAlign: 'center' }}>{getStatusIcon(scan.status)}</td>
                  <td style={{ padding: '16px 12px', textAlign: 'center', color: colors.text }}>{scan.totalFound}</td>
                  <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                      {scan.severity.critical > 0 && <span style={{ padding: '2px 6px', background: '#ef4444', borderRadius: '3px', fontSize: '10px', color: 'white' }}>{scan.severity.critical}</span>}
                      {scan.severity.high > 0 && <span style={{ padding: '2px 6px', background: '#f97316', borderRadius: '3px', fontSize: '10px', color: 'white' }}>{scan.severity.high}</span>}
                      {scan.severity.medium > 0 && <span style={{ padding: '2px 6px', background: '#eab308', borderRadius: '3px', fontSize: '10px', color: 'white' }}>{scan.severity.medium}</span>}
                    </div>
                  </td>
                  <td style={{ padding: '16px 12px', color: colors.textSecondary }}>{scan.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'new' && (
        <div style={cardStyle}>
          <h3 style={{ color: colors.text, marginBottom: '20px' }}>New Scan</h3>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: colors.textSecondary, marginBottom: '8px' }}>Target</label>
            <input
              type="text"
              placeholder="IP address, hostname, or network range"
              style={{
                width: '100%',
                padding: '14px',
                background: colors.bgSecondary,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                color: colors.text
              }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
            {[
              { type: 'Quick', icon: Play, desc: 'Fast port scan' },
              { type: 'Full', icon: Shield, desc: 'Complete assessment' },
              { type: 'Web', icon: Globe, desc: 'Web application' },
              { type: 'Compliance', icon: FileCheck, desc: 'PCI-DSS, HIPAA' }
            ].map((scanType) => (
              <div key={scanType.type} style={{ padding: '20px', background: colors.bgSecondary, border: `1px solid ${colors.border}`, borderRadius: '8px', cursor: 'pointer', textAlign: 'center' }}>
                <scanType.icon size={32} color={colors.primary} style={{ margin: '0 auto 12px' }} />
                <div style={{ color: colors.text, fontWeight: 600 }}>{scanType.type}</div>
                <div style={{ color: colors.textSecondary, fontSize: '12px' }}>{scanType.desc}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setIsScanning(true); setScanProgress(0); }}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Play size={18} /> Start Scan
          </button>

          {isScanning && (
            <div style={{ marginTop: '24px', padding: '20px', background: colors.bgSecondary, borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: colors.text }}>Scan Progress</span>
                <span style={{ color: colors.primary }}>{scanProgress}%</span>
              </div>
              <div style={{ height: '8px', background: colors.border, borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${scanProgress}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', transition: 'width 0.3s' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '12px', color: colors.textSecondary }}>
                <span>Host Discovery</span>
                <span>Port Scan</span>
                <span>Service Detection</span>
                <span>Vulnerability Check</span>
                <span>Report Generation</span>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'schedule' && (
        <div style={cardStyle}>
          <h3 style={{ color: colors.text, marginBottom: '20px' }}>Scheduled Scans</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Weekly External Scan', schedule: 'Every Monday 02:00', enabled: true },
              { name: 'Daily Internal Scan', schedule: 'Daily 03:00', enabled: true },
              { name: 'Monthly Compliance', schedule: '1st of month 01:00', enabled: false }
            ].map((task, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: colors.bgSecondary, borderRadius: '8px' }}>
                <div>
                  <div style={{ color: colors.text, fontWeight: 600 }}>{task.name}</div>
                  <div style={{ color: colors.textSecondary, fontSize: '14px' }}>{task.schedule}</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                  <input type="checkbox" checked={task.enabled} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{ position: 'absolute', inset: 0, background: task.enabled ? '#6366f1' : colors.border, borderRadius: '26px', transition: '0.3s' }}>
                    <span style={{ position: 'absolute', left: task.enabled ? '26px' : '2px', top: '2px', width: '22px', height: '22px', background: 'white', borderRadius: '50%', transition: '0.3s' }}></span>
                  </span>
                </label>
              </div>
            ))}
          </div>
          <button style={{ marginTop: '20px', width: '100%', padding: '12px', background: colors.bgSecondary, border: `1px dashed ${colors.border}`, borderRadius: '8px', color: colors.textSecondary, cursor: 'pointer' }}>
            + Add Schedule
          </button>
        </div>
      )}
    </div>
  );
};

export default Scanner;
