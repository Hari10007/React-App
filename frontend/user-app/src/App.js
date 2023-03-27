import './App.css';
import UserLogin from './pages/UserLogin'
import { Route} from 'react-router-dom'
import SignUp from './pages/SignUp';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import NavBar from './components/navbar/NavBar';
import { useSelector } from 'react-redux'
import { selectUser } from './redux-toolkit/userSlice';


function App() {
  const user = useSelector(selectUser)

  return (
      <div className="App">
            <NavBar />
            {user?
              <Route path="/" exact>
                <Home />
              </Route>:
              <Route path="/" exact>
                <UserLogin />
              </Route>
            }
            <Route path="/sign_up">
              <SignUp />
            </Route>
            <Route path="/admin_login">
              <AdminLogin />
            </Route>
      </div>
  );
}

export default App;
