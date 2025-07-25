import { NextResponse, type NextRequest } from "next/server"
import { getCookieCache } from "better-auth/cookies";

const publicRoutes = ["/landing","/api/workflows","/public","/api/payments/dodo/webhook",
    "/api/payments/stripe/webhook"]

const authRoutes =["/sign-in","/sign-up","/error","/forgot-password","/reset-password",'/email-verified']

const apiAuthPrefix = "/api/auth"

const allowedOrigins = ['http://localhost:3000', 'https://bsamaritan.com','https://bayesian-labs.com']

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
const secret = process.env.AUTH_SECRET!;

export default async function middleware(req:NextRequest){

      // Check the origin from the request
    const origin = req.headers.get('origin') ?? ''
    const pathName = req.nextUrl.pathname;
    const isAllowedOrigin = allowedOrigins.includes(origin)

    const isApiAuthRoute = pathName.startsWith(apiAuthPrefix);
    const isPublicRoute =  publicRoutes.some((route) => pathName.startsWith(route));
    const response = NextResponse.next()


    // Avoid infinite recursion: don't fetch session for /api/auth routes
    if (isApiAuthRoute || isPublicRoute) {
        return response;
    }

    const session = await getCookieCache(req);
    
    const isLoggedIn = !!session;


    // Handle preflighted requests
    const isPreflight = req.method === 'OPTIONS'
    
    if (isPreflight) {
        const preflightHeaders = {
        ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
        ...corsOptions,
        }
        return NextResponse.json({}, { headers: preflightHeaders })
    }


    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
      }
     
      Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value)
      })



    const isAuthRoute = authRoutes.includes(pathName);
  

    if (isAuthRoute){
        if (isLoggedIn){
            return Response.redirect(new URL('/',req.nextUrl));
        }
        return response;
    }

    if (!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL('/landing',req.nextUrl));
    }


    return response
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)'],
}