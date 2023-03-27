import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './../css/SignUp.css'


function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const history = useHistory();
    const [emailmessage, setEmailMessage] = useState('');
    const [usermessage, setUserMessage] = useState('');
    const [passwordmessage, setPasswordMessage] = useState('');


    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                email,
                password,
                password2
            })
        });

        const content = await response.json();
        if (response.status === 200){
            history.push("/")
        }
        else{
            setEmailMessage(content.email);
            setUserMessage(content.username);
            setPasswordMessage(content.password);
        }
    }


    return (
        <div>
            <main className="form-sign-up w-100 m-auto">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Sign Up</h1>

                    <div className="form-floating">
                        <p className='text-danger'>{usermessage}</p>
                        <input type="text" className="form-control" onChange={e => setUsername(e.target.value)}/>
                        <label>User Name</label>
                    </div>

                    <div className="form-floating">
                        <p className='text-danger'>{emailmessage}</p>
                        <input type="email" className="form-control" onChange={e => setEmail(e.target.value)}/>
                        <label>Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
                        <label>Password</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" onChange={e => setPassword2(e.target.value)}/>
                        <label>Confirm Password</label>
                        <p className='text-danger'>{passwordmessage}</p>
                    </div>
                    
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
                </form>
            </main>
        
        </div>
    )
}

export default SignUp
