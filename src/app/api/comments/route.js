import prisma from "@/utils/connect"
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";



// Methode **GET ALL COMMENTS FROM THE DB 
export const GET= async(req)=>{
    const {searchParams} = new URL(req.url);
    // GET MY SLUG POST (Unique in my DB)
    const postSlug = searchParams.get('postSlug')
    

    try {
        const comments= await prisma.comment.findMany({
            where:{
                ...(postSlug && {slugpost:postSlug})
            },
            include:{user:true}
        }
            
        )
        // Reteurn to the front-end Comments for specified post
        return new NextResponse(JSON.stringify(comments,{status: 200}));
        
    } catch (error) {
        return new NextResponse(JSON.stringify(error,{status: 500}));
        
    }

}

// ADD NEW COMMNET TO THE DB 
export const POST= async(req)=>{
    const session = await getAuthSession();
    if(!session) {
        return new NextResponse(JSON.stringify("Authntificated is required"),{status: 400});

    }
    // get body Comment from the front-end
    const body =await req.json();
   
    // Check if the comment is not empty
    if(!body.description){
        return new NextResponse(JSON.stringify("Empty Comment !! "),{status: 400});
    }
    try {
        await prisma.comment.create({
            data:{
                ...body,userEmail:session.user.email
            }
        })
        return new NextResponse(JSON.stringify("Message added successfully"),{status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify("Somthing Wrong"),{status: 401});
    }
}

// DELETE COMMENT FROM THE DB
export const DELETE =async(req)=>{
    const session = await getAuthSession();
    if(!session) return new NextResponse(JSON.stringify("Auth is required"),{status: 401});
    // Get from the front-end id of the Comment  and email user (who did this comment || the owner of the post)
    const body = await req.json();
    const {commentId}=body
 
    let msg
    // chek if the user who is logged in is the owner of the Post 
    if(session.user.email ===body.emailOfTheUserPost){
        msg="The owner of the post will delete a specific comment "; 
        try {
            const deleteComment=await prisma.comment.delete({
                where:{id:commentId}
            })
            console.log(deleteComment);
            return new NextResponse(JSON.stringify("comment deleted successfully"),{status:200})
            
        } catch (error) {
            console.log(error);
        }   
    }
    if(session.user.email ===body.emailOfTheUserComment){
        msg="The owner for the comment will delete his comment"
                try {
                    const deleteComment=await prisma.comment.delete({
                        where:{id:commentId}
                    })
                    console.log(deleteComment);
                    return new NextResponse(JSON.stringify("comment deleted successfully"),{status:200})
                } catch (error) {
                    console.log(error);
                    
                }      
    }

}