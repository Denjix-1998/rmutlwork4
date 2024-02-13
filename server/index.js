const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const UserModel = require('./model/User')


const app = express();  
app.use(cors())
app.use(express.json());  
mongoose.connect("mongodb+srv://nutthapong054:nutthapong10@cluster0.fl5h4.mongodb.net/?retryWrites=true&w=majority")

app.post("/createUser",(req,res)=>{
    UserModel.create(req.body) 
    .then(users=>res.json(users)) 
    .catch(err=>res.json(err))
})

app.get('/',(req,res)=>{
    UserModel.find() 
  .then(users=>res.json(users)) 
  .catch(err=>res.json(err))
}) 
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndDelete({_id:id})
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, age } = req.body;

    UserModel.findByIdAndUpdate(id, { name, email, age }, { new: true }) // { new: true } option returns the updated document
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json(err));
});
app.listen(3002,()=>{
    console.log(`port listasadsen 3002`);
}); 