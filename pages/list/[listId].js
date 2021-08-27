import {MongoClient, ObjectId} from 'mongodb'; 

import Head from 'next/head'; 



function list(props){
    return(
        <>
        <Head>
            <title>{props.listData.title}</title>
            <meta property="og:title" content={props.listData.title}/>
            <meta property="og:type" content="website"/>
            <meta property="og:image" content="https://image.shutterstock.com/image-vector/shopping-list-flat-icon-long-600w-234877882.jpg" />
            <meta property= "og:description" content={props.listData.content}/>
        </Head>
        <h1>
            Checkout your list!
        </h1>
        <h3>Title: {props.listData.title}</h3>
        <p> Content: {props.listData.content}</p>
        </>
    )
}


export async function getStaticPaths(){
    const client= await   MongoClient.connect('mongodb+srv://Ruthvik:ruthvik@cluster0.k1t4m.mongodb.net/dynamicLists?retryWrites=true&w=majority');
    const db = client.db();

    const listsCollection = db.collection('lists');

    const lists= await listsCollection.find({},{_id:1}).toArray();

    client.close();
    return {
        fallback: 'blocking',
        paths: lists.map((list)=> ({params: {listId: list._id.toString()},     
    })) 
    }
}
export async function getStaticProps(context){
    const listId= context.params.listId;
    const client= await   MongoClient.connect('mongodb+srv://Ruthvik:ruthvik@cluster0.k1t4m.mongodb.net/dynamicLists?retryWrites=true&w=majority');
    const db = client.db();

    const listsCollection = db.collection('lists');

    const list= await listsCollection.findOne({_id:ObjectId(listId) });
    
    return {
        props: {
            listData:{
                id: list._id.toString(), 
                title: list.title, 
                content: list.content
            }
        }
    }
    

}
export default list;