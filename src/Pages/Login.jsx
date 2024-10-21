import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';




const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const Login = () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      setError(true)
      return
    } else {
      setError(false)
      console.log(email);
      console.log(password);
    }


  }
  return (
    <div className='container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 20 }}>
      <h1 style={{
        fontSize: 50,
        background: 'linear-gradient(to right, white, violet, pink)',
        WebkitBackgroundClip: 'text',
        color: 'transparent', 
      }}>ДОБРО ПОЖАЛОВАТЬ AKYL<span style={{color: 'white'}}> AI</span></h1>
      <div className="form" style={{ width: 500, background: 'linear-gradient(to right, white, violet, pink)', display: 'flex', flexDirection: 'column', padding: '30px 30px', textAlign: 'center', gap: 20, alignItems: 'center', borderRadius: 10 }}>
        <h1 style={{ color: 'black', fontWeight: 600 }}>Войти</h1>
        {error && (<h1 style={{ fontSize: 14, color: 'red' }}>Заполните форма</h1>)}
        <TextField sx={{ width: '250px' }} label="Email" variant="standard" onChange={(e) => setEmail(e.target.value)} />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant="contained" onClick={() => {
          Login()
        }}>Войти</Button>


      </div>
    </div>
  )
}

export default Login