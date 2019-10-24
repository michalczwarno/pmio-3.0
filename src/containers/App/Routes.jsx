// @flow
import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Spinner from "../../components/Spinner";
// import { userIsNotAuthenticatedRedir } from "./auth";
// import withTracker from "./withTracker";
const CompaniesList = lazy(() => import("../../components/Companies"));
const SignIn = lazy(() => import("../../components/Signin/SignIn"));
const SignUp = lazy(() => import("../../components/Signin/SignUp"));
const Home = lazy(() => import("../../components/Pricing"));
// const NotFound = lazy(() => import("../../components/SignIn"));
/*


// const OrgChart = lazy(() => import("routes/CardGridView"));
// const ResetPassword = lazy(() => import("routes/Login/ResetPassword"));

// const UserProfile = lazy(() => import("routes/UserProfile"));

// const Terms = lazy(() => import("routes/Terms/Terms"));
// const PrivacyPolicy = lazy(() => import("routes/PrivacyPolicy"));
// const ContactUs = lazy(() => import("routes/LandingPage/ContactUs/ContactUs"));

*/
export default function Routes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {/* Routes only available if not logged in */}
        <Route exact path="/" component={Home} />
        <Route exact path="/deals" component={CompaniesList} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/SignUp" component={SignUp} />
        {/*  
        <Route
          exact
          path="/signin"
          component={userIsNotAuthenticatedRedir(withTracker(SignIn))}
        />
        <Route
          exact
          path="/signup"
          component={userIsNotAuthenticatedRedir(withTracker(SignUp))}
        />
        */}
        {/* Finally, catch all unmatched routes 
        <Route component={withTracker(NotFound)} />
        */}
      </Switch>
    </Suspense>
  );
}
