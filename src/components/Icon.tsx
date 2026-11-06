import {
  Briefcase, Building2, CalendarRange, ClipboardCheck, FileCheck2, FileText, HandCoins, History, Inbox,
  Banknote, KeyRound, Lock, NotebookPen, Receipt, Route, ScanFace, ShieldPlus, Smartphone, Sun, Target, UserPlus, UsersRound, Wallet,
  type LucideProps,
} from 'lucide-react';

const icons = {
  Briefcase, Building2, CalendarRange, ClipboardCheck, FileCheck2, FileText, HandCoins, History, Inbox,
  Banknote, KeyRound, Lock, NotebookPen, Receipt, Route, ScanFace, ShieldPlus, Smartphone, Sun, Target, UserPlus, UsersRound, Wallet,
};

export type IconName = keyof typeof icons;

/** Icons named in content data, so copy files stay plain data. */
export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = icons[name];
  return <C aria-hidden {...props} />;
}
