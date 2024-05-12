import prisma from "@/utils/connect"
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";



// GET Posts for specific user
export const GET =async(req,{params})=>{
    const session = await getAuthSession();
    if(!session){
        return new NextResponse(JSON.stringify("Authentication failed "),{status: 400,})
    }
    // GET user Email from the url 
    const {emailUser}=params;
    console.log(emailUser)
  
    try {
        const userPosts= await prisma.post.findMany({
            where: {
                userEmail:emailUser
              },
        }) 
    
        console.log(userPosts)

        return new NextResponse(JSON.stringify(userPosts),{status:200});
    } catch (error) {
        return new  NextResponse(JSON.stringify(error),{status:400});
    }
}

