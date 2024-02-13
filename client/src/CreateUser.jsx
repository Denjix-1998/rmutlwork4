import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3002/createuser", {
      name,
      email,
      age
    })
    .then(result => {
      console.log(result);
      navigate('/');
    })
    .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add User</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input type="number" className="form-control" id="age" placeholder="Enter Age" onChange={(e) => setAge(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-success">Submit</button>
    </form>
  );
}

export default CreateUser;
