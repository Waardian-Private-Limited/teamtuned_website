// Buyer guides: neutral, practical articles for people comparing HR software. They explain how to choose; they
// don't rank or name competitors. Where TeamTuned is mentioned, only shipped features are described.
// Same copy rules as the rest of the site: global, no industries named, no invented numbers, customers or prices.

export type Guide = {
  slug: string;
  /** <title>, 60 characters or fewer. */
  title: string;
  /** Meta description, 155 characters or fewer. */
  description: string;
  published: string;
  updated: string;
  eyebrow: string;
  h1: string;
  /** Opening paragraph that answers the question on its own. */
  lede: string;
  sections: Array<{ h2: string; body: string; points?: string[] }>;
  faqs: Array<{ q: string; a: string }>;
  /** Feature page slugs to link to. */
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: 'how-to-choose-leave-management-software',
    title: 'How to Choose Leave Management Software: A Checklist',
    description:
      'What to check before you buy leave management software: policy rules, balances people trust, holidays, approvals, mobile apps and the link to payroll.',
    published: '2026-11-02',
    updated: '2026-11-02',
    eyebrow: 'Buyer guide',
    h1: 'How to choose leave management software',
    lede:
      'Good leave management software applies your leave policy for you, shows every employee how their balance was worked out, routes requests to the right approver and passes approved leave and unpaid days straight to payroll. Use the checklist below to test any tool, including ours, against the way your company actually grants time off.',
    sections: [
      {
        h2: 'Start with your policy, not the demo',
        body:
          'Before you look at any product, write down how leave really works in your company: the leave types, how much is credited and how often, what happens to unused days, how new joiners are treated, and who approves what. Most problems with leave software come from a policy the tool can’t express, which then gets handled outside it in a spreadsheet.',
      },
      {
        h2: 'Can it express your rules?',
        body: 'Check that the policy settings cover at least the following, for each leave type:',
        points: [
          'Credit frequency: monthly, quarterly, half-yearly or yearly.',
          'Proration for people who join or leave during the year.',
          'Expiry of unused credits, and which credit is used first.',
          'Carry forward into the next leave year, with a limit.',
          'Encashment of unused leave at year end or on exit.',
          'Half days, and leave earned by working on a day off (comp-off or time off in lieu).',
        ],
      },
      {
        h2: 'Will people trust the balance?',
        body:
          'Disputes start when an employee can’t see why their balance changed. Ask the vendor to show an employee’s balance broken down into what was credited, carried forward, used and waiting for approval. Pending requests should be held against the balance, so the same days can’t be requested twice. If the tool can only show a single number, expect questions every month.',
      },
      {
        h2: 'Holidays, sites and companies',
        body:
          'If you have several sites or legal entities, check that holiday lists can differ by company and by site, that half-day holidays are supported, and that optional holidays can have a yearly limit. Each company should be able to keep its own leave policy while HR still sees everyone together.',
      },
      {
        h2: 'Approvals and the mobile app',
        body:
          'Leave is requested and approved on phones far more than at desks. Look for multi-level approval flows, notifications when a decision is made, and a record of who approved each request and when. Employees should be able to apply, see their balance and withdraw a request from the app.',
      },
      {
        h2: 'The link to attendance, rosters and payroll',
        body:
          'Leave that lives in a separate tool has to be copied into attendance and payroll every month. Check that approved leave appears in the attendance calendar, frees the shift on the roster, and reaches payroll as paid or unpaid days without an export. Also ask what happens to an unexplained absence: can it be covered from the employee’s balance, with approval if needed?',
      },
      {
        h2: 'Changing the policy later',
        body:
          'Policies change. Ask how a change is applied: from an effective date, with the old rules kept for the period before it, and with requests already waiting for approval left under the rules they were made under. A tool that recalculates everyone’s history when you edit a rule will cause the disputes you bought it to prevent.',
      },
    ],
    faqs: [
      {
        q: 'What is leave management software?',
        a: 'Software that credits leave according to your policy, lets employees request time off, routes requests for approval, keeps balances up to date and passes approved leave to attendance and payroll.',
      },
      {
        q: 'Is a spreadsheet enough for leave tracking?',
        a: 'For a handful of people with one simple policy, it can be. Once you have proration, expiry, carry forward, several approvers or more than one site, a spreadsheet needs constant manual edits and balances become hard to explain.',
      },
      {
        q: 'Should leave management be part of the HRMS or a separate tool?',
        a: 'Keeping it in the same system as attendance and payroll removes the monthly export and the mistakes that come with it, because all three read the same records.',
      },
    ],
    related: ['leave-management', 'attendance-payroll', 'shift-roster'],
  },
  {
    slug: 'how-to-choose-attendance-and-payroll-software',
    title: 'How to Choose Attendance and Payroll Software',
    description:
      'A practical checklist for attendance and payroll software: verified check-ins, shifts, overtime, leave, deduction and tax rules, approvals and payslips.',
    published: '2026-11-02',
    updated: '2026-11-02',
    eyebrow: 'Buyer guide',
    h1: 'How to choose attendance and payroll software',
    lede:
      'The best attendance and payroll software turns verified working time into payable days and overtime, then runs payroll on that same data with your own deduction and tax rules, so nobody re-types attendance at the end of the month. This checklist covers what to test before you choose, from the check-in to the payslip.',
    sections: [
      {
        h2: 'Payroll is only as good as attendance',
        body:
          'Every payroll mistake that starts with “the attendance was wrong” is expensive: a correction, an arrear, an unhappy employee. So judge attendance first. Ask how the system knows the right person checked in, at the right place and time. A tap on a button, a shared card or a selfie sent on a chat app proves very little on its own.',
      },
      {
        h2: 'What a verified check-in looks like',
        body: 'Look for checks that run on every check-in, not just a location pin:',
        points: [
          'Face recognition with a liveness check, so photos of photos are rejected.',
          'A geofence or location rule that fits each employee’s way of working.',
          'A registered phone, so a colleague can’t check in on someone else’s device.',
          'Detection of mock-location apps that fake GPS.',
        ],
      },
      {
        h2: 'Shifts, overtime and corrections',
        body:
          'Check that punches are matched to each employee’s shift or roster, so late marks, half days and overtime are worked out automatically. Missed punches and corrections should go through approval with a record of who decided, and payroll should only use attendance once those decisions are made.',
      },
      {
        h2: 'Rules you control',
        body:
          'Contributions, deductions and income tax differ by country and sometimes by company. Ask whether you can set them up as rules with slabs and effective dates, and whether old pay runs keep the rules that applied at the time. Hard-coded rules are fine until they change; dated rules let you follow the change without breaking history.',
      },
      {
        h2: 'Everything that reaches the pay run',
        body:
          'Apart from attendance, a pay run usually needs approved leave and unpaid days, salary advances and their instalments, approved expense claims, salary revisions with arrears and leave encashment. Each one that lives outside the system becomes a manual step. Ask the vendor to show a pay run that picks all of them up on its own.',
      },
      {
        h2: 'Control, payslips and payouts',
        body:
          'Finalising a pay run, and reopening one, should need approval and leave a record. Employees should get their payslips on their phone, and whoever pays salaries should see one list of what is due and what has been paid. If you run several companies, each should have its own pay runs and approvers.',
      },
    ],
    faqs: [
      {
        q: 'Why use one system for attendance and payroll?',
        a: 'Because payroll can then read attendance, leave and approved corrections directly. Nothing is exported or re-typed, so there is less room for error and no end-of-month reconciliation.',
      },
      {
        q: 'Do we need biometric devices for reliable attendance?',
        a: 'Not necessarily. A phone app that checks the employee’s face with liveness, their location and their registered phone can verify each check-in without hardware at every entrance.',
      },
      {
        q: 'What should we ask about tax and statutory rules?',
        a: 'Ask whether they are set up as editable, dated rules for each company, who configures them, and how an old pay run behaves after a rule changes.',
      },
    ],
    related: ['attendance-payroll', 'face-recognition-attendance', 'geofence-attendance'],
  },
  {
    slug: 'shift-scheduling-spreadsheet-vs-software',
    title: 'Shift Scheduling: Spreadsheet vs Roster Software',
    description:
      'When a shift roster outgrows the spreadsheet: the signs, what roster software should do, and how to move rotating shifts across without disruption.',
    published: '2026-11-02',
    updated: '2026-11-02',
    eyebrow: 'Guide',
    h1: 'Shift scheduling: when to move from a spreadsheet to roster software',
    lede:
      'A spreadsheet works for shift scheduling while one person plans a few shifts for a small team. Once rosters rotate, rest rules matter, leave keeps breaking the plan or attendance needs to be checked against the roster, dedicated roster software saves time and prevents mistakes, because it applies the rules and publishes one version everyone sees.',
    sections: [
      {
        h2: 'Signs the spreadsheet has run its course',
        body: 'Most teams notice the same problems:',
        points: [
          'Several versions of the roster are in circulation, shared as pictures in chat groups.',
          'Someone has to check rest time between shifts by eye.',
          'Approved leave is only noticed when a shift goes uncovered.',
          'Shift swaps are agreed by phone and never recorded.',
          'Attendance can’t tell whether someone was late, because nobody knows which shift they were on.',
        ],
      },
      {
        h2: 'What roster software should do',
        body:
          'At a minimum, roster software should keep named shifts with fixed times, group people into teams, and check every roster against your rules: minimum rest between shifts, whether double shifts are allowed, how many days off each week, and how many people each team needs. The better tools draft the roster for you from those rules, so a manager reviews and adjusts instead of starting from an empty grid.',
      },
      {
        h2: 'Publishing is the point',
        body:
          'A roster is only useful when everyone sees the same one. Look for a clear publish step, after which employees see their own shifts on their phone, ideally weeks ahead. Changes after publishing should be visible and recorded rather than silent.',
      },
      {
        h2: 'Leave and swaps belong in the roster',
        body:
          'When leave is approved, the roster should show that shift as open straight away. Swap requests should go through approval, starting with the colleague taking the shift, and update the roster once approved. Both remove the phone calls that keep a spreadsheet roster out of date.',
      },
      {
        h2: 'Connect it to attendance',
        body:
          'The biggest gain comes when attendance reads the published roster. Late marks, early exits and overtime are then measured against the shift each person was actually rostered for, and a day with no shift is treated as unscheduled rather than given a default.',
      },
      {
        h2: 'How to switch without disruption',
        body:
          'Move one team first. Enter its shifts and rules, generate a roster for the next period alongside the spreadsheet, compare the two, and publish once the team agrees. Then move the remaining teams period by period, keeping the spreadsheet only until each team has a published roster.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between a shift schedule, a roster and a rota?',
        a: 'They mean much the same thing: a plan of who works which shift on which day. “Rota” is common in British English, “roster” in many other countries, and “shift schedule” in American English.',
      },
      {
        q: 'Can fixed-shift and rotating-shift employees use the same system?',
        a: 'In good roster software, yes. Fixed-shift employees keep one shift, rostered employees follow the published roster, and both use the same shift definitions.',
      },
      {
        q: 'How far ahead should a roster be published?',
        a: 'Far enough for people to plan their lives; many teams publish a week to a month ahead. Choose a tool that lets employees see published shifts well in advance.',
      },
    ],
    related: ['shift-roster', 'leave-management', 'geofence-attendance'],
  },
  {
    slug: 'hrms-pricing-per-employee',
    title: 'How Per-Employee HRMS Pricing Works',
    description:
      'How per-employee HRMS pricing works: who counts as a billable employee, how modules change the price, and the questions to ask before you sign.',
    published: '2026-11-02',
    updated: '2026-11-02',
    eyebrow: 'Guide',
    h1: 'How per-employee HRMS pricing works',
    lede:
      'Most HRMS and attendance software is priced per employee: you pay for the number of people who use the system, and often for the modules you switch on. The details decide what you actually pay, especially who counts as an employee, how the count is measured and whether inactive staff are charged. This guide explains the common models and the questions to ask.',
    sections: [
      {
        h2: 'Who counts as an employee?',
        body:
          'This is the first question to ask, because definitions differ. Some vendors charge for every employee record, including people who have left. Others charge only for active employees. Ask how invited employees who haven’t joined yet are treated, and whether exited or inactive staff stop counting straight away or only at the next billing period.',
      },
      {
        h2: 'Seats, licences or actual use',
        body: 'Per-employee pricing usually comes in one of three shapes:',
        points: [
          'A fixed number of licences you buy up front, with a limit on active employees.',
          'Billing on the number of active employees each period.',
          'A minimum charge or minimum headcount, then per-employee pricing above it.',
        ],
      },
      {
        h2: 'Modules change the price',
        body:
          'Many vendors price by module, so attendance alone costs less than attendance plus payroll, field tracking or recruitment. Check which modules you need now and which later, whether modules can be added mid-contract, and whether some features in a module, such as live tracking or extra storage, carry their own charge.',
      },
      {
        h2: 'Costs outside the licence',
        body:
          'Ask about everything that isn’t the monthly licence: setup and data import, configuring payroll rules, training, biometric hardware if the product needs it, SMS or message charges, and support. A product that runs on employees’ own phones avoids hardware costs at each site.',
      },
      {
        h2: 'Questions to ask before you sign',
        body: 'Get a clear answer to each of these in writing:',
        points: [
          'Exactly who counts towards the employee number, and when they stop counting.',
          'What happens when you reach your limit: are existing employees affected?',
          'Which modules are included, and what adding one costs.',
          'Whether there is a trial with your own team before you commit.',
          'How you can export your data if you leave.',
        ],
      },
      {
        h2: 'How TeamTuned prices',
        body:
          'TeamTuned is priced by the number of active employees and the modules you switch on. Active and invited employees use a licence; inactive, exited and deleted employees don’t, and marking someone inactive frees their licence straight away. When all licences are in use, everyone already on TeamTuned keeps working; you just can’t add another active employee until one is free. Book a demo for a quote for your setup, then try TeamTuned with your own team.',
      },
    ],
    faqs: [
      {
        q: 'Is per-employee pricing better than a flat fee?',
        a: 'It scales with your team, so small companies pay less and growing ones pay as they grow. A flat fee can suit a stable headcount. What matters most is a clear definition of who is counted.',
      },
      {
        q: 'Do exited employees cost money?',
        a: 'It depends on the vendor. Some charge for every record; others, including TeamTuned, count only active and invited employees.',
      },
      {
        q: 'Why don’t all vendors publish prices?',
        a: 'When the price depends on headcount, modules and setup work, many vendors quote after a demo. Ask for the quote in writing with the counting rules spelled out.',
      },
    ],
    related: ['attendance-payroll', 'face-recognition-attendance', 'leave-management'],
  },
  {
    slug: 'replace-attendance-spreadsheets-and-chat-groups',
    title: 'Replacing Attendance Spreadsheets and Chat-Group Selfies',
    description:
      'Why attendance in spreadsheets and chat groups breaks down for teams in the field and on site, and how to move to verified check-ins step by step.',
    published: '2026-11-02',
    updated: '2026-11-02',
    eyebrow: 'Guide',
    h1: 'Replacing attendance spreadsheets and chat-group selfies',
    lede:
      'Spreadsheets and chat groups are how many teams start tracking attendance, especially when people work on sites and in the field. They break down because nothing is verified: a selfie doesn’t prove where or when it was taken, and a spreadsheet only records what someone types. Moving to verified check-ins replaces trust with proof, and turns attendance into data payroll can use.',
    sections: [
      {
        h2: 'How the informal system usually works',
        body:
          'Employees post a photo or a location pin in a group when they arrive. A supervisor copies names into a spreadsheet, sometimes days later. At the end of the month someone reconciles the sheet with leave, corrections and overtime before payroll can run. Every step depends on a person remembering and typing correctly.',
      },
      {
        h2: 'Where it breaks',
        body: 'The same problems come up again and again:',
        points: [
          'A photo can be old, taken elsewhere or taken by someone else.',
          'Location pins can be shared from anywhere, and GPS can be faked with an app.',
          'Messages get lost in busy groups, so attendance is incomplete.',
          'Late marks and overtime are argued about, because there is no agreed shift to compare with.',
          'Payroll waits for the spreadsheet to be cleaned up.',
        ],
      },
      {
        h2: 'What “verified” should mean',
        body:
          'A verified check-in confirms the person, the place and the time together: the employee’s face with a liveness check, a location inside an allowed area or under an agreed rule, a registered phone, and the time recorded by the system rather than typed in. Fake-location apps should be detected, not ignored.',
      },
      {
        h2: 'What changes for supervisors',
        body:
          'Instead of collecting messages, a supervisor opens one screen showing who has checked in at each site, who is late and who is on leave. Missed check-ins become correction requests that they approve or reject, with the decision on record. Field work can be recorded too, with visits, photos and notes, so nobody needs to call to ask where someone is.',
      },
      {
        h2: 'Moving across step by step',
        body:
          'Start with one site or team. Add its location and the right location rule for the people who work there, register each employee’s face and phone, and run the app alongside the old group for a short overlap. Once the numbers match, close the group for attendance and move the next team. Keep the chat group for conversation; it just stops being the register.',
      },
      {
        h2: 'Where TeamTuned fits',
        body:
          'TeamTuned checks face, liveness, location and the registered phone on every check-in, blocks check-ins from mock-location apps, and feeds verified attendance into leave, rosters and payroll. Field teams can be tracked under a policy you set, and tasks can require photo and checklist proof. It runs on the phones your team already has.',
      },
    ],
    faqs: [
      {
        q: 'Is a selfie on a chat app proof of attendance?',
        a: 'Not on its own. It doesn’t prove when or where the photo was taken, or that it wasn’t taken by someone else. A verified check-in confirms face, liveness, location and time together.',
      },
      {
        q: 'Do we need to buy devices for each site?',
        a: 'No, if you use a phone-based system. Employees check in from their own registered phones, so nothing needs to be installed at each site.',
      },
      {
        q: 'How long does it take to move a team across?',
        a: 'It depends on the team, but the steps are short: set up the site and rules, register faces and phones, then run both systems side by side until the numbers match.',
      },
    ],
    related: ['face-recognition-attendance', 'geofence-attendance', 'field-force-tracking'],
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
