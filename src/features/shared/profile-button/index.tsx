import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "../sidebar";

export default function ProfileButton() {
  const session = useSession();
  return (
    <>
      {session.status === "authenticated" ? (
        <>
          <Link href="/dashboard">
            <Image
              src={session.data?.user?.image || ""}
              alt="avatar"
              width={44}
              height={44}
              className="rounded-full border border-black/10"
            />
          </Link>
          <Sidebar />
        </>
      ) : (
        <Link href="/auth/signin">
          <Button className="bg-black text-white min-w-[64px] h-[23px] rounded-none cursor-pointer">
            <span className="text-[10px] tracking-[1.68px]">LOGIN</span>
          </Button>
        </Link>
      )}
    </>
  );
}
