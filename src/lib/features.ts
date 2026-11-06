// One landing page per search intent. Every claim maps to a shipped TeamTuned module; keep it that way.
// No invented customers, numbers or countries. Say "demo", never "free demo" or a demo length.

export type FeaturePage = {
  slug: string;
  /** <title>, 60 characters or fewer. */
  title: string;
  /** Meta description, 155 characters or fewer. */
  description: string;
  updated: string;
  eyebrow: string;
  h1: string;
  /** First paragraph: a plain definition an answer engine can quote on its own. */
  lede: string;
  screen: { src: string; alt: string; w: number; h: number };
  sections: Array<{ h2: string; body: string; points?: string[] }>;
  steps: { h2: string; items: Array<[string, string]> };
  faqs: Array<{ q: string; a: string }>;
  related: string[];
};

const PHONE = { w: 838, h: 1756 };

export const features: FeaturePage[] = [
  {
    slug: 'face-recognition-attendance',
    title: 'Face Recognition Attendance App with Liveness | TeamTuned',
    description:
      'Stop proxy attendance. TeamTuned checks face, liveness, location and the registered phone on every check-in, then feeds leave and payroll.',
    updated: '2026-11-02',
    eyebrow: 'Face recognition attendance',
    h1: 'Face recognition attendance that can’t be faked.',
    lede:
      'TeamTuned’s face recognition attendance verifies every check-in four ways: the employee’s face, a liveness check, their location and their registered phone. Each verified punch (a check-in or check-out) then flows into shifts, leave and payroll, so nobody has to re-check attendance before pay day.',
    screen: { src: '/screens/phone-checkin.webp', alt: 'TeamTuned face check-in with face matched, liveness passed, inside geofence and registered device', ...PHONE },
    sections: [
      {
        h2: 'Why registers, cards and selfies on chat don’t work',
        body:
          'Paper registers can be signed by anyone. Cards and PINs can be shared. A selfie sent on a chat app proves nothing about where or when it was taken. The result is proxy attendance: one person marks attendance for another, and you pay for hours nobody worked. TeamTuned replaces trust with checks that run on every single punch.',
      },
      {
        h2: 'Four checks on every check-in',
        body: 'The employee opens the app and takes a selfie. Before the punch is saved, TeamTuned confirms:',
        points: [
          'Face match: the selfie is compared with the face the employee registered.',
          'Liveness: photos of photos, screens and replays are rejected, not just different faces.',
          'Location: the phone must be inside an allowed geofence, or follow the location rule set for that employee.',
          'Registered phone: the punch must come from the employee’s own registered device.',
        ],
      },
      {
        h2: 'Registered once, from three angles',
        body:
          'Each employee registers their face once, from the front and both sides. The face data is kept in private storage and used only to verify attendance. When an employee leaves the company, their face registration is deleted.',
      },
      {
        h2: 'Location rules that fit how each person works',
        body:
          'Not everyone works at one desk. For each employee you choose how location is checked, from their own sites only to open check-in for remote staff (the six rules are explained on the geofence attendance page). Office, site, field and remote teams all use the same app. The location is checked again on our server, and check-ins from a phone running a mock-location app are blocked.',
      },
      {
        h2: 'On the phones your team already has',
        body:
          'TeamTuned runs on Android phones and on iPhones with iOS 16 or later, so there is no biometric device to buy, mount or maintain at each entrance. The employee app is available in six languages, and managers and HR work on the web.',
      },
      {
        h2: 'From the punch to the payslip',
        body:
          'Verified punches build each employee’s day against their shift: late marks, half days and overtime are worked out for you. Missed punches and corrections go through the approvals inbox, with a record of who approved what. Payable days then flow into the pay run with leave and holidays, so payroll starts from attendance you can trust.',
      },
    ],
    steps: {
      h2: 'Going live with face check-in',
      items: [
        ['Set up sites and rules', 'Add your sites with their geofences and pick a location rule for each team.'],
        ['Employees register', 'Each person installs the app on their phone, registers their face and that phone.'],
        ['Check in from day one', 'Every punch is verified and lands in attendance, leave and payroll automatically.'],
      ],
    },
    faqs: [
      {
        q: 'Do we need special hardware for face attendance?',
        a: 'No. Employees check in from the TeamTuned app on their own Android or iPhone. There is no biometric device to buy, install or maintain at each site.',
      },
      {
        q: 'Can someone check in with a photo of a colleague?',
        a: 'No. Every check-in runs a liveness check that rejects photos, screens and replays, and the punch must also come from the employee’s own registered phone.',
      },
      {
        q: 'What happens if a check-in fails?',
        a: 'The punch is not recorded. If the employee was genuinely at work, they can request a correction, which their manager approves or rejects, and the decision is kept on record.',
      },
      {
        q: 'What happens to face data when someone leaves?',
        a: 'When an employee is marked as exited or deleted, their face registration is removed. Face data is used only to verify attendance.',
      },
      {
        q: 'Can employees fake their location?',
        a: 'Check-ins from a phone running a mock-location app are blocked, or marked for review if the employee is on the flagged rule. The location is also checked on our server, not only in the app.',
      },
      {
        q: 'Does it work for field and remote staff?',
        a: 'Yes. Location rules are set per employee, from fixed sites to approved other locations or open check-in for remote staff, while face match, liveness and the registered phone are still checked.',
      },
    ],
    related: ['geofence-attendance', 'field-force-tracking', 'attendance-payroll'],
  },
  {
    slug: 'geofence-attendance',
    title: 'Geofence Attendance App for Sites & Offices | TeamTuned',
    description:
      'Employees check in only inside the boundary you draw around each site, with face match and their registered phone. Exceptions go for approval.',
    updated: '2026-11-02',
    eyebrow: 'Geofence attendance',
    h1: 'Geofence attendance for every site and office.',
    lede:
      'Geofence attendance means an employee can check in only when their phone is inside the boundary you draw around a workplace. TeamTuned adds face recognition and a registered phone to every geofenced punch, so you know it was the right person, in the right place, at the right time.',
    screen: { src: '/screens/phone-team.webp', alt: 'TeamTuned team today screen showing who is checked in at each site', ...PHONE },
    sections: [
      {
        h2: 'Why geofencing alone isn’t enough',
        body:
          'Many attendance apps stop at a GPS pin. That shows where a phone was, but not who was holding it, and location apps that fake GPS are easy to install. TeamTuned treats the geofence as one of four checks on every check-in, alongside face recognition with liveness and the registered phone.',
      },
      {
        h2: 'Draw the boundary once',
        body:
          'Add each office, site or branch on a map and draw its geofence. Then assign employees to the sites they work at. One person can belong to several sites, and each company in a group keeps its own sites.',
      },
      {
        h2: 'Six location rules, chosen per employee',
        body: 'Real teams don’t all work the same way, so the location check is a rule you choose for each person or group:',
        points: [
          'Assigned sites: check in only inside their own sites’ geofences.',
          'All sites: any of the company’s sites.',
          'Other locations: approved places outside your sites, such as a client office.',
          'Exception: outside the geofence, but with a reason that goes for approval.',
          'Flagged: allowed, but marked for a manager to review.',
          'Open: no location limit, for remote staff.',
        ],
      },
      {
        h2: 'More than a GPS pin',
        body:
          'A geofence alone proves where a phone was, not who held it. Every TeamTuned check-in also matches the employee’s face with a liveness check and confirms the punch came from their registered phone, so a colleague can’t check in on someone’s behalf.',
      },
      {
        h2: 'Fake GPS gets caught',
        body:
          'When a check-in comes from a phone running a mock-location app, TeamTuned blocks it and asks the employee to turn the app off. For people on the flagged rule, the check-in is allowed but marked so a manager can review it. The geofence and site assignment are checked again on our server, so a modified app can’t skip them.',
      },
      {
        h2: 'Light on the battery',
        body:
          'Geofence attendance checks the phone’s location only at the moment the employee checks in or out. It does not follow anyone around during the day; continuous location is a separate feature, live field tracking, which runs only for people you put on a tracking policy.',
      },
      {
        h2: 'See who is in, per site',
        body:
          'Managers see today’s team at a glance: who has checked in, who is late, who is on leave and who hasn’t arrived, site by site. HR sees the same across every company and site in one place.',
      },
      {
        h2: 'Straight into shifts, leave and pay',
        body:
          'Geofenced punches are matched to each employee’s shift and roster, so late marks, half days and overtime are calculated automatically. Corrections go through approvals, and payable days flow into the pay run.',
      },
    ],
    steps: {
      h2: 'Setting up geofence attendance',
      items: [
        ['Map your sites', 'Draw a geofence around each workplace and assign employees to their sites.'],
        ['Pick location rules', 'Choose assigned sites, all sites, other locations, exception, flagged or open per team.'],
        ['Check in', 'Employees punch from their own phone; TeamTuned checks the place, the face and the device.'],
      ],
    },
    faqs: [
      {
        q: 'What happens if an employee checks in outside the geofence?',
        a: 'It depends on their rule. With assigned sites, the punch is blocked. With the exception rule, they give a reason and it goes for approval. With the flagged rule, it is allowed and marked for review.',
      },
      {
        q: 'Can one employee work at more than one site?',
        a: 'Yes. Assign them to several sites, or use the all-sites rule so they can check in at any of the company’s locations.',
      },
      {
        q: 'Can remote employees use it too?',
        a: 'Yes. Give remote staff the open rule. They still check in with face recognition from their registered phone, without a location limit.',
      },
      {
        q: 'We have several companies. Does each keep its own sites?',
        a: 'Yes. Each company (sub-organisation) has its own sites, policies and approvers, and HR can see all of them together.',
      },
      {
        q: 'Can employees fake their GPS location?',
        a: 'Check-ins from a phone running a mock-location app are blocked, or flagged for review on the flagged rule. The geofence is also checked on our server.',
      },
      {
        q: 'Does geofence attendance drain the battery?',
        a: 'No. Location is read only when the employee checks in or out. Continuous location is a separate live tracking feature that you switch on per employee.',
      },
      {
        q: 'Which phones does it work on?',
        a: 'Android phones and iPhones with iOS 16 or later. Each employee checks in from their own registered phone.',
      },
    ],
    related: ['face-recognition-attendance', 'field-force-tracking', 'attendance-payroll'],
  },
  {
    slug: 'field-force-tracking',
    title: 'Field Force Tracking App: Live Location & Visits | TeamTuned',
    description:
      'See your field team on a live map, replay each day’s route and verify site visits with photos and notes. Tracking runs only under policies you set.',
    updated: '2026-11-02',
    eyebrow: 'Field force tracking',
    h1: 'Field force tracking with proof of every visit.',
    lede:
      'TeamTuned’s field force tracking records each field employee’s route, stops and site visits in the background during work, and shows them on a live map and a day timeline you can replay. It runs only for the people and hours you set in a tracking policy.',
    screen: { src: '/screens/phone-tracking.webp', alt: 'TeamTuned live tracking with a field employee’s route, visits and distance for the day', ...PHONE },
    sections: [
      {
        h2: 'Stop asking “where are you?”',
        body:
          'Field teams are the hardest to manage from a desk. Calls and chat messages interrupt work and still don’t prove a visit happened. TeamTuned records the day for you, so managers can see progress without chasing anyone.',
      },
      {
        h2: 'A live map of your field team',
        body:
          'See every tracked employee on one map, with your sites and their geofences drawn on it. Each person shows whether they are moving, on site or out of signal right now.',
      },
      {
        h2: 'Replay any day on a timeline',
        body:
          'Every recorded point is kept, so you can replay an employee’s route for any day: where they went, how long they stopped and the distance travelled. Breaks are recorded too, so the day adds up.',
      },
      {
        h2: 'Visits with proof',
        body: 'When a field employee visits a customer or site, the visit is recorded with:',
        points: ['The time they arrived and left, and time spent on site', 'Photos taken in the app', 'Notes about the visit'],
      },
      {
        h2: 'Easy on the battery, fine without signal',
        body: 'The recorder on the phone adapts to what the employee is doing, so tracking lasts the working day:',
        points: [
          'While the employee moves, it records a point every few seconds of movement.',
          'When they stand still, it drops to one low-power reading every few minutes.',
          'When the battery runs low, it switches to a power-saving mode.',
          'Without signal, points are kept on the phone and uploaded when the connection returns, so the route has no gaps.',
        ],
      },
      {
        h2: 'Fake locations show up',
        body:
          'If the phone starts reporting a location from a mock-location app, TeamTuned records it so managers can see it. Check-ins from a phone running such an app are blocked or flagged, depending on the employee’s location rule.',
      },
      {
        h2: 'Tracking that respects your people',
        body:
          'Tracking is not always on. It runs only for employees you assign to a tracking policy, under the rules you set in that policy. Employees without a policy are never tracked. Location is recorded in the background during work, even with the app closed, so nobody has to remember to start it.',
      },
      {
        h2: 'Connected to attendance and tasks',
        body:
          'Field employees check in with face recognition from their registered phone, under a location rule that fits field work. Tasks can ask for photos and checklists as proof, and everything lands in the same reports HR and managers already use.',
      },
    ],
    steps: {
      h2: 'Getting your field team on the map',
      items: [
        ['Create a tracking policy', 'Choose who is tracked and the rules for when tracking runs.'],
        ['Install the app', 'Field employees install TeamTuned on their phone and check in as usual.'],
        ['Watch and replay', 'See the live map, open any day’s timeline and review visits with photos and notes.'],
      ],
    },
    faqs: [
      {
        q: 'Is live tracking always on?',
        a: 'No. Tracking runs only for employees you assign to a tracking policy, under the rules you set in that policy. Employees without a policy are never tracked.',
      },
      {
        q: 'Does tracking work when the app is closed?',
        a: 'Yes. For employees under a tracking policy, location is recorded in the background during work, even when the app is closed.',
      },
      {
        q: 'Can I see where an employee was yesterday?',
        a: 'Yes. Open their day timeline to replay the route, stops, breaks, visits and distance for any day.',
      },
      {
        q: 'How do I know a visit really happened?',
        a: 'Each visit records arrival and departure times, time on site, and the photos and notes the employee adds in the app.',
      },
      {
        q: 'Does live tracking drain the phone battery?',
        a: 'It is designed not to. Tracking records often while the employee moves, drops to one low-power reading every few minutes when they stand still, and switches to a power-saving mode when the battery runs low.',
      },
      {
        q: 'What happens when there is no mobile signal?',
        a: 'Points are kept on the phone and uploaded once the connection is back, so the day’s route is still complete.',
      },
      {
        q: 'Can field staff fake their location?',
        a: 'Mock-location apps are detected. Tracking records when one is used, and check-ins from a phone running one are blocked or flagged.',
      },
    ],
    related: ['face-recognition-attendance', 'geofence-attendance', 'task-management'],
  },
  {
    slug: 'attendance-payroll',
    title: 'Attendance and Payroll Software in One App | TeamTuned',
    description:
      'Verified attendance becomes payable days, overtime and leave, and each pay run adds advances, reimbursements, deductions and payslips.',
    updated: '2026-11-02',
    eyebrow: 'Attendance & payroll',
    h1: 'Attendance and payroll software on one set of data.',
    lede:
      'TeamTuned runs attendance and payroll in one system. Verified check-ins become payable days, late marks and overtime, and each pay run picks them up together with leave, salary advances, reimbursements and the deduction and tax rules you define.',
    screen: { src: '/screens/phone-payslip.webp', alt: 'TeamTuned payslip on the employee app with earnings, deductions and net pay', ...PHONE },
    sections: [
      {
        h2: 'The pay-day spreadsheet problem',
        body:
          'When attendance and payroll live in different tools, someone spends the end of every month copying days, chasing corrections and arguing about leave balances. TeamTuned removes the copy step: payroll reads the same attendance, leave and approvals your managers already work with.',
      },
      {
        h2: 'Attendance you can pay from',
        body:
          'Every punch is verified with face recognition, location and a registered phone, then matched to the employee’s shift. Late marks, half days, overtime, leave, holidays and weekly days off are worked out per day, and corrections go through approvals before payroll uses them.',
      },
      {
        h2: 'What a month looks like',
        body:
          'Take one employee on a monthly salary (an example, not a real record). Over the month TeamTuned has recorded 21 present days, one late mark, two days of approved leave, one public holiday and four weekly days off. It has also recorded six hours of overtime approved by their manager and one unpaid absence that nobody covered from the leave balance. When the pay run opens, all of that is already counted: payable days, overtime and the unpaid day come straight from attendance, an approved travel claim and the month’s advance instalment are added, and the deduction and tax rules for their company are applied. HR reviews the run instead of rebuilding it.',
      },
      {
        h2: 'Pay runs per company and policy',
        body: 'Each company in your group runs its own pay runs for its own pay period. A pay run brings together:',
        points: [
          'Payable days and overtime from attendance',
          'Salary advances, recovered in instalments',
          'Approved expense reimbursements',
          'Leave encashment, at year end or when someone leaves',
          'Contributions, deductions and income tax from your rules',
        ],
      },
      {
        h2: 'Rules you define, versioned by date',
        body:
          'Contributions, deductions and tax are set up as rules with slabs and an effective date. When a rule changes, you add a new version from the date it applies, and earlier pay runs keep the rules that were in force at the time. Because the rules are yours rather than hard-coded, each company in a group can follow the rules that apply to it, and we set them up with you during onboarding.',
      },
      {
        h2: 'Revisions, arrears and approvals',
        body:
          'Salary revisions are kept as a history, and arrears are calculated when a revision is backdated. Finalising a pay run goes through approval, and so does reopening one, so every change to pay is on record.',
      },
      {
        h2: 'Payslips and payouts',
        body:
          'Employees get their payslips on their phone. Accounts get one payout queue for salaries and advances, with paid status per employee, so you always know who has been paid.',
      },
    ],
    steps: {
      h2: 'From check-in to payslip',
      items: [
        ['Attendance builds the month', 'Verified punches, leave and holidays become payable days and overtime.'],
        ['Run payroll', 'Create the pay run; advances, reimbursements and your deduction and tax rules are applied.'],
        ['Approve and pay', 'Finalise through approval, pay from the payout queue, and payslips reach every phone.'],
      ],
    },
    faqs: [
      {
        q: 'Do we still need to export attendance to payroll?',
        a: 'No. Payroll reads attendance, leave, holidays and approved corrections directly, so there is nothing to export or re-type.',
      },
      {
        q: 'How are deductions and tax handled?',
        a: 'You set up contributions, deductions and income tax as dated rules with slabs for each company, and every pay run applies them. We set these up with you during onboarding.',
      },
      {
        q: 'Can we change a pay run after it is finalised?',
        a: 'Yes, by reopening it through approval. The change and who approved it are recorded.',
      },
      {
        q: 'We have more than one company. Can each run its own payroll?',
        a: 'Yes. Each company (sub-organisation) has its own pay runs, policies and approvers, and HR can see all of them in one place.',
      },
      {
        q: 'Are statutory rules for my country built in?',
        a: 'Payroll rules are not tied to one country. Contributions, deductions and income tax are set up as dated rules with slabs for each company, and we configure them with you during onboarding.',
      },
      {
        q: 'Can employees see their payslips?',
        a: 'Yes. Payslips reach every employee in the TeamTuned app on Android and iPhone.',
      },
      {
        q: 'How are salary advances recovered?',
        a: 'An approved advance is paid through payroll or the payout queue, and recovered in instalments from the following pay runs.',
      },
    ],
    related: ['face-recognition-attendance', 'leave-management', 'shift-roster'],
  },
  {
    slug: 'leave-management',
    title: 'Leave Management Software with Approvals | TeamTuned',
    description:
      'Leave policies with monthly or yearly credits, expiry and carry forward, site holidays, comp-off and approvals in the app. Balances explain themselves.',
    updated: '2026-11-02',
    eyebrow: 'Leave management',
    h1: 'Leave management with balances everyone trusts.',
    lede:
      'TeamTuned’s leave management (time off and PTO tracking) credits leave from the policy you set, takes approved and pending requests out of the balance as they happen, and shows every employee exactly how their balance was worked out. Holidays, comp-off and weekly days off live in the same system, and approved leave flows straight into attendance and payroll.',
    screen: { src: '/screens/phone-leave.webp', alt: 'TeamTuned leave screen with leave balances and recent requests', ...PHONE },
    sections: [
      {
        h2: 'Why leave balances get disputed',
        body:
          'When balances live in a spreadsheet, every credit, carry forward and deduction is somebody’s manual edit, and nobody can see why a number changed. TeamTuned keeps leave as a ledger: each credit, request, approval, expiry and adjustment is a dated entry, so the balance can always be explained.',
      },
      {
        h2: 'Policies that do the arithmetic',
        body: 'Set up each leave type once in the leave policy, and TeamTuned credits it for you:',
        points: [
          'Credit monthly, quarterly, half-yearly or yearly.',
          'Prorate for people who join or leave part way through the year.',
          'Expire unused credits, using the credit that expires first when leave is taken.',
          'Carry balances into the next leave year.',
          'Encash unused leave at year end or when someone leaves, paid through payroll.',
          'Half-day leave, first or second half.',
        ],
      },
      {
        h2: 'A balance that explains itself',
        body:
          'Employees see what was credited for the current period, what was brought forward, what they have used and what is waiting for approval. Pending requests are held against the balance, so the same days can’t be spent twice.',
      },
      {
        h2: 'Holidays, comp-off and weekly days off',
        body:
          'Holiday lists can differ by company and by site, including half-day holidays. Optional holidays have a yearly limit set in the policy, and employees apply for the ones they want. Work on a weekly day off or a holiday can earn comp-off (time off in lieu), which is credited with its own expiry. Where the policy allows it, employees pick their own flexible weekly days off.',
      },
      {
        h2: 'Approvals on the phone',
        body:
          'Leave requests go through the approval flow you set, with one or more levels, and managers decide from the approvals inbox on web or in the app. Every decision records who made it and when, and employees are notified straight away.',
      },
      {
        h2: 'Connected to attendance, rosters and payroll',
        body:
          'Approved leave appears in the attendance calendar and frees the shift in the roster. Absences can be covered from an employee’s leave balance, with approval if the policy asks for it. Payroll reads leave, holidays and unpaid days directly, so there is nothing to re-type at the end of the month.',
      },
    ],
    steps: {
      h2: 'Moving leave into TeamTuned',
      items: [
        ['Set up the policy', 'Add your leave types, credit rules, holidays and approval flow, per company if you have several.'],
        ['Bring balances across', 'We set opening balances to match what each employee has today.'],
        ['Apply from the app', 'Employees apply and track requests on their phone; managers approve from the inbox.'],
      ],
    },
    faqs: [
      {
        q: 'Can different companies or sites have different leave rules?',
        a: 'Yes. Each company (sub-organisation) can have its own leave policy, and holiday lists can be set per company and per site.',
      },
      {
        q: 'What happens to a balance when the policy changes?',
        a: 'You publish the change with an effective date. The old rules apply up to that date and the new rules after it, and requests already waiting for approval keep the rules they were made under.',
      },
      {
        q: 'Does TeamTuned support comp-off (time off in lieu)?',
        a: 'Yes. Work on a weekly day off or a holiday can earn comp-off under the rules in the attendance policy. It is credited to the employee’s balance with its own expiry date.',
      },
      {
        q: 'Can employees take half days?',
        a: 'Yes. Leave can be taken for the first or second half of a day, and half-day holidays are supported too.',
      },
      {
        q: 'Can unused leave be encashed?',
        a: 'Yes, if the policy allows it. Unused leave can be paid out at the end of the leave year or when an employee leaves, through payroll.',
      },
      {
        q: 'Does leave flow into payroll?',
        a: 'Yes. Payroll reads approved leave, holidays and unpaid days directly from TeamTuned when it works out payable days.',
      },
    ],
    related: ['attendance-payroll', 'shift-roster', 'face-recognition-attendance'],
  },
  {
    slug: 'shift-roster',
    title: 'Shift Roster Software with Auto-Scheduling | TeamTuned',
    description:
      'Build shift rosters from rules: rest time, off days and staffing demand per team. Publish to the app and check every punch against the rostered shift.',
    updated: '2026-11-02',
    eyebrow: 'Shift & roster',
    h1: 'Shift rosters built from your rules, not by hand.',
    lede:
      'TeamTuned’s shift roster software (shift scheduling, or a rota) drafts the roster for each team from the rules and staffing levels you set, lets managers adjust it, and publishes it to every employee’s phone. Attendance then checks each punch against the shift that person was rostered for.',
    screen: { src: '/screens/phone-dashboard.webp', alt: 'TeamTuned employee home screen showing today’s shift and time checked in', ...PHONE },
    sections: [
      {
        h2: 'The weekly roster spreadsheet',
        body:
          'Rotating shifts are usually planned in a spreadsheet, shared as a picture in a chat group and changed by phone. Nobody can tell which version is current, and attendance can’t check anyone against it. TeamTuned keeps one roster, published to everyone, that attendance and leave both read.',
      },
      {
        h2: 'Shifts defined once',
        body:
          'Create named shifts with their start and end times once, and use them everywhere. Each attendance policy decides how an employee’s day is timed: a fixed shift, flexible hours, or a roster. Change a shift’s times and everyone on it follows.',
      },
      {
        h2: 'Teams that match how you work',
        body:
          'Group people into teams for rostering, and nest teams inside each other. Members can be picked by site, department, role or employment type, plus people you add or leave out by name. A sub-team inherits its parent’s settings and managers.',
      },
      {
        h2: 'Rules in, roster out',
        body: 'Set the rules once in the policy and the roster generator drafts the roster to fit them:',
        points: [
          'Minimum rest between shifts',
          'Whether double shifts are allowed',
          'Off days per week',
          'How many people each team needs, by shift or by hour',
          'Patterns and fixed shifts for individual members',
        ],
      },
      {
        h2: 'Review, publish, done',
        body:
          'Managers review the draft, make changes and publish. Employees see their shifts in the app up to two months ahead, with the shift code on each day of their calendar. Rosters can also be exported as a PDF.',
      },
      {
        h2: 'Swaps without the phone calls',
        body:
          'When two people want to trade shifts, the request goes through approval, starting with the colleague who takes the shift and then the team’s approvers. The approved swap updates the published roster, so attendance checks each person against their new shift.',
      },
      {
        h2: 'Connected to attendance and leave',
        body:
          'Once published, the roster is what attendance checks against: late marks, early exits and overtime are worked out from the rostered shift, and a day with no shift is shown as unscheduled rather than given a default. Approved leave is written into the roster and frees the shift, and work on a rostered off day can earn comp-off.',
      },
    ],
    steps: {
      h2: 'Getting your first roster out',
      items: [
        ['Define shifts and teams', 'Add your shift timings and the teams you roster, with who belongs to each.'],
        ['Set the rules', 'Rest time, off days, double shifts and how many people each team needs.'],
        ['Generate and publish', 'Review the draft, adjust it and publish it to everyone’s phone.'],
      ],
    },
    faqs: [
      {
        q: 'Can fixed-shift and rostered employees use the same system?',
        a: 'Yes. Each attendance policy sets how the day is timed: a fixed shift, flexible hours or a roster, and the same shift definitions are used for all of them.',
      },
      {
        q: 'What happens when someone on the roster takes leave?',
        a: 'When the leave is approved, it is written into the roster and that shift becomes open. If the leave is cancelled, the shift is restored.',
      },
      {
        q: 'How far ahead can employees see their shifts?',
        a: 'Employees see published rosters in the app up to two months ahead, with each day’s shift on their attendance calendar.',
      },
      {
        q: 'Can employees swap shifts?',
        a: 'Yes. A swap request goes for approval, first to the colleague taking the shift and then to the team’s approvers, and the roster updates once it is approved.',
      },
      {
        q: 'Does the roster affect attendance?',
        a: 'Yes. Attendance is checked against the published roster, so late marks and overtime follow each person’s rostered shift.',
      },
    ],
    related: ['leave-management', 'geofence-attendance', 'attendance-payroll'],
  },
  {
    slug: 'task-management',
    title: 'Task Management App with Photo Proof | TeamTuned',
    description:
      'Assign tasks to people, sites or teams, and get them back with photos, checklists and location as proof. Reviews, reminders and meeting action items.',
    updated: '2026-11-02',
    eyebrow: 'Task management',
    h1: 'Task management with proof the work was done.',
    lede:
      'TeamTuned’s task management lets managers assign work to a person, a site, a department or a role, and get it back with proof: photos, checklists and the location and time it was captured. Each task moves through clear steps, from acknowledged to reviewed, so everyone can see where it stands.',
    screen: { src: '/screens/phone-tasks.webp', alt: 'TeamTuned My work screen with tasks, priorities, due times and progress', ...PHONE },
    sections: [
      {
        h2: '“Done” on a chat message isn’t proof',
        body:
          'Work handed out on calls and chat groups gets lost, and a “done” message says nothing about what was actually done, or where. TeamTuned gives every task an owner, a due date and a record, and can ask for proof before it is accepted.',
      },
      {
        h2: 'Assign once, to the right people',
        body:
          'Assign a task to named employees, everyone at a site, a department or a role. Each person gets their own copy to work on, and managers see progress across all of them together.',
      },
      {
        h2: 'Clear steps for every task',
        body: 'Every task follows the same lifecycle, and the app shows only the actions that make sense at each step:',
        points: [
          'Assigned, then acknowledged by the employee',
          'In progress, with pauses, so time spent is recorded',
          'Submitted for review',
          'Done, or returned with a note to be worked on again',
        ],
      },
      {
        h2: 'Proof built into the task',
        body:
          'Attach a form to a task and the employee must fill it in to submit: photos, checklists, numbers and notes. A photo field can require a live camera photo, so old pictures from the gallery can’t be used. The submission records where and when it was captured, so the reviewer sees the evidence, not just a tick. Forms can be filled without signal and are sent when the phone is back online.',
      },
      {
        h2: 'Reminders and site reports',
        body:
          'Employees are reminded before a task is due and when it becomes overdue. For work that repeats, such as inspections or site reports, forms can be scheduled per site so they turn up on the right phones every day.',
      },
      {
        h2: 'Meetings that turn into work',
        body:
          'Record minutes of meeting with decisions and action items. Any action item can be turned into a task with one owner, and the meeting shows its status from then on.',
      },
      {
        h2: 'Ready for performance reviews',
        body:
          'Each task records whether it was finished on time, the time spent on it and the reviewer’s rating, so performance reviews can draw on real work rather than memory.',
      },
    ],
    steps: {
      h2: 'Getting started with tasks',
      items: [
        ['Build your forms', 'Create the photo checklists and reports you want as proof, once.'],
        ['Assign the work', 'Send tasks to people, sites, departments or roles, with a due date and a reviewer.'],
        ['Review the proof', 'Check the photos and answers, then accept the task or send it back.'],
      ],
    },
    faqs: [
      {
        q: 'Can a task require photos as proof?',
        a: 'Yes. Attach a form to the task, and the employee has to fill it in, including any photos and checklist items, before they can submit.',
      },
      {
        q: 'Can I assign one task to a whole site or team?',
        a: 'Yes. Assign it to everyone at a site, a department or a role. Each person gets their own copy, and you see progress for all of them together.',
      },
      {
        q: 'What happens if the work isn’t good enough?',
        a: 'The reviewer returns the task with a note. The employee starts it again and resubmits, and the history of each round is kept.',
      },
      {
        q: 'Can employees upload old photos from their gallery?',
        a: 'Only if you allow it. Each photo field can be set to camera only, which hides the gallery so the photo has to be taken on the spot.',
      },
      {
        q: 'Does it work without mobile signal?',
        a: 'Yes. Forms can be filled offline and are sent automatically when the phone is back online, with the time they were captured.',
      },
      {
        q: 'Can employees keep their own to-dos?',
        a: 'Yes. Anyone can add a task for themselves, so personal to-dos sit in the same list as assigned work.',
      },
    ],
    related: ['field-force-tracking', 'face-recognition-attendance', 'leave-management'],
  },
];

export const featureBySlug = (slug: string) => features.find((f) => f.slug === slug);
