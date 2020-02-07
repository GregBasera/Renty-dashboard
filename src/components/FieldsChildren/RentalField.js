import React from 'react';

import RentalFieldElements from './RentalFieldChildren/RentalFieldElements.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class RentalField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      rentalInfo: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
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

  render() {
    return (
      <div>
        {(this.state.rentalInfo) ? <RentalFieldElements info={this.state.rentalInfo} /> : <CircularProgress />}
      </div>
    )
  }
}

export default RentalField;
