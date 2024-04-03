'use client'
import { useEffect, useRef, useState } from "react";
import MenuLogOut from "./MenuLogOut";
import ImagePerfil from "../perfil/ImagePerfil";
import { useSession } from "next-auth/react";

export default function MenuAvatarLogOut() {

  const { data: session } = useSession();

  const [showMenu, setShowMenu] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside: React.EventHandler<React.MouseEvent<HTMLElement>> = (event) => {
      if (
        showMenu &&
        event.target instanceof Element &&
        !buttonRef.current?.contains(event.target) &&
        menuRef.current && !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside as unknown as EventListenerOrEventListenerObject);
    return () => document.removeEventListener("click", handleClickOutside as unknown as EventListenerOrEventListenerObject);
  }, [showMenu]);
  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const imageUrl = session?.user?.image;

  return (
    <div className="inline-block">
      <button
        ref={buttonRef}
        className="flex items-center border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onClick={() => handleToggleMenu()}
      >
        {session && typeof imageUrl === 'string' && (
          <ImagePerfil imageUrl={imageUrl} />
        )}
      </button>
      {showMenu && (
        <div ref={menuRef} className="absolute z-10 bg-white rounded-md shadow-lg flex flex-col items-start w-80 mt-2 right-0">
          <MenuLogOut />
        </div>
      )}
    </div>
  );
}