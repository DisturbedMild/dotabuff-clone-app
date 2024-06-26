"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavigation = () => {
  const pathname = usePathname();
  return (
    <header id="header" className="flex container mx-auto mb-10 py-1">
      <nav id="header__nav">
        <ul className="flex items-center gap-4">
          <li className="">
            <Link
              href="/"
              className="bg-green-500 text-white text-size-xl px-1 py-1 uppercase "
            >
              Dota2Stats
            </Link>
          </li>
          <li
            className={`${
              pathname === "/cybersport" ? "text-red-500" : "text-white"
            }`}
          >
            <Link href="/cybersport">Cybersport</Link>
          </li>
          <li
            className={`${
              pathname === "/heroes" ? "text-red-500" : "text-white"
            }`}
          >
            <Link href="/heroes">Heroes</Link>
          </li>
          <li
            className={`${
              pathname === "/items" ? "text-red-500" : "text-white"
            }`}
          >
            <Link href="/items">Items</Link>
          </li>
          <li
            className={`${
              pathname === "/players" ? "text-red-500" : "text-white"
            }`}
          >
            <Link href="/players">Players</Link>
          </li>
          <li
            className={`${
              pathname === "/matches" ? "text-red-500" : "text-white"
            }`}
          >
            <Link href="/matches">Matches</Link>
          </li>
          <li
            className={`${
              pathname === "/blog" ? "text-red-500" : "text-white"
            }`}
          >
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
