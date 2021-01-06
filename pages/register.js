import * as Constants from '../constants'
import {useState} from 'react'
import {useRouter} from 'next/router'
import cookie from 'js-cookie'

export default function Login () {

  const token = cookie.get('token')
  const user = cookie.get('user')
  const [error, setError] = useState(false)

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [recovery_email,setRecovery_email] = useState("")
  const [password,setPassword] = useState("")
  const [password2,setPassword2] = useState("")
  const [first_name,setFirst_name] = useState("")
  const [last_name,setLast_name] = useState("")
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
          username,
          email,
          recovery_email,
          password,
          password2,
          first_name,
          last_name
        })
      }).then((t) => t.json())
    
      if(res1.username){ // Set cookies
        //console.log(res1)
        //console.log(res1.token)
        //console.log(res1.user)
        cookie.set('email',res1.email, {expires: 1/96})
        cookie.set('password',password, {expires: 1/96})
        router.push('/login')
      }  


      if (res1.username || res1.email || res1.password || res1.password2 || res1.first_name || res1.last_name) {
        //console.log(res1.non_field_errors)    
        setError(res1.username || res1.email || res1.password || res1.password2 || res1.first_name || res1.last_name) 
      }
    }

  if (token || user) {
    return <p>You are logged in!</p> 
  } else {
  return <>
    <div className="container card authcard center-align">
      <h3>Register</h3>
      <form onSubmit={(e)=>userRegister(e)}>
         <input type="text" placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          />
          <br />  
          <input type="email" placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <br />   
          <input type="password" placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <br />  
          <input type="password" placeholder="Confirm Password"
          value={password2}
          onChange={(e)=>setPassword2(e.target.value)}
          />
          <br />  
          <input type="text" placeholder="First Name"
          value={first_name}
          onChange={(e)=>setFirst_name(e.target.value)}
          />
          <br />  
          <input type="text" placeholder="Last Name"
          value={last_name1}
          onChange={(e)=>setLast_name(e.target.value)}
          />
          <br />  
          {error}
          <br />  
            <button className="btn waves-effect waves-light #1565c0 blue darken-3" type="submit">register
              <i className="material-icons right"></i>
          </button>
      </form>
     
    </div>
  </>
  }
}