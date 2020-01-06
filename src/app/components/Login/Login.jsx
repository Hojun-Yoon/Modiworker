import React, { Component } from "react";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import "./Login.scss";

// 제출해서 db 에 있는 정보와 일치했을 경우 상태값을 바꾸어준다.
// 로그인 하였을 경우 해당 로그인 게정으로 보드를 등록할 수 있게끔 조치한다.
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      submitted: false
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { username, password } = this.state;

    dispatch({
      type: "USER_CONFIRM",
      payload: { username, password }
    });

    this.setState({
      submitted: true
    });
  };

  render = () => {
    const { user, username, password, submitted } = this.state;

    return (
      <div className="login-page">
        <div className="login-page-wrapper">
          <div className="login-page-info">
            <div className="login-heading">
              <h1>로그인</h1>
            </div>
          </div>
        </div>
        <form name="form" action="/api/auth" method="post" className="form">
          {/* <form name="form"> */}
          {/* form 형식에 유의하자 */}
          <div className={"form-group" + (!username ? " has-error" : "")}>
            <label htmlFor="username">이메일</label>
            {/* <input
              type="text"
              className="textarea"
              name="username"
              value={username}
              onChange={this.handleChange}
            /> */}
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              name="username"
              value={username}
              onChange={this.handleChange}
              spellCheck={false}
              className="textarea"
            />
            {!username && (
              <div className="submit-block">이메일을 입력해주세요.</div>
            )}
          </div>
          <div className={"form-group" + (!password ? " has-error" : "")}>
            <label htmlFor="password">비밀번호</label>
            {/* <input
              type="password"
              className="textarea"
              name="password"
              value={password}
              onChange={this.handleChange}
            /> */}
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              spellCheck={false}
              className="textarea"
            />
            {!password && (
              <div className="submit-block">비밀번호를 입력해주세요.</div>
            )}
          </div>
          <div className="form-group">
            <button className="login-button" onClick={this.handleSubmit}>
              로그인
            </button>
          </div>
        </form>
      </div>
    );
  };
}

export default connect()(Login);
