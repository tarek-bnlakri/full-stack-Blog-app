import prisma from "@/utils/connect"
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

// Add New Like For comment
export const POST =async(req)=>{
    const session = await getAuthSession();
     if(!session) return new NextResponse(JSON.stringify("Auth is required"),{status:500});
    
    //  Get id of the comment and userEmail (unique in my db) From The Front-End 
    const body = await req.json();
    const {commentIdForLike,emailUser}=body;
   
    try {
            const checkTheUserIsLike=await prisma.LikeComment.findFirst({
                where:{ userEmail: session.user.email,
                        idCom: commentIdForLike
                }
            })
          
            if(!checkTheUserIsLike){
                const result =await prisma.LikeComment.create({
                    data:{
                        userEmail: session.user.email,
                        idCom: commentIdForLike
                    }
                })
                return new NextResponse(JSON.stringify("Like added w"),{status:200});
            } 
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(error),{status:500});
    }
}


// get all users whose like this comment
export const GET =async(req)=>{
    const session = await getAuthSession();
    if(!session) return new NextResponse(JSON.stringify("Auth is required"),{status:500});
    // get My Comment id from the url 
    const {searchParams} = new URL(req.url);
    const commentIdForLike = searchParams.get('commentIdForLike')

    try {
        const usersLikeComments= await prisma.LikeComment.findMany({
            where:{
                idCom: commentIdForLike
            },
            include:{
                user:true,
            },
        })
        const nbrUsersWhouLikeComment=usersLikeComments.length
        const userLoginIsLikeComment= usersLikeComments.some(obj => obj.userEmail ===session.user.email )

        return new NextResponse(JSON.stringify({usersLikeComments,userLoginIsLikeComment,nbrUsersWhouLikeComment}),{status:200});
        
    } catch (error) {
        return new NextResponse(JSON.stringify("Somthing Wrong"),{status:500});
    }
}

// Dislike comment 
export const DELETE=async(req)=>{
    const session = await getAuthSession();
    if(!session) return new NextResponse(JSON.stringify("Authentication Failed"),{status:401});
    
    // get id comment from Front-end
    const body = await req.json();
    const {commentIdForLike}=body;
    try {
            const resultOfDelting= await prisma.LikeComment.deleteMany({
                where:{
                    userEmail: session.user.email,
                    idCom: commentIdForLike
                }
            })
            return new NextResponse(JSON.stringify("Deleted successfully",{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify("Somthing wrong",{status:500}))
    }
}