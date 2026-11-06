// Marketing copy. Every claim here maps to a shipped TeamTuned module; keep it that way.

export const stories = [
  {
    key: 'punch',
    at: 564,
    screen: '/screens/phone-checkin.webp',
    eyebrow: 'Face check-in',
    title: 'Attendance nobody can fake.',
    body: 'Employees check in with a selfie. Face recognition matches it to their registered face, checks liveness, confirms they are inside the geofence and on their registered phone. Proxy attendance stops on day one.',
    points: ['Face match with liveness check', 'Geofence, site, field or remote modes', 'One registered phone per employee'],
    alt: 'Face check-in screen with face matched, inside geofence and registered device checks',
  },
  {
    key: 'tracking',
    at: 665,
    screen: '/screens/phone-tracking.webp',
    eyebrow: 'Live tracking',
    title: 'See your field team. Live.',
    body: 'Routes, stops, visits and kilometres are recorded in the background, even with the app closed. Replay any day on a timeline and see who is on site, moving or out of signal.',
    points: ['Live map with site geofences', 'Day timeline with route replay', 'Field visits with photos and notes'],
    alt: 'Live tracking screen with a field employee route, visits and distance',
  },
  {
    key: 'leave',
    at: 810,
    screen: '/screens/phone-leave.webp',
    eyebrow: 'Leave & holidays',
    title: 'Leave in two taps.',
    body: 'Live balances that explain themselves, policies that accrue, carry forward and prorate on their own, and holiday calendars per company, region or site. No more spreadsheets for HR.',
    points: ['Accrual, carry-forward and encashment rules', 'Optional and regional holidays', 'Comp-off and flexible weekly days off'],
    alt: 'Leave screen with live balances and a leave request',
  },
  {
    key: 'approvals',
    at: 940,
    screen: '/screens/phone-approvals.webp',
    eyebrow: 'Approvals',
    title: 'Approve anything. Anywhere.',
    body: 'Leave, attendance corrections, expenses, advances, rosters and onboarding all land in one inbox. Build multi-level flows by role, team or amount, and approve from your phone.',
    points: ['Multi-level, rule-based flows', 'Approve or reject in one tap', 'Full audit trail of every decision'],
    alt: 'Approvals inbox with leave, attendance and expense requests',
  },
  {
    key: 'tasks',
    at: 1090,
    screen: '/screens/phone-tasks.webp',
    eyebrow: 'Work',
    title: 'Tasks, meetings and daily reports.',
    body: 'Assign tasks with forms and checklists, record minutes of meeting with sign-off, and collect daily progress reports from every team. In six languages.',
    points: ['Tasks with custom forms', 'Minutes of meeting with decisions and actions', 'Daily progress reports'],
    alt: 'My work screen with tasks, meetings and site reports',
  },
  {
    key: 'payslip',
    at: 1439,
    screen: '/screens/phone-payslip.webp',
    eyebrow: 'Payroll',
    title: 'Attendance flows straight into pay.',
    body: 'Payable days, overtime, advances, reimbursements and deductions roll into each pay run. Contributions and income tax are applied from rules and slabs you define, and every employee gets a payslip on their phone.',
    points: ['Pay runs per company and policy', 'Deduction and tax slabs you define as rules', 'Salary revisions with arrears'],
    alt: 'Payslip screen with earnings, deductions and net pay',
  },
] as const;

