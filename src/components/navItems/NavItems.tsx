import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}


const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label,
  active,
  onClick
}) => {
  return <Link href={to} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-all ${active ? 'bg-teal-900 text-white' : 'text-[#5e677b] dark:text-[#c4cde1] hover:bg-[#ebeef5] dark:hover:bg-[#3f4552]'}`}>
    <div className="flex items-center"
    onClick={onClick}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="ml-3 text-sm font-medium whitespace-nowrap">
        {label}
      </span>
    </div>
    {active && <ChevronRightIcon className="ml-auto w-4 h-4" />}
  </Link>;
};

export default NavItem;