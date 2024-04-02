'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MenuSigInUp from "../login/MenuSigInUp";

export default function MenuAvatarSigIn() {

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

  return (
    <div className="inline-block">
      <button
        ref={buttonRef}
        className="flex items-center border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onClick={() => handleToggleMenu()}
      >
        <Image width={100} height={150} src="/avatar.svg" alt="Avatar" className="w-8 h-8 rounded-full" />
        <span className="ml-2 text-sm font-medium">Login</span>
      </button>
      {showMenu && (
        <div ref={menuRef} className="absolute z-10 bg-white rounded-md shadow-lg flex flex-col items-start w-80 mt-2 right-0">
          <MenuSigInUp />
        </div>
      )}
    </div>
  );
}