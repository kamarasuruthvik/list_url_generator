// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {MongoClient} from 'mongodb';
async function handler(req, res) {
  if(req.method ==='POST'){
    const data= req.body;
    const {title, content}= data;
 
    const client= await   MongoClient.connect('mongodb+srv://Ruthvik:ruthvik@cluster0.k1t4m.mongodb.net/dynamicLists?retryWrites=true&w=majority');
    const db = client.db();

    const listsCollection = db.collection('lists');

    const result =await listsCollection.insertOne({title, content});

    console.log(result);

    client.close();

    res.status(201).json({message: 'List is inserted'});
  }
}
export default handler;