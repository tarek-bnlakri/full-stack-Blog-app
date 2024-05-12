import prisma from "@/utils/connect";
import { NextResponse } from "next/server"

export const GET =async () =>{

    try {
        const catigoryes= await prisma.category.findMany();
        return new NextResponse(JSON.stringify(catigoryes,{status:200}));
        
    } catch (error) 
    {   return new NextResponse(JSON.stringify({message:"Something went wrong"},{status:500}));
        
    }

}