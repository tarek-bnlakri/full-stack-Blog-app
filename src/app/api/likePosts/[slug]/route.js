import prisma from "@/utils/connect"
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

export const POST =async(req,{params})=>{
    const session = await getAuthSession();
     if(!session) return new NextResponse(JSON.stringify("Auth is required"),{status:500});
    
    //  Get our Slug Post 
    const {slug}=params;

    //  Get Data From The Front-End 
    const body = await req.json();
    const {emailUser}=body;

    try {
            const checkTheUserIsLike=await prisma.LikePost.findFirst({
                where:{ userEmail: emailUser,
                        slugpost: slug
                }
            })
            if(!checkTheUserIsLike){
                const result =await prisma.LikePost.create({
                    data:{
                        slugpost:slug,
                        userEmail:emailUser
                    }
                    
                })
                return new NextResponse(JSON.stringify("Like added w"),{status:200});
            } 
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error),{status:500});
    }




}
export const GET =async(req,{params})=>{
    const session = await getAuthSession();
    if(!session) return new NextResponse(JSON.stringify("Auth is required"),{status:500});

    
    const {slug}=params;

    try {
            
        const usersLike= await prisma.LikePost.findMany({
            where:{
                slugpost: slug
            },
            include:{
                user:true,
            },
           
        })
    
        const nbrUsersWhouLike=usersLike.length
       
       const userLoginIsLike= usersLike.some(obj => obj.userEmail ===session.user.email )
     
          
        return new NextResponse(JSON.stringify({usersLike,userLoginIsLike,nbrUsersWhouLike}),{status:200});
        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify("Somthing Wrong"),{status:500});
        
    }


}

export const DELETE=async(req,{params})=>{
    const session = await getAuthSession();
    if(!session) return new NextResponse(JSON.stringify("Authentication Failed"),{status:401});

    // get Data from Front-end
    const body = await req.json();
    const {emailUser}=body;

    // Get our slug post 
    const {slug}=params

    try {
            const resultOfDelting= await prisma.LikePost.deleteMany({
                where:{
                        slugpost:slug,
                        userEmail:emailUser

                }
            })
            return new NextResponse(JSON.stringify("Deleted successfully",{status:200}))
        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify("Somthing wrong",{status:500}))
        
    }


}