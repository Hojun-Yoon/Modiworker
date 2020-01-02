import React, { Component } from "react";
import shortid from "shortid";
import { connect } from "react-redux";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      submitted: false
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
    const { name, email, password, passwordConfirm } = this.state;
    const userId = shortid.generate();

    if (
      name &&
      email &&
      password &&
      passwordConfirm &&
      password === passwordConfirm
    ) {
      dispatch({
        type: "ADD_USER",
        payload: { name, email, password, userId }
      });
      this.setState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        submitted: true
      });
      //history.push("/");
    }
  };

  render = () => {
    const { name, email, password, passwordConfirm, submitted } = this.state;
    const { history } = this.props;
    console.log("테스트 중입니다.", this.state.name);
    console.log(name, email);
    // onSubmit={this.handleSubmit}
    return (
      <div className="signup_submit">
        <h2>회원가입</h2>
        <form name="form">
          <div className={"form-group" + (!name ? " has-error" : "")}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              className="input-text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            {!name && <div className="submit-block">이름을 입력해주세요.</div>}
          </div>
          <div className={"form-group" + (!email ? " has-error" : "")}>
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              className="input-text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            {!email && (
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
          <div
            className={
              "form-group" +
              (!passwordConfirm && password !== passwordConfirm
                ? " has-error"
                : "")
            }
          >
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              type="password"
              className="input-text"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={this.handleChange}
            />
            {password !== passwordConfirm && (
              <div className="submit-block">
                비밀번호를 다시 한번 입력해주세요. 혹은 비밀번호가 일치하는 지
                확인해주세요.
              </div>
            )}
          </div>
          <div className="form-group">
            <button className="confirm-btn" onClick={this.handleSubmit}>
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
