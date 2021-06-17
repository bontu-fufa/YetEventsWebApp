import React, {Component, useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { useHistory} from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import '../css/bootstrap.min.css';
import '../css/site.css';

const Login = () => {
    const [uname, setUname] = useState("");
    const [pwd, setPwd] = useState("");

    let history = useHistory();
    let handleSubmit = (e) => {
        e.preventDefault();

        var data = {
            user_name: uname,
            password: pwd,
            email: ""
        }
        // console.log(data);
        axios.defaults.baseURL = "http://localhost:5000/YetEvents/api";
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post(`/users/login`, data).then(response => {
            if (response.data) {
                sessionStorage.setItem("userId", response.data.id);
                sessionStorage.setItem("userName", response.data.user_name);
                e.target.submit();
                history.push('/');
            } 
        });

        // if (sessionStorage.getItem("userId")){
        //     return <Redirect to="/" />
        // }        
         
    }
      
    return(
        <div className="card-body mx-auto" style={{maxWidth: 400}}>
        <article className="card-body">
            <h4 className="card-title text-center mb-4 mt-1">Sign In</h4>
            <hr />
            <form method="post" onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-user" /></span>
                </div>
                <input name="uname" className="form-control" placeholder="Username" 
                    onChange={e => setUname(e.target.value) }/>
                <span className="text-danger" />
                </div>
            </div>
            <div className="form-group mt-3">
                <div className="input-group">
                <div className="input-group-prepend ">
                    <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                </div>
                <input type="password" name="pwd" className="form-control" placeholder="********" 
                onChange={e => setPwd(e.target.value)} />
                <span className="text-danger" />
                </div>
            </div>
            <div className="form-group text-center mt-3">
                <input type="submit" defaultValue="Login" className="btn btn-block" style={{background: 'rgb(240, 85, 55)', marginTop: '10px', color: 'white'}}  />
            </div>
            </form>
        </article>
        </div>

    )
}
export default Login;