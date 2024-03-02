"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { IoBugSharp } from "react-icons/io5";

const links = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Issues",
    path: "/issues",
  },
];

const NavBar = () => {
  const pathName = usePathname();

  return (
    <header className="sticky top-0 z-50  bg-slate-900/95 px-4 py-5 shadow-slate-900/5  transition duration-500 backdrop-blur ">
      <div className="container mx-auto flex items-center justify-between sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" aria-label="Home page">
            <IoBugSharp className="h-10 w-10 text-sky-500" />
          </Link>
        </div>
        <div className="flex items-center space-x-5">
          {/* Your theme selector component */}
          {links.map((link) => (
            <Link
              key={link.path}
              className={classNames({
                "text-sky-500": pathName === link.path,
                "text-slate-100 ": pathName !== link.path,
                "text-base font-semibold": true,
              })}
              href={link.path}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="https://github.com/bablumia1"
            className="group"
            aria-label="GitHub"
          >
            <FaGithub className="h-6 w-6 fill-slate-400 group-hover:fill-slate-500" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
