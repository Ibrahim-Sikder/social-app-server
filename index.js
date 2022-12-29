const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;



// middleware 
app.use(cors());
app.use(express.json());


// database connection 


const uri = "mongodb+srv://ibrahim:hL5jpCggBgqgTtR9@cluster0.fomplst.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
try {
    const postCollection = client.db('SocialMedia').collection('social');
    const userCollection = client.db('UserInfo').collection('users');
    const updateUser = client.db('updateUsers').collection('updateUsr');

    app.get('/posts', async(req, res)=>{
        const query = {} ;
        const cursor = postCollection.find(query);
        const users = await cursor.toArray();
        res.send(users)
    })
    app.get('/showPost', async(req, res)=>{
        const query = {} 
        const cursor = postCollection.find(query);
        const users  = await cursor.limit(3).toArray();
        res.send(users);
    })
   

    app.post('/posts',   async (req, res) => {
        const user = req.body;
        const result = await postCollection.insertOne(user);
        res.send(result);
    });
    app.post('/userInfo',   async (req, res) => {
        const user = req.body;
        console.log(user)
        const result = await userCollection.insertOne(user);
        res.send(result);
    });


    app.get('/userInfo', async(req, res)=>{
        const query = {} ;
        const cursor = userCollection.find(query);
        const users = await cursor.toArray();
        res.send(users)
    })

    // update modal info
    app.post('/updateUser',   async (req, res) => {
        const user = req.body;
        console.log(user)
        const result = await updateUser.insertOne(user);
        res.send(result);
    });
    app.get('/updateUser', async(req, res)=>{
        const query = {} ;
        const cursor = updateUser.find(query);
        const users = await cursor.toArray();
        res.send(users)
    })

   


}



finally {

}
}
run().catch(err => console.error(err));

// server testing
app.get('/', (req, res) => {
    res.send('server is running now');
});


app.listen(port, () => {
    console.log(`My social media server is kaj kortece ${port}`)
})