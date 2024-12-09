
export const publicRoutes = [
    "/landing","/auth/new-verification",'/api/hooks/catch'
]

export const authRoutes =[
    "/auth/login","/auth/register","/auth/error","/auth/forgot-password","/auth/reset-password",'/api/auth/callback/notion',"api/auth/login"
]

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/home"

export const protectedRoutes = [
    "/"
]