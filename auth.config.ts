import type { NextAuthConfig } from 'next-auth';
 
/**
 * This is the configuration for the authentication process.
 * It is used to configure the authentication provider and the callbacks.
 */ 
export const authConfig = {
  // Customize the default sign-in page path
  pages: {
    signIn: '/login',  // Redirect users to /login instead of the default /api/auth/signin
  },
  // Define authorization callbacks to control access to routes
  callbacks: {
    /**
     * Controls access to routes based on authentication status
     * @param auth - Contains the current user's authentication state
     * @param request - Contains information about the current request
     * @returns boolean or Response - Controls whether the user can access the route
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;  // Check if user is authenticated
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');  // Check if user is trying to access dashboard
      
      // Handle dashboard access
      if (isOnDashboard) {
        if (isLoggedIn) return true;  // Allow access if user is logged in
        return false;  // Redirect unauthenticated users to login page
      } 
      // Handle authenticated users trying to access non-dashboard pages
      else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));  // Redirect to dashboard
      }
      // Allow access to all other pages for unauthenticated users
      return true;
    },
  },
  // Providers array will be populated in auth.ts
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;