import React from 'react';

import RentalFieldElements from './RentalFieldChildren/RentalFieldElements.js';

class RentalField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      rentalInfo: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.renderOrNot = this.renderOrNot.bind(this);
  }

  listenToFirebase() {
    this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      this.setState({ rentalInfo: doc.data() });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.listenToFirebase();
    }
  }

  renderOrNot() {
    if(this.state.rentalInfo) {
      return <RentalFieldElements info={this.state.rentalInfo} />;
    }
  }

  render() {
    return (
      <div>
        {this.renderOrNot()}
      </div>
    )
  }
}

export default RentalField;
