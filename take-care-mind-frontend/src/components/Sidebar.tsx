import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { icon: FiHome, text: "Accueil", href: "/dashboard" },
    { icon: FiUser, text: "Profil", href: "/dashboard/profile" },
    { icon: FiSettings, text: "Paramètres", href: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    // Ajoutez ici votre logique de déconnexion
    router.push("/auth/login");
  };

  return (
    <aside className="w-64 bg-gray-800 text-white relative">
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Mon App</h2>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                <item.icon className="mr-3" />
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          <FiLogOut className="mr-3" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
