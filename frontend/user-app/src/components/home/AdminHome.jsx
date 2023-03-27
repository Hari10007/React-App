import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import { baseUrl } from '../../constants/Constants';
import './../css/Index.css'

function AdminHome() {
    let timeout;
    const [searchString, setString] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        axios.get('/api/users')
          .then(response => {
            setUsers(response.data)
            setIsLoading(false)
        })
          .catch(error => console.error(error));
    }, []);

    const getUsers = (val, clear) => {
        // clearTimeout(timeout);
        setIsLoading(true)
        if (!clear) setString(val);

        timeout = setTimeout(async () => {
            const response = await axios.get(`api/search?query=${val}`);
            setUsers(response.data)
            setIsLoading(false)
        }, 300);
    };

    const deleteUser = async (id) => {
        const req = await fetch("http://localhost:8000/api/delete_user", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'user':id
            }),
        });
        const data = await req.json();

        if (data.message === "success") {
            getUsers(searchString, true);
        } else {
            alert(data.error);
        }
    };
    return (
        <div className="main">
            <h3 className="mt-5">Admin Home</h3>


            <div>
                <div className="container">
                <input type="text" className="form-control mt-5" placeholder="Search Users Here" onChange={(e) => getUsers(e.target.value)}/>
                    {isLoading ?
                        <div class="text-center">
                            <div class="spinner-border my-5" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                        ""
                    }
                    
                    { users.length===0 ? 
                        <h3 className="text-center my-5">No Users</h3> 
                        :
                        <table className="table table table-striped mt-5">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Image</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {users.map((user, index) => {
                                    return (
                                        <tr className="table-primary align-middle" key={user.id}>
                                            <td>{user.id}</td>
                                            <td> <img src={user.image ? (baseUrl + user.image) : "https://bootdey.com/img/Content/avatar/avatar7.png"} className="user-avatar img-circle img-thumbnail" alt="profile-img"/></td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div>
    );
}
export default AdminHome
