import React from 'react';

import OperationsListItem from './OperationViewChildren/OperationsListItem'
import CircularProgress from '@material-ui/core/CircularProgress';

// Layout
import List from '@material-ui/core/List';

class OperationsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      operations: [],
      unsubscribe: "nada",
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
  }

  listenToFirebase() {
    var list = [];
    var unsub = this.props.query.onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        switch(change.type) {
          case 'added':
            list.unshift({
              name: change.doc.id,
            });
            break;
          case 'removed':
            list.splice(list.map(function(all) { return all.item_id }).indexOf(change.doc.id), 1);
            break;
          case 'modified':
            list[list.map(function(all) { return all.item_id }).indexOf(change.doc.id)] = {
              name: change.doc.id,
            };
            break;
          default:
            break;
        }
      })
      this.setState({
        operations: list,
        unsubscribe: unsub,
      });
    });
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

  render () {
    return (this.state.operations.length === 0) ? (<CircularProgress />) : (
      <List component="nav" aria-label="Collections" dense>
        <OperationsListItem operations={this.state.operations} />
      </List>
    )
  }
}

export default OperationsView;
