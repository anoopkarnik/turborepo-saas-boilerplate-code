import { NextApiRequest, NextApiResponse } from "next";
import { GetTwitterUserDetails } from "../../../(home)/twitter-clone/_actions/user";

export async function GET(req: NextApiRequest,res: NextApiResponse){
    try{
        const user = await GetTwitterUserDetails();
        return res.status(200).json(user);
    }catch(error){
        console.log(error)
        return res.status(400).end();
    }
}
