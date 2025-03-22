import authConfig from "./auth.config"

import NextAuth from "next-auth";
import {NextResponse} from "next/server";

const publicRoutes = [
    "/landing","/auth/new-verification",'/api/hooks/catch','/landing/privacy-policy','/landing/terms',
    '/api/workflows','/api/payments/dodo','/api/email','/api/verify-password'
]

const authRoutes =[
    "/auth/login","/auth/register","/auth/error","/auth/forgot-password","/auth/reset-password",'/api/auth/callback/notion',"api/auth/login"
]

const apiAuthPrefix = "/api/auth"

const allowedOrigins = ['http://localhost', 'https://bsamaritan.com','https://bayesian-labs.com']

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  // const rateLimiter = new RateLimiterMemory({
  //   points:500, // Number of requests
  //   duration: 60, // Per 1 seconds
  // });
  

const { auth }:any = NextAuth(authConfig);

export default auth(async(req:any)=>{

      // Check the origin from the request
    const origin = req.headers.get('origin') ?? ''
    const isAllowedOrigin = allowedOrigins.includes(origin)

    // try {
    //     // Rate limiting based on IP address
    //     const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';

    //     await rateLimiter.consume(ip); 
    // // Proceed to the next middleware or route handler
    //   } catch (rateLimiterRes) {
    //     // If the request exceeds the limit, block it
    //     return new NextResponse('Too Many Requests', { status: 429 });
    //   }

    // Handle preflighted requests
    const isPreflight = req.method === 'OPTIONS'
    
    if (isPreflight) {
        const preflightHeaders = {
        ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
        ...corsOptions,
        }
        return NextResponse.json({}, { headers: preflightHeaders })
    }

    const response = NextResponse.next()

    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
      }
     
      Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value)
      })

    const { nextUrl} = req;
    const isLoggedIn = !!req.auth
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute =  publicRoutes.some((route) => nextUrl.pathname.startsWith(route));
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute){
        return response;
    }

    if (isPublicRoute){
        return response;
    }

    if (isAuthRoute){
        if (isLoggedIn){
            return Response.redirect(new URL('/',nextUrl));
        }
        return response;
    }

    if (!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL('/landing',nextUrl));
    }


    return response
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)'],
}