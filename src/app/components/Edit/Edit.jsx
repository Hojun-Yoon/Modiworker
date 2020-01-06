import React, { Component } from "react";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import "./Edit.scss";

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      name: "",
      password: "",
      passwordConfirm: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { dispatch, user } = this.props;
    const { name, password } = this.state;

    let username = user.username;

    dispatch({
      type: "USER_EDIT",
      payload: { username, name, password }
    });
  };

  render = () => {
    const { name, password, passwordConfirm } = this.state;
    const { user } = this.props;
    return (
      <div className="edit-page">
        <div className="edit-page-wrapper">
          <div className="edit-page-info">
            <div className="edit-heading">
              <h1>회원정보 수정</h1>
            </div>
          </div>
        </div>
        <form name="form" className="form">
          <div className={"form-group" + (!user.username ? " has-error" : "")}>
            <label htmlFor="username">이메일</label>
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              disabled="disabled"
              name="username"
              value={user.username}
              spellCheck={false}
              className="textarea"
            />
          </div>
          <div className={"form-group" + (!name ? " has-error" : "")}>
            <label htmlFor="name">이름</label>
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              name="name"
              placeholder={user.name}
              value={name}
              onChange={this.handleChange}
              spellCheck={false}
              className="textarea"
            />
          </div>
          <div className={"form-group" + (!password ? " has-error" : "")}>
            <label htmlFor="password">비밀번호</label>
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
            <button className="edit-button" onClick={this.handleSubmit}>
              수정
            </button>
          </div>
        </form>
      </div>
    );
  };
}
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Edit);
