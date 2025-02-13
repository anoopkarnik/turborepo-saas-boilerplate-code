import { NextApiResponse } from "next";
import db from "@repo/prisma-db/mongo-client"

export default async function GET(res: NextApiResponse){
    try{
        const users = await db.twitterUser.findMany(
            {orderBy:{createdAt:'desc'}}
        );
        return res.status(200).json(users);
    }catch(error){
        console.log(error)
        return res.status(400).end();
    }
}