import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

/**
 * This middleware is used to protect routes that require authentication.       
 * It checks if the user is authenticated and redirects to the login page if they are not.
 * It also checks if the user is authorized to access the page and redirects to the home page if they are not.
 */
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
