import React from 'react';
// import 'firebase/firestore';
// import Firebase from './../Firebase';

// Layout
// import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// Icons
import PersonIcon from '@material-ui/icons/Person';

class UsersView extends React.Component {
  constructor(props) {
    super(props);
    this.updateSelected = this.updateSelected.bind(this);
    this.state = ({
      users: [],
      selected: null,
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
            list.push({
              user_id: change.doc.id,
              name: change.doc.data().name,
              phone: change.doc.data().phone,
            });
            break;
          case 'deleted':
            console.log("deleted");
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

  updateSelected(selectedIndex) {
    this.setState({ selected: selectedIndex });
  }

  render () {
    const { selected } = this.state;

    return (
      <List component="nav" aria-label="Collections" dense="true">
        <Divider />
        {this.state.users.map((user, index) =>
          {
            return (
              <div>
              <ListItem button selected={selected === index} onClick={() => this.updateSelected(index)}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.phone} />
              </ListItem>
              <Divider />
              </div>
            )
          })
        }
      </List>
    )
  }
}

export default UsersView;
