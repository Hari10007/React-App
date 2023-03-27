import React , {useState} from 'react'
import './../css/Login.css'
import {Redirect} from "react-router-dom"
import jwt from 'jwt-decode'
import {useDispatch} from 'react-redux'
import { login } from '../../redux-toolkit/userSlice'



function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch('')
  const [message, setMessage] = useState('');

  const submit = async (e) => {
      e.preventDefault();

      const response =  await fetch('http://localhost:8000/api/admin_login', 
      {
          method: 'POST',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              'email':email,
              'password':password
          })
      });

      const content = await response.json();
      console.log(content)
      const token = content.jwt
      if (token){
        const decode_token = jwt(token)
        localStorage.setItem('token', token);
        dispatch(login(decode_token));
        setRedirect(true);
      }
      else{
        setMessage(content.detail)
      }
  }

  if (redirect) {
      return <Redirect to="/"/>;
  }
  return (
      <main className="form-sign-in w-100 m-auto">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Admin Login</h1>
        
          <p className='text-danger'>{message}</p>
          <div className="form-floating">
            <input type="email" className="form-control" onChange={e => setEmail(e.target.value)}/>
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
            <label>Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>

      </main>
  )
}

export default AdminLogin
