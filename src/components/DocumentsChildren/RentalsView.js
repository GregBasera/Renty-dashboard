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
              lender: change.doc.data().lender_ID,
              renter: change.doc.data().renter_ID,
              item: change.doc.data().item_ID,
            });
            break;
          case 'removed':
            list.splice(list.map(function(all) { return all.rent_id }).indexOf(change.doc.id), 1);
            break;
          case 'modified':
            list[list.map(function(all) { return all.rent_id }).indexOf(change.doc.id)] = {
              rent_id: change.doc.id,
              lender: change.doc.data().lender_ID,
              renter: change.doc.data().renter_ID,
              item: change.doc.data().item_ID,
            }
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
      <List component="nav" aria-label="Collections" dense>
        {(this.state.rentals[0]) ? <RentalsListItem rentals={this.state.rentals} /> : <CircularProgress />}
      </List>
    );
  }
}

export default RentalsView;
