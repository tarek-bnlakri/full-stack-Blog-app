export const getData = async(data)=>{

    const res = await fetch(`http://localhost:3000/api/${data}`,{cache:"no-store"})
    if(!res.ok){
        throw new Error("Could not get data from server")
    }
    return res.json();

}
export const getDataWithPage = async(data,page,cat)=>{
    
    const res = await fetch(`http://localhost:3000/api/${data}?page=${page}&cat=${cat || ""}`,{cache:"no-store"})
    if(!res.ok){
        throw new Error("Could not get data from server")
    }
    return res.json();

}
export const getPostsUserWithPage = async(emailUser)=>{
    
    const res = await fetch(`http://localhost:3000/api/user/userPosts?emailUser=${emailUser}`,{cache:"no-store"})
    if(!res.ok){
        throw new Error("Could not get data from server")
    }
    return res.json();

}