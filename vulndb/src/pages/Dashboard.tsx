import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { AreaChart, Area, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, Shield, ExternalLink } from 'lucide-react';
import { vulnerabilities, dashboardTrends, severityDistribution, statusDistribution, activityEvents } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { colors } = useTheme();

  const criticalVulns = vulnerabilities.filter(v => v.severity === 'Critical' && v.hasExploit);

  const kpiCards = [
    { title: 'Total Vulnerabilities', value: vulnerabilities.length, icon: Shield, color: '#6366f1' },
    { title: 'Critical', value: vulnerabilities.filter(v => v.severity === 'Critical').length, icon: AlertTriangle, color: '#ef4444' },
    { title: 'Resolved This Month', value: 24, icon: CheckCircle, color: '#22c55e' },
    { title: 'Avg. Time to Resolve', value: '5.2 days', icon: Clock, color: '#f97316' }
  ];

  const cardStyle: React.CSSProperties = {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '20px'
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {kpiCards.map((kpi, index) => (
          <div key={index} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <kpi.icon size={24} color={kpi.color} />
              <span style={{ color: colors.textSecondary, fontSize: '14px' }}>{kpi.title}</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: colors.text }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div style={cardStyle}>
          <h3 style={{ color: colors.text, marginBottom: '16px' }}>Detection vs Resolution Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dashboardTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" stroke={colors.textSecondary} />
              <YAxis stroke={colors.textSecondary} />
              <Tooltip 
                contentStyle={{ background: colors.bgSecondary, border: `1px solid ${colors.border}` }}
                labelStyle={{ color: colors.text }}
              />
              <Area type="monotone" dataKey="detected" stroke="#6366f1" fill="rgba(99,102,241,0.2)" />
              <Area type="monotone" dataKey="resolved" stroke="#22c55e" fill="rgba(34,197,94,0.2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h3 style={{ color: colors.text, marginBottom: '16px' }}>Severity Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={severityDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                {severityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: colors.bgSecondary, border: `1px solid ${colors.border}` }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
            {severityDistribution.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: colors.textSecondary }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: item.color }}></div>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div style={cardStyle}>
          <h3 style={{ color: colors.text, marginBottom: '16px' }}>Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="name" stroke={colors.textSecondary} tick={{fontSize: 12}} />
              <YAxis stroke={colors.textSecondary} />
              <Tooltip contentStyle={{ background: colors.bgSecondary, border: `1px solid ${colors.border}` }} />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h3 style={{ color: colors.text, marginBottom: '16px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activityEvents.slice(0, 5).map((event) => (
              <div key={event.id} style={{ display: 'flex', gap: '12px', padding: '12px', background: `rgba(${colors.bgSecondary}, 0.5)`, borderRadius: '8px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: colors.text, fontSize: '14px', marginBottom: '4px' }}>{event.description}</p>
                  <p style={{ color: colors.textSecondary, fontSize: '12px' }}>{event.time} • {event.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Vulnerabilities Requiring Immediate Attention */}
      <div style={cardStyle}>
        <h3 style={{ color: '#ef4444', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={20} /> Require Immediate Attention
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {criticalVulns.map((vuln) => (
            <div key={vuln.id} style={{ 
              padding: '16px', 
              background: 'rgba(239,68,68,0.1)', 
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                <span style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '14px' }}>{vuln.cveId}</span>
                <span style={{ 
                  padding: '4px 8px', 
                  background: '#ef4444', 
                  color: 'white', 
                  borderRadius: '4px', 
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  {vuln.cvss}
                </span>
              </div>
              <h4 style={{ color: colors.text, fontSize: '14px', marginBottom: '8px' }}>{vuln.title}</h4>
              <p style={{ color: colors.textSecondary, fontSize: '12px', marginBottom: '12px' }}>{vuln.description}</p>
              {vuln.hasExploit && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '12px' }}>
                  <ExternalLink size={14} />
                  Exploit Available
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
