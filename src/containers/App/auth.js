import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import connectedAuthWrapper from "redux-auth-wrapper/connectedAuthWrapper";
import { routerActions } from "react-router-redux";

const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  authenticatingSelector: ({ firebase: { auth } }) => !auth.isLoaded,
  wrapperDisplayName: "UserIsAuthenticated"
};

const userIsAuthenticatedRedirDefaults = {
  ...userIsAuthenticatedDefaults,
  redirectPath: "/login",
  redirectAction: newLoc => dispatch => {
    routerActions.replace(newLoc);
    dispatch({ type: "UNAUTHED_REDIRECT" });
  }
};

export const userIsAuthenticated = connectedAuthWrapper(
  userIsAuthenticatedDefaults
);

export const userIsAuthenticatedRedir = connectedRouterRedirect(
  userIsAuthenticatedRedirDefaults
);

export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: "/",
  allowRedirectBack: false,
  authenticatedSelector: ({ firebase: { profile } }) =>
    profile.isLoaded && profile.god,
  authenticatingSelector: ({ firebase: { profile } }) => !profile.isLoaded,
  redirectAction: routerActions.replace,
  wrapperDisplayName: "UserIsAdmin"
});

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  wrapperDisplayName: "UserIsNotAuthenticated"
};

export const userIsNotAuthenticated = connectedAuthWrapper(
  userIsNotAuthenticatedDefaults
);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  // eslint-disable-next-line
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/deals",
  allowRedirectBack: false
});
