import React, { useReducer, useEffect } from 'react';
import AuthService from '../services/AuthService'


//state type

type State = {
  username: string
  password:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload
      };
  }
}

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.username, state.password]);

  const handleLogin = () => {
    AuthService.login(state.username, state.password)
        .then((response) => {
            if (response?.statusCode !== 401) {
                dispatch({
                  type: 'loginSuccess',
                  payload: 'Login Successfully'
                });
              } else {
                dispatch({
                  type: 'loginFailed',
                  payload: 'Service unavailable'
                });
              }
        })
        .catch(err =>{
            dispatch({
                type: 'loginFailed',
                payload: 'Service unavailable'
            });
        });

  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }
  return (
    <div className="container">
        <form className="box" noValidate autoComplete="off">
            <h1 className="title">Aircall App</h1>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                <input
                    id="username"
                    className="input"
                    type="email"
                    placeholder="Username"
                    onChange={handleUsernameChange}
                    onKeyPress={handleKeyPress}
                    data-error={state.isError}
                />
                <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input
                        id="password"
                        className="input"
                        type="Password"
                        placeholder="********"
                        data-helper-text={state.helperText}
                        onChange={handlePasswordChange}
                        onKeyPress={handleKeyPress}
                        data-error={state.isError}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <input
                className="button is-primary"
                type="submit"
                value="Sign In"
                onClick={handleLogin}
                disabled={state.isButtonDisabled}
            />
        </form>
    </div>
  );
}

export default Login;