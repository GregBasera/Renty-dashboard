import React from 'react';

import ItemsListItem from './ItemViewChildren/ItemsListItem'
import CircularProgress from '@material-ui/core/CircularProgress';

// Layout
import List from '@material-ui/core/List';

class ItemsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      items: [],
      unsubscribe: "nada",
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.deleteItem = this.deleteItem.bind(this);
  }

  listenToFirebase() {
    var list = [];
    var unsub = this.props.query.orderBy("date_entered").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        switch(change.type) {
          case 'added':
            list.unshift({
              item_id: change.doc.id,
              item_name: change.doc.data().item_name,
              is_approved: change.doc.data().is_approved,
              date_entered: change.doc.data().date_entered,
            });
            break;
          case 'removed':
            list.splice(list.map(function(all) { return all.item_id }).indexOf(change.doc.id), 1);
            break;
          case 'modified':
            list[list.map(function(all) { return all.item_id }).indexOf(change.doc.id)] = {
              item_id: change.doc.id,
              item_name: change.doc.data().item_name,
              is_approved: change.doc.data().is_approved,
              date_entered: change.doc.data().date_entered,
            };
            break;
          default:
            break;
        }
      })
      this.setState({
        items: list,
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

  deleteItem(id) {
    console.log("Delete", id);
    this.props.query.doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  render () {
    return (this.state.items.length === 0) ? (<CircularProgress />) : (
      <List component="nav" aria-label="Collections" dense>
        <ItemsListItem items={this.state.items} deletion={this.deleteItem} />
      </List>
    )
  }
}

export default ItemsView;
