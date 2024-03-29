import React , {useState} from 'react'
import './../css/Login.css'
import {Link , useHistory} from "react-router-dom"
import jwt from 'jwt-decode'
import {useDispatch} from 'react-redux'
import { login } from '../../redux-toolkit/userSlice'

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch('')

  const submit = async (e) => {
      e.preventDefault();

      const response =  await fetch('http://localhost:8000/api/login', 
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
      const token = content.jwt

      if (token){
        const decode_token = jwt(token)
        localStorage.setItem('token', token);
        dispatch(login(decode_token));
        history.push("/")
      }
      else{
        setMessage(content.detail)
      }
  }

  return (
      <main className="form-sign-in w-100 m-auto">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Login</h1>
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
        
        <Link to="/sign_up" className="w-100 btn btn-lg btn-primary my-2" >Sign Up</Link>
      </main>
  )
}

export default UserLogin
