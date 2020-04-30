import React from 'react';

import UsersListItem from './UserViewChildren/UsersListItem';
import CircularProgress from '@material-ui/core/CircularProgress';

// Layout
import List from '@material-ui/core/List';

class UsersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      users: [],
      unsubscribe: "nada",
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.deleteItem = this.deleteItem.bind(this);
  }

  listenToFirebase() {
    var list = [];
    var unsub = this.props.query.orderBy("acc_created").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        // console.log(change);
        switch(change.type) {
          case 'added':
            list.unshift({
              user_id: change.doc.id,
              name: change.doc.data().full_name,
              phone: change.doc.data().phone,
              is_verified: change.doc.data().is_verified,
            });
            break;
          case 'removed':
            list.splice(list.map(function(all) { return all.user_id; }).indexOf(change.doc.id), 1);
            break;
          case 'modified':
            list[list.map(function(all) { return all.user_id; }).indexOf(change.doc.id)] = {
              user_id: change.doc.id,
              name: change.doc.data().full_name,
              phone: change.doc.data().phone,
              is_verified: change.doc.data().is_verified,
            }
            break;
          default:
            break;
        }
      })
      this.setState({
        users: list,
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

  deleteItem(id) {
    console.log("Delete", id);
    this.props.query.doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  render () {
    return (this.state.users.length === 0) ? (<CircularProgress />) : (
      <List component="nav" aria-label="Collections" dense>
        <UsersListItem users={this.state.users} deletion={this.deleteItem} />
      </List>
    )
  }
}

export default UsersView;
