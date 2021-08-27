import { useRouter } from "next/dist/client/router";
import { useState } from "react";

function HomePage(){
  const [listItems, setListItems]=useState('');
  const [listTitle , setListTitle]= useState('');
  const router= useRouter();
   async function handleSubmit(e){


    if(listTitle==='' || listItems==='')
        return;


    const listData= {
        title: listTitle, 
        content: listItems
    }
    const response= await fetch('/api/hello',{
        method:'POST', 
        body: JSON.stringify(listData),
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data= await response.json();
    console.log(data);

    router.push('/');
  }
  return(
    <>
    <label>Title : </label>
    <br></br>
    <input type="text" label="Title" onChange={(e)=>setListTitle(e.target.value)}></input>
    <br></br>
    <label>What are you looking for?  </label>
    <br></br>
    <input type="text" label="What are you looking for" onChange={(e)=>setListItems(e.target.value)}></input>
    <br></br>
    <button onClick={(e)=>handleSubmit(e)}>Send List</button>
    </>
  )

}


export default HomePage;