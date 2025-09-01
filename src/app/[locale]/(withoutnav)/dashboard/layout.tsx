'use client';

import Link from "next/link";
import DashboardNav from "@/components/layout/dashboard/dashboard-nav";
import { useEffect, useState } from "react";

interface User {
  id: number;
  role: string;
  name: string | null;
  email: string | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const response = await fetch('/api/users');
    const user = await response.json();
    setUser(user);
  };
  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      {user && <DashboardNav user={user} />}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen pt-16">
          <nav className="p-4 space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
            >
              Dashboard Overview
            </Link>
            <Link
              href="/dashboard/reviews"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
            >
              Reviews
            </Link>
            
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 pt-24">{children}</main>
      </div>
    </div>
  );
}
