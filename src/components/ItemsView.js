import React from 'react';

// Layout
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class ItemsView extends React.Component {
  constructor(props) {
    super(props);
    this.updateSelected = this.updateSelected.bind(this);
    this.state = ({
      items: [],
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
            list.unshift({
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

  updateSelected(selectedIndex) {
    this.setState({ selected: selectedIndex });
  }

  render () {
    const { selected } = this.state;

    return (
      <List component="nav" aria-label="Collections" dense="true">
        <Divider />
        {this.state.items.map((item, index) =>
          {
            return (
              <div>
              <ListItem button selected={selected === index} onClick={() => this.updateSelected(index)}>
                <ListItemText primary={item.item_name} secondary={item.rent_rate} />
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

export default ItemsView;
