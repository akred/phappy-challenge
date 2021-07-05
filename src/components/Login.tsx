import {CALL_LIST_URL} from '../helpers/urls'
import React, { useReducer, useEffect } from "react"
import AuthService from "../services/AuthService"
import "./Login.scss"
import Logo from "../img/aircall-logo.svg"
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'

//state type
type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "loginSuccess"; payload: string }
  | { type: "loginFailed"; payload: string }
  | { type: "setIsError"; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "loginSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "loginFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
  }
};

/**
 * Login page
 */
const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const goToCallListPage = () => history.push(CALL_LIST_URL);

  /**
   * Button submit state management
   */
  useEffect(() => {
    // Button submit state management
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.username, state.password]);

  /**
   * Make API Call to login the user
   * @param e event
   * @returns
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    return AuthService.login(state.username, state.password)
      .then((response) => {
        if (response?.statusCode !== 401) {
          dispatch({
            type: "loginSuccess",
            payload: "Login Successfully",
          });
          goToCallListPage();
        } else {
          dispatch({
            type: "loginFailed",
            payload: "Service unavailable",
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: "loginFailed",
          payload: "Service unavailable",
        });
      });
  };

  /**
   * Events management
   */

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      state.isButtonDisabled || handleSubmit(event);
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setUsername",
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };



  return (
    <div className="phappy-login container">
      <form className="box" autoComplete="off" onSubmit={handleSubmit}>
        <div className="phappy-login__logo">
          <img src={Logo} alt="Aircall" />
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              id="username"
              className="input"
              placeholder="Username"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
              data-error={state.isError}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-user"></i>
            </span>
            <span className="icon is-small is-right">
            <i className={classNames("fa", {
                  "fa-check": !!state.username
              })}></i>
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
              <i className="fa fa-lock"></i>
            </span>
            <span className="icon is-small is-right">
              <i className={classNames("fa", {
                  "fa-check": !!state.password
              })}></i>
            </span>
          </p>
        </div>
        <input
          className="button is-primary is-fullwidth"
          type="submit"
          value="Sign In"
          disabled={state.isButtonDisabled}
        />
      </form>
    </div>
  );
};

export default Login;
