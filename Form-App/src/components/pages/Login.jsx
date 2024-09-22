import { useState } from 'react'
import './SignupPage/Login.css'
import axios from 'axios';
import { toast } from 'react-toastify';
function Login() {
  const initialvalue = {
    email:"",
    password:""
  }
  const [getvalue,setvalue] = useState(initialvalue);
  console.log(getvalue);
  
   const handleChange = (e) => {
        const { name, value } = e.target;
        setvalue((prevForm) => ({ ...prevForm, [name]: value }));
    };
  const handleSubmit = async(e)=>{
    e.preventDefault()
    await axios.post("http://localhost:3000/v1/login",getvalue)
    .then((res)=>{
        console.log(res.data.message)
        toast(res.data.message)
    })
    .catch((err)=>{
        console.log(err.response)
        toast(err.response.data.message)
    })
  }
    return (
    <>
<div className="login-body">

<div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} value={getvalue.email} placeholder="Enter your email" required/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" onChange={handleChange} value={getvalue.password} placeholder="Enter your password" required/>
        </div>
        <input type="submit" value="Login"/>
    </form>
</div>

</div>
    </>
  )
}

export default Login