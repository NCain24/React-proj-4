import { useState, useContext } from 'react';
import AuthContext from '../store/authContext';
import axios from 'axios';

const Auth = () => {
  const authCtx = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (register) {
      axios
        .post('/register', {
          username,
          password,
        })
        .then((res) => {
          authCtx.login(res.data.token, res.data.exp, res.data.userId)
          console.log('this is the register', res.data)
        })
        .catch((err) => alert(err));
    } else {
      axios
        .post('/login', {
          username,
          password,
        })
        .then((res) => {
            authCtx
              .login(res.data.token, res.data.exp, res.data.userId)
              console.log(res.data)
            })
            .catch((err) => alert(err));
    }

    console.log(username, password);
  };

  return (
    <main>
      <h1>Welcome</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">{register ? 'Register' : 'Login'}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? 'Login' : 'Register' }?
      </button>
    </main>
  );
};

export default Auth;
