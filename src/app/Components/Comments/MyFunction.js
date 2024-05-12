// GET Comments
export const  fetcher = async (url)=>{
    const res = await fetch(url);
    if(!res.ok){
        throw new Error("Could not fetch Comments ");
    }
    
    const data = await res.json()
    return data;
}
// POST Comments
export const onSubmit=async(description,slugpost,mutate,setDescription,setError)=>{
    const res=await fetch("/api/comments",{method: "POST",
        body:JSON.stringify({description,slugpost})
        
    })
    setDescription('');
    const data= await res.json();
    setError(data.Message)
    mutate();
}