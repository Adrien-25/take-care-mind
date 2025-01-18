import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FiMoreVertical, FiUser, FiLogOut } from "react-icons/fi";

interface UserProfileProps {
  name: string;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ name, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const initials = useMemo(() => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  return (
    <div className="mt-auto p-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500">
            {initials}
          </span>
          <span className="ml-3 text-sm font-medium">{name}</span>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-400 hover:text-white"
        >
          <FiMoreVertical />
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute left-full bottom-0 mb-2 py-2 w-48 bg-gray-700 rounded-md shadow-lg">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
          >
            <FiUser className="inline mr-2" /> Mon compte
          </Link>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-600 "
          >
            <FiLogOut className="inline mr-2" /> Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
};

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FiMoreVertical, FiUser, FiLogOut } from "react-icons/fi";

// interface UserProfileProps {
//   name: string;
//   imageUrl: string;
//   onLogout: () => void;
// }

// export const UserProfile: React.FC<UserProfileProps> = ({
//   name,
//   imageUrl,
//   onLogout,
// }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <div className="mt-auto p-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <Image
//             src={imageUrl}
//             alt={name}
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           <span className="ml-3 text-sm font-medium">{name}</span>
//         </div>
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="text-gray-400 hover:text-white"
//         >
//           <FiMoreVertical />
//         </button>
//       </div>
//       {isMenuOpen && (
//         <div className="mt-2 py-2 bg-gray-700 rounded-md shadow-lg">
//           <Link
//             href="/profile"
//             className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
//           >
//             <FiUser className="inline mr-2" /> Mon compte
//           </Link>
//           <button
//             onClick={onLogout}
//             className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
//           >
//             <FiLogOut className="inline mr-2" /> Se déconnecter
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };
