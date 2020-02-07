import React from 'react';

import UserFieldElements from './UserFieldChildren/UserFieldElements.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class UserField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userFields: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.renderOrNot = this.renderOrNot.bind(this);
  }

  listenToFirebase() {
    this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      this.setState({ userFields: doc.data() });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.listenToFirebase();
    }
  }

  renderOrNot() {
    if(this.state.userFields) {
      return <UserFieldElements info={this.state.userFields} />;
    }
  }

  render() {
    return (
      <div>
        {(this.state.userFields) ? <UserFieldElements info={this.state.userFields} /> : <CircularProgress />}
      </div>
    )
  }
}

export default UserField;
