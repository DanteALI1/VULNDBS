import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { vulnerabilities } from '../data/mockData';
import { Search, X, AlertTriangle, Plus } from 'lucide-react';

const Vulnerabilities: React.FC = () => {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedVuln, setSelectedVuln] = useState<typeof vulnerabilities[0] | null>(null);

  const filteredVulns = vulnerabilities.filter(v => {
    const matchesSearch = v.cveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         v.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSeverity = selectedSeverity === 'all' || v.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || v.status === selectedStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f97316';
      case 'Medium': return '#eab308';
      case 'Low': return '#22c55e';
      default: return '#3b82f6';
    }
  };

  const cardStyle: React.CSSProperties = {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '24px'
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: colors.text, fontSize: '24px' }}>Vulnerabilities</h2>
        <button 
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <Plus size={18} /> Add Vulnerability
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total', value: vulnerabilities.length },
          { label: 'Critical', value: vulnerabilities.filter(v => v.severity === 'Critical').length, color: '#ef4444' },
          { label: 'High', value: vulnerabilities.filter(v => v.severity === 'High').length, color: '#f97316' },
          { label: 'Open', value: vulnerabilities.filter(v => v.status === 'Open').length, color: '#6366f1' },
          { label: 'In Progress', value: vulnerabilities.filter(v => v.status === 'In Progress').length, color: '#eab308' },
          { label: 'With Exploit', value: vulnerabilities.filter(v => v.hasExploit).length, color: '#ef4444' }
        ].map((stat, index) => (
          <div key={index} style={{ ...cardStyle, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: stat.color || colors.text }}>{stat.value}</div>
            <div style={{ color: colors.textSecondary, fontSize: '12px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ ...cardStyle, marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} color={colors.textSecondary} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by CVE, title, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                background: colors.bgSecondary,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                color: colors.text
              }}
            />
          </div>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            style={{
              padding: '12px 16px',
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              color: colors.text
            }}
          >
            <option value="all">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Info">Info</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '12px 16px',
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              color: colors.text
            }}
          >
            <option value="all">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Accepted">Accepted</option>
            <option value="False Positive">False Positive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
              <th style={{ padding: '12px', textAlign: 'left', color: colors.textSecondary }}>CVE ID</th>
              <th style={{ padding: '12px', textAlign: 'left', color: colors.textSecondary }}>Title</th>
              <th style={{ padding: '12px', textAlign: 'center', color: colors.textSecondary }}>CVSS</th>
              <th style={{ padding: '12px', textAlign: 'center', color: colors.textSecondary }}>Severity</th>
              <th style={{ padding: '12px', textAlign: 'center', color: colors.textSecondary }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'center', color: colors.textSecondary }}>Exploit</th>
            </tr>
          </thead>
          <tbody>
            {filteredVulns.map((vuln) => (
              <tr 
                key={vuln.id} 
                onClick={() => { setSelectedVuln(vuln); setShowModal(true); }}
                style={{ borderBottom: `1px solid ${colors.border}`, cursor: 'pointer' }}
              >
                <td style={{ padding: '16px 12px', color: '#6366f1', fontFamily: 'monospace' }}>{vuln.cveId}</td>
                <td style={{ padding: '16px 12px', color: colors.text }}>{vuln.title}</td>
                <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                  <span style={{ padding: '4px 12px', background: getSeverityColor(vuln.severity), color: 'white', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>{vuln.cvss}</span>
                </td>
                <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                  <span style={{ color: getSeverityColor(vuln.severity) }}>{vuln.severity}</span>
                </td>
                <td style={{ padding: '16px 12px', textAlign: 'center', color: colors.textSecondary }}>{vuln.status}</td>
                <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                  {vuln.hasExploit ? <AlertTriangle size={16} color="#ef4444" style={{ margin: '0 auto' }} /> : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedVuln && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowModal(false)}
        >
          <div 
            style={{ ...cardStyle, maxWidth: '600px', maxHeight: '80vh', overflow: 'auto', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <span style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '16px' }}>{selectedVuln.cveId}</span>
              <span style={{ padding: '6px 12px', background: getSeverityColor(selectedVuln.severity), color: 'white', borderRadius: '6px', fontSize: '14px', fontWeight: 600 }}>{selectedVuln.cvss}</span>
            </div>
            <h3 style={{ color: colors.text, marginBottom: '16px' }}>{selectedVuln.title}</h3>
            <p style={{ color: colors.textSecondary, marginBottom: '20px', lineHeight: 1.6 }}>{selectedVuln.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div><span style={{ color: colors.textSecondary, fontSize: '12px' }}>Vendor:</span><br/><span style={{ color: colors.text }}>{selectedVuln.vendor}</span></div>
              <div><span style={{ color: colors.textSecondary, fontSize: '12px' }}>Product:</span><br/><span style={{ color: colors.text }}>{selectedVuln.product}</span></div>
              <div><span style={{ color: colors.textSecondary, fontSize: '12px' }}>Status:</span><br/><span style={{ color: colors.text }}>{selectedVuln.status}</span></div>
              <div><span style={{ color: colors.textSecondary, fontSize: '12px' }}>Assigned To:</span><br/><span style={{ color: colors.text }}>{selectedVuln.assignedTo}</span></div>
            </div>
            {selectedVuln.hasExploit && (
              <div style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} /> Public exploit available for this vulnerability
              </div>
            )}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ color: colors.textSecondary, fontSize: '12px', display: 'block', marginBottom: '8px' }}>Affected Software:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedVuln.affectedSoftware.map((sw, i) => (
                  <span key={i} style={{ padding: '4px 12px', background: colors.bgSecondary, border: `1px solid ${colors.border}`, borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px', color: colors.text }}>{sw}</span>
                ))}
              </div>
            </div>
            <div>
              <span style={{ color: colors.textSecondary, fontSize: '12px', display: 'block', marginBottom: '8px' }}>Tags:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedVuln.tags.map((tag, i) => (
                  <span key={i} style={{ padding: '4px 12px', background: 'rgba(99,102,241,0.1)', borderRadius: '4px', fontSize: '12px', color: '#6366f1' }}>#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vulnerabilities;
