// components/layout/defaultNavItems.tsx
import React from "react";
import {
  CircleStackIcon,
  BookOpenIcon,
  ArchiveBoxIcon,
  IdentificationIcon
} from "@heroicons/react/24/outline";
import { NavItem } from "./sidebar";

export const defaultNavItems: NavItem[] = [
  {
    label: "Books",
    href: "/books",
    icon: <BookOpenIcon className="w-6 h-6" />,
  },
  {
    label: "Authors",
    href: "/authors",
    icon: <IdentificationIcon className="w-6 h-6" />,
  },
  {
    label: "Publishers",
    href: "/publishers",
    icon: <ArchiveBoxIcon className="w-6 h-6" />,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: <CircleStackIcon className="w-6 h-6" />,
  },
];
