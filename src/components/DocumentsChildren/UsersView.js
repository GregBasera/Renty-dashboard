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
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
  }

  listenToFirebase() {
    var list = [];
    this.props.query.onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        // console.log(change);
        switch(change.type) {
          case 'added':
            list.unshift({
              user_id: change.doc.id,
              name: change.doc.data().full_name,
              phone: change.doc.data().phone,
              verified: change.doc.data().verified,
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
              verified: change.doc.data().verified,
            }
            break;
          default:
            break;
        }
      })
      this.setState({ users: list });
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.listenToFirebase();
    }
  }

  render () {
    return (
      <List component="nav" aria-label="Collections" dense>
        {(this.state.users[0]) ? <UsersListItem users={this.state.users}/> : <CircularProgress />}
      </List>
    )
  }
}

export default UsersView;
