import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

const authPages = ["/auth/signin", "/auth/signup"];
const protectedPages = ["/dashboard"];

export default async function middleware(req: NextRequest) {
    const pathName = req.nextUrl.pathname;

    const isAuthPage = authPages.some((page) => pathName.startsWith(page));

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if(session?.email){
        if(isAuthPage){
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    if(protectedPages.some((page) => pathName.startsWith(page)) && !session?.email){
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next();

}