export const modules = [
  { icon: 'ScanFace', title: 'Attendance', body: 'Face, geofence, site and field check-in with regularisation.', href: '/face-recognition-attendance' },
  { icon: 'CalendarRange', title: 'Shifts & rosters', body: 'Shift templates, nested teams and rule-driven roster generation.', href: '/shift-roster' },
  { icon: 'Sun', title: 'Leave & holidays', body: 'Policy engine with accruals, comp-off and scoped holidays.', href: '/leave-management' },
  { icon: 'Banknote', title: 'Payroll', body: 'Pay runs, your deduction and tax rules, payslips.', href: '/attendance-payroll' },
  { icon: 'Route', title: 'Live tracking', body: 'Background location, breaks, field visits and timelines.', href: '/field-force-tracking' },
  { icon: 'Inbox', title: 'Approvals', body: 'One inbox and multi-level flows for every request.' },
  { icon: 'Receipt', title: 'Expenses & wallet', body: 'Claims with bills, employee wallets and payout queue.' },
  { icon: 'Wallet', title: 'Petty cash', body: 'Site and office cash wallets with an inward register.' },
  { icon: 'HandCoins', title: 'Salary advance', body: 'Advance types, approvals and recovery in instalments.' },
  { icon: 'Briefcase', title: 'Recruitment', body: 'Jobs, candidates, interviews and offer letters.' },
  { icon: 'UserPlus', title: 'Onboarding', body: 'Self-onboarding wizard, encrypted documents and HR review.' },
  { icon: 'Target', title: 'Performance', body: 'KPIs, OKRs, 1:1s, kudos, appraisals and nine-box.' },
  { icon: 'ClipboardCheck', title: 'Tasks & forms', body: 'Tasks with state, deadlines and custom data collection.', href: '/task-management' },
  { icon: 'NotebookPen', title: 'Meetings & reports', body: 'Minutes of meeting and daily progress reports.' },
  { icon: 'UsersRound', title: 'Contract staff', body: 'Contractor attendance, wages and report exports.' },
  { icon: 'ShieldPlus', title: 'Insurance', body: 'Plans, coverage and family members with payroll premiums.' },
  { icon: 'FileText', title: 'Document centre', body: 'Designable letter templates and on-demand PDFs.' },
  { icon: 'Building2', title: 'Multi-company', body: 'Sub-organisations, sites, grades and cost centres.' },
] as const;

export const compare = [
  ['Attendance', 'Registers, WhatsApp selfies and buddy punching', 'Face match, geofence and device lock on every check-in'],
  ['Field team', 'Phone calls asking "where are you?"', 'Live map, routes and visits recorded automatically'],
  ['Leave', 'Balances kept in Excel, disputed every month', 'Live balances that explain every credit and debit'],
  ['Payroll', 'Days of reconciling attendance before pay day', 'Attendance, advances and claims roll into the pay run'],
  ['Approvals', 'Requests lost in chats and email', 'One inbox with multi-level flows and an audit trail'],
  ['Reports', 'Paper reports that arrive late', 'Daily progress reports and minutes signed off in the app'],
] as const;

export const security = [
  { icon: 'Lock', title: 'Encrypted vault', body: 'Bank details and identity documents are encrypted at rest in a private store.' },
  { icon: 'ScanFace', title: 'Liveness checks', body: 'Face check-in rejects photos and replays, not just mismatched faces.' },
  { icon: 'Smartphone', title: 'Device lock', body: 'Each employee punches only from their registered phone.' },
  { icon: 'KeyRound', title: 'Role permissions', body: 'Fine-grained roles scoped by company, site and team.' },
  { icon: 'FileCheck2', title: 'Privacy consent', body: 'Employees accept a versioned privacy notice in the app, and each acceptance is recorded.' },
  { icon: 'History', title: 'Audit trail', body: 'Every approval and change records who did it and when.' },
] as const;

export const languages = ['English', 'हिंदी', 'मराठी', 'ગુજરાતી', 'ಕನ್ನಡ', 'తెలుగు'] as const;

export const faqs = [
  {
    q: 'What is TeamTuned?',
    a: 'TeamTuned is a proof-of-work HRMS (human resource management system) made by Waardian Private Limited. It verifies attendance with face recognition, geofencing and a registered phone, and covers shifts and rosters, leave, payroll, live field tracking, approvals, expenses, recruitment, onboarding, performance, tasks and site reports, on web, Android and iOS.',
  },
  {
    q: 'How does face check-in stop proxy attendance?',
    a: 'Each check-in matches the employee’s face against their registered face, runs a liveness check, confirms the location is inside the allowed geofence and checks that the punch comes from their registered phone.',
  },
  {
    q: 'Is live tracking always on?',
    a: 'No. Tracking runs only for employees you assign to a tracking policy, under the rules you set in that policy. Employees without a policy are never tracked.',
  },
  {
    q: 'How does payroll handle deductions and tax?',
    a: 'You set up contributions and income tax as dated rules with slabs for each company, and every pay run applies them. Attendance, overtime, advances and reimbursements flow into the pay run automatically.',
  },
  {
    q: 'We run several companies and sites. Will it fit?',
    a: 'Yes. One account can hold several companies (sub-organisations), each with their own sites, policies, payroll and approvers, while HR sees everything in one place.',
  },
  {
    q: 'Which languages does the app support?',
    a: 'The employee app is available in English, Hindi, Marathi, Gujarati, Kannada and Telugu.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a demo. We set up your company, import employees and configure policies with you, so your team can start checking in within days.',
  },
] as const;
