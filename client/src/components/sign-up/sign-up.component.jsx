import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { Radio,RadioGroup,FormControlLabel,FormControl,FormLabel } from '@material-ui/core';
import './sign-up.styles.css';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role:'Client',

    };
  }

  checkPassWord = (password) => {
    // if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(password)) {
    //   return true;
    // }
    return true;
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    const { password, confirmPassword } = this.state;
    if (password.length < 4) {                                   //*  originaly was 8 char.  *//
      alert("Password should not be less than 4 charecters")
      return
    }
    if (password !== confirmPassword) {
      alert("Passwords Don't Match")
      return;
    }

    // sign up the user
    fetch('http://localhost:5000/user/signup', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("jwt-auth", data.token)
          localStorage.setItem("current-user", data.displayName)
          return true
        } else if (data.message) {
          alert("Email Already Exists")
        } else {
          alert("User Name already Exists")
        }

        console.log('Success:', data);
      })
      .then(() => window.location.reload())
      .catch((error) => {
        console.error('Error:', error);
      });
    this.setState({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role:'',
    })


  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }


  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <h2 className='title'>Sign Up</h2>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            placeholder='Display Name'
            required
          />
          <div className="username error" ></div>

          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            placeholder='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            placeholder='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            placeholder='Confirm Password'
            required
          />
          <FormControl>
            <FormLabel FormLabel id="user-role">choose your role</FormLabel>
            <RadioGroup
              aria-labelledby="user-role"
              defaultValue="Client"
              name="role"
              onChange={this.handleChange}
            >
              <FormControlLabel value="Client" control={<Radio />} label="Client" />
              <FormControlLabel value="Realtor" control={<Radio />} label="Realtor" />
              <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>
          <CustomButton type='submit'>SIGN UP</CustomButton>
          <p >Already have an account? <Link to="/signin" >Sign In</Link></p>
        </form>
      </div>
    );
  }
}

export default SignUp;
