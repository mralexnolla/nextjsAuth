import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  //define the public path
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/forgotpassword'
  
  //get the token
  const token = request.cookies.get('token')?.value || '' // this means if there is a token return the value or return nothing

  //check if the path is public
  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

}

   

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
    "/forgotpassword"
  ],
};
