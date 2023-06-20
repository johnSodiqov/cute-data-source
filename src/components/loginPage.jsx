import React, { useEffect, useState } from 'react';
import Userdata from './Userdata';
import "./loginPage.css"
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [login, setlogin] = useState("");
    const [password, setpassword] = useState("");
    const [users, setusers] = useState([]);
    const navigate = useNavigate();
    const [isCorrect, setisCorrect] = useState(false);

    
    useEffect(() => {
        Userdata.getData()
            .then(res => {
                setusers(res)
            })
    }, []);

    function userCheck() {
        for (let i = 0; i < users.length; i++) {
            if ((users[i].login === login) && (users[i].password === password)) {
                navigate("/cards", { state: users[i].isAdmin })
                console.log(users[i].isAdmin);
            }
            else {
                setisCorrect(true)
            }
        }
    }
    return (
        <div className='container'>
            <div className="form">
                <h2 className='m-2'>Login</h2>
                <input type="text" className='form-control my-2' placeholder='login' onInput={(login) => setlogin(login.target.value)} />
                <h2 className='m-2 '>Password</h2>
                <input type="password" className='form-control my-2' placeholder='password' onInput={(password) => setpassword(password.target.value)} />
                <h5 className='text-danger text-center w-100 my-2'>{(isCorrect) ? "Password or login is incorrect" : " "}</h5>
                <button className='btn px-3 py-1 fs-4' onClick={() => userCheck()}>Log in</button>
                <p className='w-100 text-center mt-2 text-secondary'>login: user; password: user;</p>
            </div>
        </div>
    );
}

export default LoginPage;
