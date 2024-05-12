import prisma from "@/utils/connect"
import { NextResponse } from "next/server";

export const GET = async(req,{params})=>{
    const {slug}=params;
    try {
           const singlePost=await prisma.post.findUnique({
                where:{slug},
                include:{user:true}
            })
           
            return new NextResponse(JSON.stringify(singlePost,{status:200}))
        
    } catch (error) {
        return new NextResponse(JSON.stringify(error,{status:500}));
        
    }

}