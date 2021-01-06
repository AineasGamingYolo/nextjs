import * as Constants from '../constants'

import Link from 'next/link'
import {useState} from 'react'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'

export default function Login () {

  const token = cookie.get('token')
  const user = cookie.get('user')
  
  const [error, setError] = useState(false)
  const [username_or_email,setUsername_or_email] = useState("")
  const [password,setPassword] = useState("")
  const router  = useRouter()

  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });

  const [formData, updateFormData] = useState(initialFormData);
  
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const userLogin = async (e)=>{
    e.preventDefault()
 // try {
    // Post Data to external API

    if (username_or_email === "") {
      setError("Please specify your username or email!")
      return
    }
    
    if (password === "") {
      setError("Please specify your password!")
      return
    }
    
    const res1 = await fetch(Constants.LOGIN_API_URL,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username_or_email,
          password
        })
      }).then((t) => t.json())
    
      if(res1.token || res1.user){ // Set cookies
        //console.log(res1)
        //console.log(res1.token)
        //console.log(res1.user)
        cookie.set('token',res1.token, {expires: 1/48})
        cookie.set('user',res1.user, {expires: 1/48})
        router.push('/')
      }  


      if (res1.non_field_errors) {
        //console.log(res1.non_field_errors)    
        setError(res1.non_field_errors) 
      }
    }
  const decoded_user = decodeURIComponent(user) // Decode the user cookie from URI encoding
  //console.log(decoded_user)
     if (token || user) {
       return <p>You are already logged in!</p> 
     } else {
  return <>
    <div className="container card authcard center-align">
      <h3>LOGIN</h3>
      <form>
         <input type="username" onChange={handleChange} placeholder="Email or Username"
          value={username_or_email}
          onChange={(e)=>setUsername_or_email(e.target.value)}
          />
          <br />
          <input type="password" onChange={handleChange} placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
            {error}
          <br />
            <button type="submit" onClick={userLogin}>login
              <i></i>
          </button>
      </form>
     
    </div>
  </>
 }
}