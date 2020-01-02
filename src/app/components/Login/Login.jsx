import React, { Component } from "react";
import { connect } from "mongoose";

// 제출해서 db 에 있는 정보와 일치했을 경우 상태값을 바꾸어준다.
// 로그인 하였을 경우 해당 로그인 게정으로 보드를 등록할 수 있게끔 조치한다.
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
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
    const { email, password } = this.state;

    dispatch({
      type: "USER_CONFIRM",
      payload: { email, password }
    });
  };

  render = () => {
    const { email, password } = this.state;

    return (
      <div className="login_submit">
        <h2>로그인</h2>
        <form name="form">
          <div className={"form-group" + (!email ? " has-error" : "")}>
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              className="input-text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            {!name && (
              <div className="submit-block">이메일을 입력해주세요.</div>
            )}
          </div>
          <div className={"form-group" + (!password ? " has-error" : "")}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              className="input-text"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            {!password && (
              <div className="submit-block">비밀번호를 입력해주세요.</div>
            )}
          </div>
          <div className="form-group">
            <button className="confirm-button" onClick={this.handleSubmit}>
              로그인
            </button>
          </div>
        </form>
      </div>
    );
  };
}

export default connect()(Login);
