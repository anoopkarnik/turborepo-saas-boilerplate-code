import { GetTwitterUserDetails } from "../../../(home)/twitter-clone/_actions/user";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const user = await GetTwitterUserDetails();
        return NextResponse.json(user, { status: 200 });
    }catch(error){
        console.log(error)
        return NextResponse.json( { message: 'Failed to fetch user details' }, { status: 200 });
    }
}
