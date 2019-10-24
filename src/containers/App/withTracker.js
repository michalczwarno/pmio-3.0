// @flow
/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */

import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import { connect } from 'react-redux';

const withTracker = (WrappedComponent, options = {}) => {
  type Props = {
    location: {
      pathname: string,
    },
  };

  const HOC = class extends Component<Props> {
    componentDidMount() {
      const { location } = this.props;
      const page = location.pathname;
      this.trackPage(page);
    }

    componentDidUpdate(prevProps) {
      const { location } = this.props;
      const currentPage = prevProps.location.pathname;
      const nextPage = location.pathname;

      if (currentPage !== nextPage) {
        this.trackPage(nextPage);
      }
    }

    trackPage = page => {
      const { auth } = this.props;
      // disable google analytics logging for non-production environments
      if (process.env.NODE_ENV !== 'production') return null;

      GoogleAnalytics.set({
        page,
        userId: auth.uid,
        dimension1: auth.email, // custom email dimension
        ...options,
      });
      GoogleAnalytics.pageview(page);
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  const mapStateToProps = ({ firebase }) => ({
    auth: firebase.auth,
  });

  return connect(mapStateToProps)(HOC);
};

export default withTracker;
