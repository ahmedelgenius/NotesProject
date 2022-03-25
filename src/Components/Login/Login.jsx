import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [user,setUser]=useState({email:'',password:''})
    const [error ,setError]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    // let myUser=[...user];
    let navigate = useNavigate();
    function userData({target}){
    setUser({...user,[target.name]:target.value})
    }
    
    async function sendData(e){
        e.preventDefault();
        setIsLoading(true)
            let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin',user)
    if (data.message === 'success'){
        localStorage.setItem('userToken' ,data.token)
        setIsLoading(false)
        navigate('/home')
    }
    else{
    setError(data.message)
    setIsLoading(false)
    }
    }
      return (
        <>
        <div className="container my-5 py-5">
            <div className="col-md-5 m-auto text-center">
                <form onSubmit={sendData}>
                    <div className="form-group">
                        <input onChange={userData} placeholder="Enter email" type="email" name="email" className="form-control" />
                    </div>
                    <div className="form-group my-2 ">
                        <input onChange={userData} placeholder="Enter you password" type="password" name="password" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-info w-100">{isLoading?<i className='fa-solid fa-spinner fa-spin'></i>:'SignIn'} </button>
                    {error?<div className="alert alert-danger mt-2">{error}</div>:''}
                </form>
            </div>
        </div>
        </>
      )
    }

export default Login;