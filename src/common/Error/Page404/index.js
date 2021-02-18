import React from 'react';
import { Redirect } from 'react-router-dom';

import '../error.css';
class Page extends React.Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    return (
      this.state.redirect ?
        <Redirect to="/" />
        :
        <div className="er901failed">
          <h1>Page 404 error</h1>
          <p>Page does not exist. Redirecting To Homepage in 5 seconds</p>
        </div>
    );
  }
}

export default Page;

