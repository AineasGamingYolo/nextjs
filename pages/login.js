import React from 'React'
import * as Constants from '../constants'


export default function Login() {

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }

    axios.post(Constants.LOGIN_API_URL, user)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          window.location = '/home';        
        } else {
          setErrMsg(res.data.error);
        }
      })
      .catch(err => {
        setErrMsg(err.response.data.error)
        console.log(err.response.data.error);
      });
  }

}