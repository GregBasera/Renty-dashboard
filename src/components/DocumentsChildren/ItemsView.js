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
              item_id: change.doc.id,
              item_name: change.doc.data().item_name,
              rent_rate: change.doc.data().rent_rate,
            });
            break;
          case 'removed':
            // list = this.state.users;
            // list.splice(list.indexOf(list.length - change.oldIndex -1), 1);
            // can delete things without proper arrangeBy function
            console.log(change.oldIndex);
            break;
          case 'modified':
            console.log("modified");
            break;
          default:
            break;
        }
      })
      this.setState({ items: list });
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
        {(this.state.items[0]) ? <ItemsListItem items={this.state.items} /> : <CircularProgress />}
      </List>
    )
  }
}

export default ItemsView;
