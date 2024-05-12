import prisma from "@/utils/connect";
import { NextResponse } from "next/server"
import { getAuthSession } from "@/utils/auth";


// GET ALL POSTS
export const GET =async (req) =>{ 
   
    const {searchParams} = new URL(req.url)
   
   const page =searchParams.get('page');
   const cat =searchParams.get('cat');

    const POST_PER_PAGE=2;
    const query={
        take:POST_PER_PAGE,
        skip:POST_PER_PAGE *(page-1),
        where:{
            ...(cat && {catSlug:cat})
        }
    }

    try {
        const [posts,count]= await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({ where:query.where }),
           
        ]
        )
       
        return new NextResponse(JSON.stringify({posts,count},{status:200}));
        
    } catch (error) 
    {   return new NextResponse(JSON.stringify({message:"Something went wrong"},{status:500}));
        
    }

}




// ADD New POST USER
export const POST = async(req)=>{

    let isExist;
    const session = await getAuthSession();
    if(!session){
        return new NextResponse(JSON.stringify("Authentication failed "),{status: 400,})
    }
    const body =await req.json();
    if(!body.description || !body.title || !body.catSlug || !body.slug ){
        console.log("empty body");
        return new NextResponse(JSON.stringify("Empty POST !!"),{status: 400,})
    }
    console.log(body)
   
             isExist= await prisma.post.findUnique({
                where:{
                    slug:body.slug
                }

            })

        
   
    console.log("existing",isExist)
    try {
        if(!isExist){

            const post= await prisma.post.create({
                data:{
                    ...body,userEmail:session.user.email
                }
            })
            return new NextResponse(JSON.stringify(post,{status:200},{Message:"Post adeded with succes"}))
            
        }
        else{
            return new NextResponse(JSON.stringify("Change The Title"),{status:400})
        }

        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({Error:"Somthing Wrong "},{status:500}))
        
    }


}

// DELETE POST
export const DELETE =async(req)=>{

    const session = await getAuthSession();
    if(!session) return new NextResponse(JSON.stringify("Authentication Failed"),{status:500});

    // Get from the front-end the id of the specific post to delete and the id of the user("email")
    const body= await req.json();
    const {id}=body;
    
    if(body.userEmail !== session.user.email)
         return new NextResponse(JSON.stringify("Somthing Wrong email from fron-end d"),{status:500});

    console.log(id)
    try {
        const postDeleted = await prisma.post.delete({
            where: { id },
           
          })
          return new NextResponse(JSON.stringify("Post deleted"),{status:200});
        
    } catch (error) {
        return new NextResponse(JSON.stringify("Somthing Wrong"),{status:400});

        
    }




}