import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [user,setUser] = useState({
    firstname:"",lastname:"",email:"",password:""
  })
  let name,value;
  const handleInput = (e) =>{
    console.log(e)
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value})
  }
  const PostData = async (event) => {
    const navigate = useNavigate()
     event.preventDefault();
     alert("hii")
      const {firstname,lastname,email,password}=user;
     
      const res = await fetch("http://localhost:8000/api/users/signup", {
        method:"POST",
        mode: 'cors', 
        headers:{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          firstname,lastname,email,password
        })

      })
      const data = await res.json();
      if(res.status === 422 || !data){
        window.alert("Invalid Data")
        console.log("Invalid Data")
      }else{
        window.alert("Registration Successful")
        console.log("Registration Successful")

        navigate('/sign-in')
       


      }
    }
  return (
    <>
    <form method='POST' onSubmit={PostData}>
    <h3>Sign Up</h3>
    <div className="mb-3">
      <label>First name</label>
      <input
        type="text"
        className="form-control"
        placeholder="First name"
        name='firstname'
        value={user.firstname} onChange={handleInput}
      />
    </div>
    <div className="mb-3">
      <label>Last name</label>
      <input type="text" className="form-control" name='lastname' placeholder="Last name" value={user.lastname} onChange={handleInput} />
    </div>
    <div className="mb-3">
      <label>Email address</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        name='email'
        value={user.email} onChange={handleInput}
      />
    </div>
    <div className="mb-3">
      <label>Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        name='password'
        value={user.password} onChange={handleInput}
      />
    </div>
    <div className="d-grid">
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </div>
    <p className="forgot-password text-right">
      Already registered <a href="/sign-in">sign in?</a>
    </p>
  </form>
  </>
  )
}

export default Signup