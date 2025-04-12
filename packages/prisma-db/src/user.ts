import db from './index';
import {v4 as uuidv4} from 'uuid';

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findFirst({ where: {email}});
        return user;
    }
    catch (error) {
        return null;
    }
}

export const getAccountByUserId = async (userId: string) => {
    try {
        const account = await db.account.findFirst({ where: {userId}});
        return account;
    }
    catch (error) {
        return null;
    }
}

export const getUserById= async (id: string) => {
    try {
        const user = await db.user.findUnique({
             where: {id},
        });
        return user;
    }
    catch (error) {
        return null;
    }
}

export const modifyAvatar = async (id: string, avatar:string)=>{
    const user = await db.user.update({
        where: {id},
        data: {
            image: avatar
        }
    });
    return user;
}

export const modifyEmail = async (id: string, email:string)=>{
    const user = await db.user.update({
        where: {id},
        data: {
            email
        }
    });
    return user;
}

enum AccountAccess {
    TRIAL = "TRIAL",
    PRO = "PRO",
    ENTERPRISE = "ENTERPRISE",
    UNLIMITED = "UNLIMITED"
  }

export const modifyAccess = async (id: string, access:string)=>{
    const user = await db.user.update({
        where: {id},
        data: {
            access: access as AccountAccess,
            creditsTotal: 200
        }
    });
    return user;
}

export const modifyName = async (id: string, name:string)=>{
    const user = await db.user.update({
        where: {id},
        data: {
            name:name
        }
    });
    return user;
}

export const modifyPassword = async (id: string, password:string)=>{
    const user = await db.user.update({
        where: {id},
        data: {
            password
        }
    });
    return user;
}

export const getRecentSessions = async (userId: string) => {
    const recentLogins = await db.session.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
    });
    return recentLogins;
}

export const increaseCredits = async (userId: string, credits: number) => {
    const user = await db.user.update({
        where: { id: userId },
        data: {
            creditsUsed: {
                increment: credits
            }
        }
    });
    return user;
}