import React, { Component } from "react";
import shortid from "shortid";
import Textarea from "react-textarea-autosize";
import { connect } from "react-redux";
import "./SignUp.scss";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      password: "",
      passwordConfirm: ""
    };
  }

  // input 이 다 다른데 함수를 각자 만들어줘야 하나.?
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { name, username, password, passwordConfirm } = this.state;
    const userId = shortid.generate();

    if (
      name &&
      username &&
      password &&
      passwordConfirm &&
      password === passwordConfirm
    ) {
      dispatch({
        type: "ADD_USER",
        payload: { name, username, password, userId }
      });
      this.setState({
        name: "",
        username: "",
        password: "",
        passwordConfirm: ""
      });
      //history.push("/");
    }
  };

  render = () => {
    const { name, username, password, passwordConfirm } = this.state;
    return (
      <div className="signup-page">
        <div className="signup-page-wrapper">
          <div className="signup-page-info">
            <div className="signup-heading">
              <h1>회원가입</h1>
            </div>
          </div>
        </div>
        <form name="form" className="form">
          <div className={"form-group" + (!name ? " has-error" : "")}>
            <label htmlFor="name">이름{"\n"}</label>
            {/* <input
              type="text"
              className="input-text"
              name="name"
              value={name}
              onChange={this.handleChange}
            /> */}
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              name="name"
              value={name}
              onChange={this.handleChange}
              spellCheck={false}
              className="textarea"
            />
            {!name && <div className="submit-block">이름을 입력해주세요.</div>}
          </div>
          <div className={"form-group" + (!username ? " has-error" : "")}>
            <label htmlFor="username">이메일</label>
            {/* <input
              type="text"
              className="input-text"
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
              className="input-text"
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
          <div
            className={
              "form-group" +
              (!passwordConfirm && password !== passwordConfirm
                ? " has-error"
                : "")
            }
          >
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            {/* <input
              type="password"
              className="input-text"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={this.handleChange}
            /> */}
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={this.handleChange}
              spellCheck={false}
              className="textarea"
            />
            {password !== passwordConfirm && (
              <div className="submit-block">
                비밀번호를 다시 한번 입력해주세요. 혹은 비밀번호가 일치하는 지
                확인해주세요.
              </div>
            )}
          </div>
          <div className="form-group">
            <button className="signup-button" onClick={this.handleSubmit}>
              회원가입
            </button>
            {/* {this.state.submitted === true
              ? alert("회원가입이 되었습니다. 로그인 페이지로 이동합니다.") &&
                history.push("/")
              : null} */}
          </div>
        </form>
      </div>
    );
  };
}

export default connect()(SignUp);
