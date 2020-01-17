import React, { Component } from 'react';
import 'firebase/firestore';
import Firebase from './../Firebase';

// Layout
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Icons
import PersonIcon from '@material-ui/icons/Person';

class UsersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      users: ["0"],
      selected: null,
    });
  }

  componentDidMount() {
    var list = [];

    Firebase.firestore().collection('users').onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        switch(change.type) {
          case 'added':
            list.push(change.doc.data().full_name);
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

  updateSelected(selectedIndex) {
    this.setState({ selected: selectedIndex });
  }

  render () {
    const { selected } = this.state;

    return (
      <div>
        <List component="nav" aria-label="Collections" dense="true">
          {this.state.users.map(
            function(user){
              return (
                <ListItem button selected={selected === 1} onClick={() => this.updateSelected(1)}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <Typography variant="h6">{user}</Typography>
                  <br />
                  <Typography variant="caption">0909 090 0909</Typography>
                </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }
}

export default UsersView;
