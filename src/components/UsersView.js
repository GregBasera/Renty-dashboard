import React from 'react';
import UsersListItem from './UsersListItem';

// Layout
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

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
        console.log(change);
        switch(change.type) {
          case 'added':
            list.unshift({
              user_id: change.doc.id,
              name: change.doc.data().full_name,
              phone: change.doc.data().phone,
            });
            break;
          case 'removed':
            console.log(change.oldIndex);
            break;
          case 'modified':
            console.log("modified");
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
      <List component="nav" aria-label="Collections" dense="true">
        <Divider />
        <UsersListItem users={this.state.users}/>
      </List>
    )
  }
}

export default UsersView;
