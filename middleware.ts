export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * Match all routes in the Orion command center
     * This protects all dashboard and system modules
     */
    "/dashboard/:path*",
    "/hub/:path*",
    "/operations/:path*",
    "/finops/:path*",
    "/system/:path*",
    "/automation/:path*",
    "/security/:path*",
    "/treasury/:path*",
  ],
};
