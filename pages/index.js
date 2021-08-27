import { useRouter } from "next/dist/client/router";
import {MongoClient} from 'mongodb';
import Link from 'next/link'

function HomePage(props){

  const router= useRouter();
  const createList= (e)=>{
    router.push('/makeList');
  }

  return(
    <>
    <h1>OG List Generator</h1>
    <button onClick={(e)=>createList(e)}>Create a list!</button>

    { props.lists.map((list, index)=>(
      <>
      <h4>Title: {list.title}</h4>
      <Link href={`/list/${list.id}`}>{`/list/${list.id}`}</Link>
      <p>Content: {list.content}</p>

      </>
    ))
  }
    </>
    );

}
export async function getStaticProps(){

  const client= await   MongoClient.connect('mongodb+srv://Ruthvik:ruthvik@cluster0.k1t4m.mongodb.net/dynamicLists?retryWrites=true&w=majority');
  const db = client.db();

  const listsCollection = db.collection('lists');

  const lists= await listsCollection.find().toArray();

  client.close();

  return{
    props:{
      lists: lists.map(list=>({
        title: list.title,
        content: list.content,
        id: list._id.toString(),
      }))
    },
    revalidate: 1
  };
}

export default HomePage;