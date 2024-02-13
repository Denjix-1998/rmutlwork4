import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios

export default function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3002/getUser/${id}`) // Use template literals to insert id
      .then(result => {
     
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch(err => console.log(err));
  }, [id]); // Add id as a dependency

  const Update = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3002/updateUser/${id}`, { name, email, age }) // Send data to update
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => console.log(err));
  };
  return (
    <form onSubmit={Update}>
      <h2>Update User</h2>
      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter Age" />
      </div>
      <button type="submit" className="btn btn-success">Submit</button>
    </form>
  );
}
