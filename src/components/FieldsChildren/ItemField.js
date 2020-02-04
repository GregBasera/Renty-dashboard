import React from 'react';

import ItemFieldElements from './ItemFieldChildren/ItemFieldElements.js'

class ItemField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      itemInfo: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.renderOrNot = this.renderOrNot.bind(this);
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

  renderOrNot() {
    if(this.state.itemInfo) {
      return <ItemFieldElements info={this.state.itemInfo} />;
    }
  }

  render() {
    return (
      <div>
        {this.renderOrNot()}
      </div>
    )
  }
}

export default ItemField;
