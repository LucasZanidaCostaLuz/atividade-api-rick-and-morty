import { NextResponse } from "next/server"

export const config = {matcher: ["/"]}

export default function Middleware (req){
    return NextResponse.redirect(new URL("/home", req.url))
}