import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';
import { selectUser, updateUser } from '../../redux-toolkit/userSlice';
import './../css/Index.css'

function UserHome() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const user = useSelector(selectUser)
    const[error,setError] = useState("")
    const dispatch = useDispatch('')
  
  
    useEffect(() => {
      setUsername(user.username);
      setEmail(user.email);
      setImage(user.image)
    }, []);
  
    const updateImage = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("image", image);
  
      await axios.patch(`/api/updateImage/${user.id}`, formData).then((response) => {
          setImage(response.data.image);
          dispatch(updateUser(response.data.image));
      })
      .catch((error) => setError("Please choose an image"));
    };
  
    return (
      <div>
  
          <div className="container bootstrap snippets bootdey">
              <h1 className="text-info">Profile</h1>
              <hr/>
            
              <form onSubmit={updateImage} >
                <div className="row">
                  <div className="col-md-3">
                    <div className="text-center">
                      <img src={image || "https://bootdey.com/img/Content/avatar/avatar7.png"} className="avatar img-circle img-thumbnail" alt="profile-img"/>
                      <h6>Upload a different photo...</h6>
                      
                      <input accept="image/png , image/jpeg" type="file" className="form-control my-3" onChange={(e) => setImage(e.target.files[0])}/>
                      <button className="w-100 btn btn-lg btn-primary my-2" type="submit">Update Profile</button>
                    </div>
                  </div>
                  
  
                  <div className="col-md-9 personal-info">
                    {error &&
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                      <strong>{error}</strong>
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    }
                    <h3>Personal info</h3>
                    
                      <div className="form-floating">
                        <input type="text" className="form-control" value={username} readOnly={true}/>
                        <label>Username</label>
                      </div>
                      <div className="form-floating my-4">
                        <input type="email" className="form-control" value={email} readOnly={true}/>
                        <label>Email</label>
                      </div>
                  </div>
                </div>
            </form>
          </div>
          <hr/>
      </div>
    )
}

export default UserHome
