"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "next-auth/react";
import Link from "next/link";

import innovation from "@/assets/images/innovation.jpg"

import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignIn() {

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <form>
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
              <CardDescription>
                Choose your preferred sign in method
                <div className="flex flex-col items-center space-y-4 mt-5">
                  <div className="flex w-full space-x-4">
                    <Button
                      // onClick={() => signIn("google", { callbackUrl: "/" })}
                      className="flex items-center justify-center w-1/2 border bg-transparent text-black font-semibold hover:text-white cursor-pointer"
                    >
                      <FaGoogle /> Google
                    </Button>
                    <Button
                      onClick={() => signIn("github", { callbackUrl: "/" })}
                      className="flex items-center justify-center w-1/2 border bg-transparent text-black font-semibold hover:text-white cursor-pointer"
                    >
                      <FaGithub /> GitHub
                    </Button>
                  </div>
                  <div className="flex items-center w-full">
                    <hr className="flex-1 border-gray-600" />
                    <span className="mx-4 text-xs text-gray-400">
                      OR CONTINUE WITH
                    </span>
                    <hr className="flex-1 border-gray-600" />
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input placeholder="example@gmail.com" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" placeholder="**********" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full mb-5" type="submit">
                {"Sign In"}
              </Button>
              <div className="w-full flex justify-between text-sm">
                <div className="flex space-x-2">
                  <span>Don&apos;t have an account? </span>
                  <Link className="font-semibold" href="/auth/signup">
                    Sign up
                  </Link>
                </div>
                <Link
                  href="/auth/reset-password"
                  className="text-sm font-semibold"
                >
                  Reset Password
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
      <div className="w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${innovation.src})`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))`,
          }}
        />
      </div>
    </div>
  );
}
