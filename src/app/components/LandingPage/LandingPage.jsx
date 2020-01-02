import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Title } from "react-head";
import FaUserSecret from "react-icons/lib/fa/user-secret";
import background1920 from "../../../assets/images/postits-1920.jpg";
import background1366 from "../../../assets/images/postits-1366.jpg";
import "./LandingPage.scss";
import work_background from "../../../assets/images/work.jpg";
import FaLogin from "react-icons/lib/fa/user";
import FaUserSignUp from "react-icons/lib/fa/user-plus";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  enterAsGuest = () => {
    this.props.dispatch({ type: "ENTER_AS_GUEST" });
  };

  render = () => (
    <div className="landing-page">
      <Title>Sign in | ModiWorker</Title>
      <div className="landing-page-background">
        <img
          srcSet={`${work_background}`}
          src={work_background}
          alt="background"
        />
      </div>
      <div className="landing-page-info-wrapper">
        <div className="landing-page-info">
          <div className="landing-page-heading">
            <h1>ModiWorker</h1>
          </div>
          <div className="guest-button-wrapper">
            <Link
              to={"/signup"}
              className="signin-button guest-button"
              onClick={this.enterAsGuest}
            >
              <FaUserSignUp className="logo-icon" /> &nbsp;Sign Up
            </Link>
          </div>
          <div className="guest-button-wrapper">
            <button
              onClick={this.enterAsGuest}
              className="signin-button guest-button"
            >
              <FaLogin className="logo-icon" /> &nbsp;Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect()(LandingPage);
