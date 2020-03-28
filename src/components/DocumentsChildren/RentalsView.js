import React from 'react';

import RentalsListItem from './RentalViewChildren/RentalsListItem';

import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

class RentalsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      rentals: [],
      unsubscribe: "nada",
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
  }

  listenToFirebase() {
    var list = [];
    var unsub = this.props.query.orderBy("date_entered").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        switch(change.type) {
          case 'added':
            list.unshift({
              rent_id: change.doc.id,
              lender: change.doc.data().lender_ID,
              renter: change.doc.data().renter_ID,
              item: change.doc.data().item_ID,
              status: change.doc.data().status,
              seen: change.doc.data().seen,
              end: change.doc.data().rent_duration.end_date,
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
              status: change.doc.data().status,
              seen: change.doc.data().seen,
              end: change.doc.data().rent_duration.end_date,
            }
            break;
          default:
            break;
        }
      })
      this.setState({
        rentals: list,
        unsubscribe: unsub,
      });
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.listenToFirebase();
    }
  }

  componentWillUnmount() {
    console.log("unmount unsub");
    this.state.unsubscribe();
  }

  render() {
    return (this.state.rentals.length === 0) ? (<CircularProgress />) : (
      <List component="nav" aria-label="Collections" dense>
        <RentalsListItem rentals={this.state.rentals} />
      </List>
    );
  }
}

export default RentalsView;
