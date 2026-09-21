import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download } from 'lucide-react';
import { mttrData, vendorData, severityDistribution } from '../data/mockData';

const Reports: React.FC = () => {
  const { colors } = useTheme();
  const [period, setPeriod] = useState('Month');
  const [reportType, setReportType] = useState<'overview' | 'mttr' | 'vendors' | 'trends'>('overview');

  const cardStyle: React.CSSProperties = {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '24px'
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Week', 'Month', 'Quarter', 'Year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '8px 16px',
                background: period === p ? colors.primary : colors.bgSecondary,
                border: 'none',
                borderRadius: '6px',
                color: period === p ? 'white' : colors.text,
                cursor: 'pointer'
              }}
            >
              {p}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['PDF', 'CSV', 'JSON', 'HTML'].map((format) => (
            <button
              key={format}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: colors.bgSecondary,
                border: `1px solid ${colors.border}`,
                borderRadius: '6px',
                color: colors.text,
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              <Download size={14} /> {format}
            </button>
          ))}
        </div>
      </div>

      {/* Report Type Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'mttr', label: 'MTTR Analysis' },
          { id: 'vendors', label: 'By Vendor' },
          { id: 'trends', label: 'Trends' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setReportType(tab.id as typeof reportType)}
            style={{
              padding: '10px 20px',
              background: reportType === tab.id ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : colors.bgSecondary,
              border: 'none',
              borderRadius: '8px',
              color: reportType === tab.id ? 'white' : colors.text,
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {reportType === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
            {[
              { label: 'Total Vulnerabilities', value: '138', color: '#6366f1' },
              { label: 'Average CVSS', value: '7.2', color: '#f97316' },
              { label: 'Critical Issues', value: '12', color: '#ef4444' },
              { label: 'Resolved This Period', value: '45', color: '#22c55e' },
              { label: 'Open Issues', value: '42', color: '#eab308' },
              { label: 'False Positives', value: '8', color: '#3b82f6' }
            ].map((metric, index) => (
              <div key={index} style={{ ...cardStyle, borderLeft: `4px solid ${metric.color}` }}>
                <div style={{ color: colors.textSecondary, fontSize: '14px', marginBottom: '8px' }}>{metric.label}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: metric.color }}>{metric.value}</div>
              </div>
            ))}
          </div>
          <div style={cardStyle}>
            <h3 style={{ color: colors.text, marginBottom: '16px' }}>Top Vulnerable Software</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {[
                { name: 'Jenkins', count: 15 },
                { name: 'Apache HTTP Server', count: 12 },
                { name: 'Microsoft Office', count: 10 },
                { name: 'Cisco ASA', count: 8 }
              ].map((sw, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: colors.bgSecondary, borderRadius: '8px' }}>
                  <span style={{ color: colors.text }}>{sw.name}</span>
                  <span style={{ color: colors.primary, fontWeight: 600 }}>{sw.count} vulnerabilities</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {reportType === 'mttr' && (
        <div style={cardStyle}>
          <h3 style={{ color: colors.text, marginBottom: '16px' }}>Mean Time to Resolve by Severity</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mttrData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" stroke={colors.textSecondary} />
              <YAxis stroke={colors.textSecondary} label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
              <Tooltip contentStyle={{ background: colors.bgSecondary, border: `1px solid ${colors.border}` }} />
              <Legend />
              <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name="Critical" />
              <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} name="High" />
              <Line type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={2} name="Medium" />
              <Line type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={2} name="Low" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: '24px', marginTop: '20px', padding: '16px', background: colors.bgSecondary, borderRadius: '8px' }}>
            <div><span style={{ color: colors.textSecondary }}>SLA Target (Critical):</span> <span style={{ color: '#ef4444', fontWeight: 600 }}>3 days</span></div>
            <div><span style={{ color: colors.textSecondary }}>Current Avg:</span> <span style={{ color: '#22c55e', fontWeight: 600 }}>1.8 days</span></div>
            <div><span style={{ color: colors.textSecondary }}>Status:</span> <span style={{ color: '#22c55e', fontWeight: 600 }}>Within SLA</span></div>
          </div>
        </div>
      )}

      {reportType === 'vendors' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div style={cardStyle}>
            <h3 style={{ color: colors.text, marginBottom: '16px' }}>Vulnerabilities by Vendor</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={vendorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis type="number" stroke={colors.textSecondary} />
                <YAxis dataKey="name" type="category" stroke={colors.textSecondary} width={80} />
                <Tooltip contentStyle={{ background: colors.bgSecondary, border: `1px solid ${colors.border}` }} />
                <Legend />
                <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
                <Bar dataKey="high" stackId="a" fill="#f97316" name="High" />
                <Bar dataKey="medium" stackId="a" fill="#eab308" name="Medium" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={cardStyle}>
            <h3 style={{ color: colors.text, marginBottom: '16px' }}>Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={[{name:'Open',value:42},{name:'In Progress',value:28},{name:'Resolved',value:65}]} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                  <Cell fill="#6366f1" />
                  <Cell fill="#eab308" />
                  <Cell fill="#22c55e" />
                </Pie>
                <Tooltip contentStyle={{ background: colors.bgSecondary, border: `1px solid ${colors.border}` }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {reportType === 'trends' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div style={cardStyle}>
            <h3 style={{ color: colors.text, marginBottom: '16px' }}>Detection vs Resolution Trends</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={[{month:'Jan',detected:45,resolved:38},{month:'Feb',detected:52,resolved:41},{month:'Mar',detected:38,resolved:45},{month:'Apr',detected:61,resolved:52},{month:'May',detected:48,resolved:55},{month:'Jun',detected:55,resolved:48}]}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis dataKey="month" stroke={colors.textSecondary} />
                <YAxis stroke={colors.textSecondary} />
                <Tooltip contentStyle={{ background: colors.bgSecondary, border: `1px solid ${colors.border}` }} />
                <Legend />
                <Bar dataKey="detected" fill="#6366f1" name="Detected" />
                <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={cardStyle}>
            <h3 style={{ color: colors.text, marginBottom: '16px' }}>Severity Breakdown</h3>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
