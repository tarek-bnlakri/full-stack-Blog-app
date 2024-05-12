import prisma from "@/utils/connect"
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

// Profile User
export const GET =async(req,{params})=>{
    const session = await getAuthSession();
    if(!session){
        return new NextResponse(JSON.stringify("Authentication failed "),{status: 400,})
    }

    // get userEmail from the front-end
    const {emailUser}=params;
    console.log(emailUser);
    try {
        const userProfile= await prisma.user.findUnique({
            where:{email:emailUser}
        })
        return new NextResponse(JSON.stringify(userProfile),{status:200});
        
    } catch (error) {
        return new  NextResponse(JSON.stringify(error),{status:400});
    }



}

// Update user profile (image, username)
export const PUT=async(req,{params})=>{
    const session = await getAuthSession();
    if(!session){
        return new NextResponse(JSON.stringify("Authentication failed "),{status: 400})
    }
    const body= await req.json();
    const {emailUser}= params;
    const {userName,media}= body;
    try {
                 await prisma.user.update({
                    where: { email: emailUser },
                    data: { name: userName,image:media },
                  })
                  return new NextResponse(JSON.stringify("User profile updated"),{status:200})

    } catch (error) {
        return new NextResponse(JSON.stringify("Somthing went wrong "),{status:400})

    }
    
}