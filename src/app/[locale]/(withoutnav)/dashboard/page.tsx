"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="container">
      <div className="flex flex-col gap-4 cursor-pointer justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => signOut()} className="bg-black text-white px-4 py-2 rounded-md">Logout</Button>
      </div>
    </div>
  );
}