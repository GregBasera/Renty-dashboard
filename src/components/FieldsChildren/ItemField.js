import React from 'react';

import ItemFieldElements from './ItemFieldChildren/ItemFieldElements.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class ItemField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      itemInfo: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
  }

  listenToFirebase() {
    this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      this.setState({ itemInfo: doc.data() });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.listenToFirebase();
    }
  }

  render() {
    return (
      <div>
        {(this.state.itemInfo) ? <ItemFieldElements info={this.state.itemInfo} /> : <CircularProgress />}
      </div>
    )
  }
}

export default ItemField;
