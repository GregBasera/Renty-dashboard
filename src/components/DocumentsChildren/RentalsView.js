import React from 'react';

import RentalsListItem from './RentalViewChildren/RentalsListItem';

import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

class RentalsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      rentals: [],
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
  }

  listenToFirebase() {
    var list = [];
    this.props.query.onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        switch(change.type) {
          case 'added':
            list.unshift({
              rent_id: change.doc.id,
              lender: change.doc.data().lender,
              renter: change.doc.data().renter,
            });
            break;
          case 'removed':
            list.splice(change.oldIndex, 1);
            break;
          case 'modified':
            console.log("modified");
            break;
          default:
            break;
        }
      })
      this.setState({ rentals: list });
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.listenToFirebase();
    }
  }

  render() {
    return (
      <List component="nav" aria-label="Collections" dense="true">
        {(this.state.rentals[0]) ? <RentalsListItem rentals={this.state.rentals} /> : <CircularProgress />}
      </List>
    );
  }
}

export default RentalsView;
