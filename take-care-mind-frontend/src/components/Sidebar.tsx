import React, { useState } from "react";
import Link from "next/link";
import {
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiHome,
  FiBox,
  FiLayers,
  FiPieChart,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { usePathname } from "next/navigation";
import { UserProfile } from "./UserProfile";
import { signOut, useSession } from "next-auth/react";

interface MenuItem {
  icon: React.ElementType;
  text: string;
  href?: string;
  subItems?: MenuItem[];
}

const Sidebar: React.FC = () => {
  const [openAccordions, setOpenAccordions] = useState<number[]>([1]);
  const pathname = usePathname();
  const { data: session } = useSession();
  const userName = session?.user?.email || "";

  const menuItems: MenuItem[] = [
    { icon: FiHome, text: "Dashboard", href: "/dashboard" },
    {
      icon: FiBox,
      text: "Fonctionnalités",
      subItems: [
        { icon: FiLayers, text: "Méditation", href: "/features/function1" },
        { icon: FiLayers, text: "Objectifs", href: "/features/function2" },
        { icon: FiLayers, text: "Activité", href: "/features/function3" },
        { icon: FiLayers, text: "Routine", href: "/features/routine" },
        { icon: FiLayers, text: "Stoisisme", href: "/features/function3" },
        { icon: FiLayers, text: "Motivation", href: "/features/function3" },
      ],
    },
    { icon: FiPieChart, text: "Analyse", href: "/analysis" },
    { icon: FiSettings, text: "Paramètres", href: "/settings" },
    { icon: FiStar, text: "Premium", href: "/premium" },
    { icon: FiUsers, text: "Communauté", href: "/community" },
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    // console.log("Déconnexions");
    signOut({
      callbackUrl: "/auth/login",
    });
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.subItems) {
      const isOpen = openAccordions.includes(index);
      return (
        <li key={index}>
          <button
            onClick={() => toggleAccordion(index)}
            className="flex items-center justify-between w-full px-6 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            <span className="flex items-center">
              <item.icon className="mr-3" />
              {item.text}
            </span>
            {isOpen ? <FiChevronDown /> : <FiChevronRight />}
          </button>
          {isOpen && (
            <ul className="ml-6 mt-2">
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <Link
                    href={subItem.href || "#"}
                    className={`flex items-center px-6 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
                      isActive(subItem.href || "")
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {/* <subItem.icon className="mr-3" /> */}
                    {subItem.text}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li key={index}>
        <Link
          href={item.href || "#"}
          className={`flex items-center px-6 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
            isActive(item.href || "")
              ? "bg-gray-700 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } transition-colors duration-200`}
        >
          <item.icon className="mr-3" />
          {item.text}
        </Link>
      </li>
    );
  };

  return (
    <div className="bg-gray-800 text-white h-full flex justify-between flex-col">
      <div className="px-6 py-4 my-4">
        <Link href="/" className="text-2xl font-bold">
          Take Care Mind
        </Link>
      </div>
      <nav className="mt-6">
        <ul>{menuItems.map((item, index) => renderMenuItem(item, index))}</ul>
      </nav>

      <UserProfile name={userName} onLogout={handleLogout} />
      {/* <UserProfile name="Adrien SCHMIDT" onLogout={handleLogout} /> */}
    </div>
  );
};

export default Sidebar;
