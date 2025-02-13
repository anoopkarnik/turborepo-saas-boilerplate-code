import { NextApiRequest, NextApiResponse } from "next";
import db from "@repo/prisma-db/mongo-client"

export default async function GET(req: NextApiRequest, res: NextApiResponse){
    try{
        const {userId} = req.query;
        if(!userId || typeof userId !== 'string'){
            throw new Error('Invalid userId');
        }
        const existingUser = await db.twitterUser.findUnique(
            {where:{id:userId}}
        );
        const followersCount = await db.twitterUser.count({
            where:{
                followingIds:{
                    has:userId
                }
            }
        })
        return res.status(200).json({...existingUser, followersCount});
    }catch(error){
        console.log(error)
        return res.status(400).end();
    }
}