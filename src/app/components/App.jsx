import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home/Home";
import BoardContainer from "./Board/BoardContainer";
import LandingPage from "./LandingPage/LandingPage";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Edit from "./Edit/Edit";
import "./App.scss";

const App = ({ user, isGuest }) => {
  // If not logged in, always redirect to landing page
  if (user._id) {
    console.log(user._id, "app 페이지 user 데이터 확인");
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/b/:boardId" component={BoardContainer} />
        <Route path="/edit" component={Edit} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      {/* <Route exact path="/" component={LandingPage} /> */}
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Redirect to="/" />
    </Switch>
  );
};

App.propTypes = { user: PropTypes.object, isGuest: PropTypes.bool.isRequired };

const mapStateToProps = state => ({ user: state.user, isGuest: state.isGuest });

// Use withRouter to prevent strange glitch where other components
// lower down in the component tree wouldn't update from URL changes
export default withRouter(connect(mapStateToProps)(App));
