import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FaSignOut from "react-icons/lib/fa/sign-out";
import FaSignIn from "react-icons/lib/fa/sign-in";
import kanbanLogo from "../../../assets/images/kanban-logo.svg";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import FaLogin from "react-icons/lib/fa/user";
import Popup from "reactjs-popup";
import "./Header.scss";

class Header extends Component {
  static propTypes = { user: PropTypes.object };

  constructor(props) {
    super(props);
    this.state = {};
  }
  editButton = () => {
    //const { history } = this.props;
    window.location.replace("/edit");
    //history.push("/edit");
  };

  onDeleteButton = () => {
    const { user, dispatch } = this.props;
    let _id = user._id;
    //console.log(_id, "dispatch id");
    dispatch({
      type: "DELETE_USER",
      payload: { _id }
    });
  };

  render = () => {
    const { user } = this.props;
    console.log(user, "현재 user 확인");
    return (
      <header>
        <Link to="/" className="header-title">
          &nbsp;ModiWorker
        </Link>
        <div className="header-right-side">
          <Popup
            trigger={
              <div className="modal-icon-sub">
                <FaLogin className="guest-icon" />
                Edit
              </div>
            }
            className="popup-size"
            position="bottom center"
            closeOnDocumentClick
          >
            <div className="modal-message">
              <button className="info-edit-btn" onClick={this.editButton}>
                회원정보 수정
              </button>
              <Popup
                trigger={<button className="info-delete-btn">회원탈퇴</button>}
                position="bottom center"
                closeOnDocumentClick
              >
                <div>
                  탈퇴하시겠습니까? <br />
                  아래 버튼을 클릭하시면, <br />
                  탈퇴 처리됩니다.
                </div>
                <button
                  className="delete-confirm-btn"
                  onClick={this.onDeleteButton}
                >
                  탈퇴
                </button>
              </Popup>
            </div>
          </Popup>
          {user ? (
            <a className="signout-link" href="/api/signout">
              <FaSignOut className="signout-icon" />
              &nbsp;Sign out
            </a>
          ) : (
            <a className="signout-link" href="/">
              <FaSignIn className="signout-icon" />
              &nbsp;Sign in
            </a>
          )}
        </div>
      </header>
    );
  };
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Header);
