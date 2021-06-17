import React, {Component, useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { useHistory} from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import '../css/bootstrap.min.css';
import '../css/site.css';

const Register = () => {
    const [uname, setUname] = useState("");
    const [pwd, setPwd] = useState("");
    const [email, setEmail] = useState("");

    let history = useHistory();
    let handleSubmit = (e) => {
        e.preventDefault();

        var data = {
            user_name: uname,
            password: pwd,
            email: email
        }
        // console.log(data);
        axios.defaults.baseURL = "http://localhost:5000/YetEvents/api";
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post(`/users`, data).then(response => {
            if (response.data) {
                history.push('/login');
            } 
        });
    }

        return(
            <div className="card-body mx-auto" style={{maxWidth: 400}}>
            <article className="card-body">
                <h4 className="card-title text-center mb-4 mt-1">Sign Up</h4>
                <hr />
                <form onSubmit={handleSubmit} method="post">
                <div className="form-group input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-user" /> </span>
                    </div>
                    <input onChange={e => setUname(e.target.value) } className="form-control" placeholder="Full name" />
                    <span className="text-danger" />
                </div>
                <div className="form-group input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-envelope" /> </span>
                    </div>
                    <input onChange={e => setEmail(e.target.value) } className="form-control" placeholder="Email address" />
                    <span className="text-danger" />
                </div>
                <div className="form-group input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                    </div>
                    <input onChange={e => setPwd(e.target.value) } type="password" className="form-control" placeholder="Create password" />
                    <span className="text-danger" />
                </div>
                <div className="form-group text-center mb-4">
                    <input type="submit" value="Register" className="btn btn-block mt-4" style={{background: 'rgb(240, 85, 55)', marginTop: '10px', color: 'white'}} />
                </div>
                <p className="text-center">Have an account? <a href="/login" style={{color: 'gray'}}>Log In</a> </p>  
                </form>
            </article>
            </div>
        )
    }
export default Register;