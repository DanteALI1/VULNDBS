// Mock Data for VulnDB

export interface Vulnerability {
  id: string;
  cveId: string;
  cvss: number;
  title: string;
  description: string;
  vendor: string;
  product: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Accepted' | 'False Positive';
  affectedSoftware: string[];
  tags: string[];
  discoveredDate: string;
  assignedTo: string;
  links: string[];
  hasExploit: boolean;
}

export interface ScanResult {
  id: string;
  target: string;
  host: string;
  status: 'completed' | 'running' | 'queued';
  totalFound: number;
  severity: { critical: number; high: number; medium: number; low: number; info: number };
  date: string;
}

export interface Notification {
  id: string;
  type: 'error' | 'info' | 'warning' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface ActivityEvent {
  id: string;
  type: string;
  description: string;
  time: string;
  user: string;
}

export const vulnerabilities: Vulnerability[] = [
  {
    id: '1',
    cveId: 'CVE-2024-3094',
    cvss: 10.0,
    title: 'XZ Utils Backdoor',
    description: 'Malicious code in XZ Utils library affecting SSH and systemd components.',
    vendor: 'XZ Utils',
    product: 'liblzma',
    severity: 'Critical',
    status: 'Open',
    affectedSoftware: ['ssh', 'systemd', 'linux-kernel'],
    tags: ['backdoor', 'supply-chain', 'remote-code-execution'],
    discoveredDate: '2024-03-29',
    assignedTo: 'SOC Team',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-3094'],
    hasExploit: true
  },
  {
    id: '2',
    cveId: 'CVE-2024-21762',
    cvss: 9.8,
    title: 'FortiOS SSL VPN RCE',
    description: 'Remote code execution vulnerability in FortiOS SSL VPN.',
    vendor: 'Fortinet',
    product: 'FortiOS',
    severity: 'Critical',
    status: 'In Progress',
    affectedSoftware: ['fortios', 'ssl-vpn'],
    tags: ['rce', 'network', 'vpn'],
    discoveredDate: '2024-02-01',
    assignedTo: 'Network Team',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21762'],
    hasExploit: true
  },
  {
    id: '3',
    cveId: 'CVE-2024-1709',
    cvss: 10.0,
    title: 'ScreenConnect Auth Bypass',
    description: 'Authentication bypass vulnerability in ScreenConnect remote access software.',
    vendor: 'ConnectWise',
    product: 'ScreenConnect',
    severity: 'Critical',
    status: 'Resolved',
    affectedSoftware: ['screenconnect', 'remote-access'],
    tags: ['auth-bypass', 'remote-access'],
    discoveredDate: '2024-02-15',
    assignedTo: 'IR Team',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-1709'],
    hasExploit: true
  },
  {
    id: '4',
    cveId: 'CVE-2024-27198',
    cvss: 9.8,
    title: 'TeamCity Auth Bypass',
    description: 'Authentication bypass in JetBrains TeamCity allowing unauthorized access.',
    vendor: 'JetBrains',
    product: 'TeamCity',
    severity: 'Critical',
    status: 'Open',
    affectedSoftware: ['teamcity', 'ci-cd'],
    tags: ['auth-bypass', 'devops'],
    discoveredDate: '2024-03-05',
    assignedTo: 'DevSecOps',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-27198'],
    hasExploit: true
  },
  {
    id: '5',
    cveId: 'CVE-2024-3400',
    cvss: 10.0,
    title: 'PAN-OS Command Injection',
    description: 'Command injection vulnerability in Palo Alto Networks PAN-OS.',
    vendor: 'Palo Alto',
    product: 'PAN-OS',
    severity: 'Critical',
    status: 'In Progress',
    affectedSoftware: ['pan-os', 'firewall'],
    tags: ['command-injection', 'network-security'],
    discoveredDate: '2024-04-12',
    assignedTo: 'Network Team',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-3400'],
    hasExploit: true
  },
  {
    id: '6',
    cveId: 'CVE-2024-20353',
    cvss: 9.8,
    title: 'Cisco ASA WebVPN RCE',
    description: 'Remote code execution in Cisco ASA and FTD WebVPN.',
    vendor: 'Cisco',
    product: 'ASA/FTD',
    severity: 'Critical',
    status: 'Open',
    affectedSoftware: ['cisco-asa', 'ftd', 'webvpn'],
    tags: ['rce', 'network'],
    discoveredDate: '2024-05-01',
    assignedTo: 'Network Team',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-20353'],
    hasExploit: false
  },
  {
    id: '7',
    cveId: 'CVE-2024-2961',
    cvss: 8.8,
    title: 'Bouncy Castle TLS DoS',
    description: 'Denial of service in Bouncy Castle TLS implementation.',
    vendor: 'Bouncy Castle',
    product: 'bc-java',
    severity: 'High',
    status: 'Resolved',
    affectedSoftware: ['bouncy-castle', 'java', 'tls'],
    tags: ['dos', 'cryptography'],
    discoveredDate: '2024-04-20',
    assignedTo: 'AppSec Team',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-2961'],
    hasExploit: false
  },
  {
    id: '8',
    cveId: 'CVE-2024-22243',
    cvss: 7.5,
    title: 'Spring Framework DoS',
    description: 'Denial of service vulnerability in Spring Framework.',
    vendor: 'VMware',
    product: 'Spring Framework',
    severity: 'High',
    status: 'In Progress',
    affectedSoftware: ['spring', 'java'],
    tags: ['dos', 'framework'],
    discoveredDate: '2024-03-15',
    assignedTo: 'DevSecOps',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-22243'],
    hasExploit: false
  },
  {
    id: '9',
    cveId: 'CVE-2024-32002',
    cvss: 7.8,
    title: 'Rust Cargo Symlink Attack',
    description: 'Symlink attack vulnerability in Rust Cargo package manager.',
    vendor: 'Rust',
    product: 'Cargo',
    severity: 'High',
    status: 'Accepted',
    affectedSoftware: ['rust', 'cargo'],
    tags: ['supply-chain', 'symlink'],
    discoveredDate: '2024-05-10',
    assignedTo: 'DevSecOps',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-32002'],
    hasExploit: false
  },
  {
    id: '10',
    cveId: 'CVE-2024-29824',
    cvss: 6.5,
    title: 'SolarWinds Platform XSS',
    description: 'Cross-site scripting in SolarWinds Platform.',
    vendor: 'SolarWinds',
    product: 'Platform',
    severity: 'Medium',
    status: 'Open',
    affectedSoftware: ['solarwinds', 'monitoring'],
    tags: ['xss', 'web'],
    discoveredDate: '2024-04-25',
    assignedTo: 'AppSec Team',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-29824'],
    hasExploit: false
  },
  {
    id: '11',
    cveId: 'CVE-2024-26032',
    cvss: 5.3,
    title: 'Jenkins Information Disclosure',
    description: 'Information disclosure vulnerability in Jenkins.',
    vendor: 'Jenkins',
    product: 'Jenkins',
    severity: 'Medium',
    status: 'Resolved',
    affectedSoftware: ['jenkins', 'ci-cd'],
    tags: ['info-disclosure', 'devops'],
    discoveredDate: '2024-03-20',
    assignedTo: 'DevSecOps',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-26032'],
    hasExploit: false
  },
  {
    id: '12',
    cveId: 'CVE-2024-25166',
    cvss: 4.3,
    title: 'D-Link Router Information Leak',
    description: 'Information leakage in D-Link router firmware.',
    vendor: 'D-Link',
    product: 'DIR Series',
    severity: 'Low',
    status: 'Open',
    affectedSoftware: ['d-link', 'router'],
    tags: ['info-leak', 'iot'],
    discoveredDate: '2024-02-28',
    assignedTo: 'Network Team',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-25166'],
    hasExploit: false
  },
  {
    id: '13',
    cveId: 'CVE-2024-21410',
    cvss: 9.8,
    title: 'Microsoft Outlook RCE',
    description: 'Remote code execution in Microsoft Outlook.',
    vendor: 'Microsoft',
    product: 'Outlook',
    severity: 'Critical',
    status: 'In Progress',
    affectedSoftware: ['outlook', 'office'],
    tags: ['rce', 'email'],
    discoveredDate: '2024-02-13',
    assignedTo: 'Endpoint Team',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21410'],
    hasExploit: true
  },
  {
    id: '14',
    cveId: 'CVE-2024-0519',
    cvss: 7.5,
    title: 'Chrome V8 Out-of-Bounds Read',
    description: 'Out-of-bounds memory read in Chrome V8 engine.',
    vendor: 'Google',
    product: 'Chrome',
    severity: 'High',
    status: 'Resolved',
    affectedSoftware: ['chrome', 'v8'],
    tags: ['memory', 'browser'],
    discoveredDate: '2024-01-23',
    assignedTo: 'Endpoint Team',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-0519'],
    hasExploit: false
  },
  {
    id: '15',
    cveId: 'CVE-2024-23897',
    cvss: 7.5,
    title: 'Jenkins Arbitrary File Read',
    description: 'Arbitrary file read vulnerability in Jenkins CLI.',
    vendor: 'Jenkins',
    product: 'Jenkins CLI',
    severity: 'High',
    status: 'False Positive',
    affectedSoftware: ['jenkins', 'cli'],
    tags: ['file-read', 'devops'],
    discoveredDate: '2024-01-24',
    assignedTo: 'DevSecOps',
    links: ['https://nvd.nist.gov/vuln/detail/CVE-2024-23897'],
    hasExploit: false
  }
];

export const scanResults: ScanResult[] = [
  {
    id: '1',
    target: '192.168.1.0/24',
    host: '192.168.1.100',
    status: 'completed',
    totalFound: 23,
    severity: { critical: 2, high: 5, medium: 8, low: 6, info: 2 },
    date: '2024-06-15 14:30'
  },
  {
    id: '2',
    target: 'web-server-prod',
    host: '10.0.0.50',
    status: 'completed',
    totalFound: 15,
    severity: { critical: 1, high: 3, medium: 5, low: 4, info: 2 },
    date: '2024-06-14 09:15'
  },
  {
    id: '3',
    target: 'database-cluster',
    host: '10.0.1.0/24',
    status: 'running',
    totalFound: 8,
    severity: { critical: 0, high: 2, medium: 3, low: 2, info: 1 },
    date: '2024-06-15 16:00'
  },
  {
    id: '4',
    target: 'external-perimeter',
    host: '203.0.113.0/24',
    status: 'completed',
    totalFound: 31,
    severity: { critical: 3, high: 7, medium: 10, low: 8, info: 3 },
    date: '2024-06-13 22:00'
  },
  {
    id: '5',
    target: 'cloud-infrastructure',
    host: 'AWS-VPC-Main',
    status: 'queued',
    totalFound: 0,
    severity: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
    date: '2024-06-16 02:00'
  },
  {
    id: '6',
    target: 'internal-network',
    host: '172.16.0.0/16',
    status: 'completed',
    totalFound: 45,
    severity: { critical: 1, high: 8, medium: 15, low: 12, info: 9 },
    date: '2024-06-12 18:45'
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'error',
    title: 'Critical Vulnerability Detected',
    message: 'CVE-2024-3094 (XZ Utils) detected on production servers',
    time: '5 min ago',
    read: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Scan Failed',
    message: 'Weekly perimeter scan failed - connection timeout',
    time: '1 hour ago',
    read: false
  },
  {
    id: '3',
    type: 'success',
    title: 'Patch Applied',
    message: 'Security patch KB5034441 successfully deployed',
    time: '3 hours ago',
    read: true
  },
  {
    id: '4',
    type: 'info',
    title: 'New CVE Published',
    message: 'NIST published 15 new CVEs in the last 24 hours',
    time: '5 hours ago',
    read: true
  },
  {
    id: '5',
    type: 'error',
    title: 'Exploit Available',
    message: 'Public exploit released for CVE-2024-21762',
    time: '1 day ago',
    read: false
  }
];

export const activityEvents: ActivityEvent[] = [
  { id: '1', type: 'vulnerability', description: 'New critical vulnerability added: CVE-2024-3094', time: '10 min ago', user: 'System' },
  { id: '2', type: 'scan', description: 'Network scan completed: 23 vulnerabilities found', time: '25 min ago', user: 'Scanner' },
  { id: '3', type: 'status', description: 'CVE-2024-1709 status changed to Resolved', time: '1 hour ago', user: 'John Smith' },
  { id: '4', type: 'user', description: 'New user registered: alice@company.com', time: '2 hours ago', user: 'Admin' },
  { id: '5', type: 'report', description: 'Monthly security report generated', time: '3 hours ago', user: 'System' },
  { id: '6', type: 'integration', description: 'SIEM integration sync completed', time: '4 hours ago', user: 'System' },
  { id: '7', type: 'vulnerability', description: 'CVSS score updated for CVE-2024-27198', time: '5 hours ago', user: 'Analyst' },
  { id: '8', type: 'scan', description: 'Scheduled scan started: External Perimeter', time: '6 hours ago', user: 'Scheduler' }
];

export const dashboardTrends = [
  { month: 'Jan', detected: 45, resolved: 38 },
  { month: 'Feb', detected: 52, resolved: 41 },
  { month: 'Mar', detected: 38, resolved: 45 },
  { month: 'Apr', detected: 61, resolved: 52 },
  { month: 'May', detected: 48, resolved: 55 },
  { month: 'Jun', detected: 55, resolved: 48 }
];

export const severityDistribution = [
  { name: 'Critical', value: 12, color: '#ef4444' },
  { name: 'High', value: 28, color: '#f97316' },
  { name: 'Medium', value: 45, color: '#eab308' },
  { name: 'Low', value: 35, color: '#22c55e' },
  { name: 'Info', value: 18, color: '#3b82f6' }
];

export const statusDistribution = [
  { name: 'Open', value: 42 },
  { name: 'In Progress', value: 28 },
  { name: 'Resolved', value: 65 },
  { name: 'Accepted', value: 12 },
  { name: 'False Positive', value: 8 }
];

export const mttrData = [
  { month: 'Jan', critical: 2.5, high: 5.2, medium: 12.5, low: 25.0 },
  { month: 'Feb', critical: 2.8, high: 4.8, medium: 11.2, low: 22.5 },
  { month: 'Mar', critical: 2.2, high: 4.5, medium: 10.8, low: 20.0 },
  { month: 'Apr', critical: 1.9, high: 4.2, medium: 9.5, low: 18.5 },
  { month: 'May', critical: 2.0, high: 3.8, medium: 8.2, low: 16.0 },
  { month: 'Jun', critical: 1.8, high: 3.5, medium: 7.5, low: 14.5 }
];

export const vendorData = [
  { name: 'Microsoft', critical: 8, high: 15, medium: 22 },
  { name: 'Cisco', critical: 5, high: 12, medium: 18 },
  { name: 'Apache', critical: 3, high: 10, medium: 25 },
  { name: 'Oracle', critical: 4, high: 8, medium: 15 },
  { name: 'Linux', critical: 6, high: 14, medium: 20 }
];
