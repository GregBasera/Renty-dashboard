import React from 'react';

import ItemView from './OperationFieldChildren/ItemView';
import Fcm from './OperationFieldChildren/Fcm';
import CircularProgress from '@material-ui/core/CircularProgress';

class OperationField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      operationsInfo: null,
      initialState: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.updateValue = this.updateValue.bind(this);
    this.operationInedxer = this.operationInedxer.bind(this);
  }

  listenToFirebase() {
    this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      if(this.state.operationsInfo === null) {
        this.setState({ initialState: { id: doc.id, data: doc.data() } });
      }
      this.setState({ operationsInfo: { id: doc.id, data: doc.data() } });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.setState({
        initialState: null,
        operationsInfo: null,
      });
      this.listenToFirebase();
    }
  }

  uploadChanged = () => {
    console.log("submit was called");
    let stateRef = this.state.operationsInfo.data;
    // this.props.query.update({
    //   is_approved: (typeof stateRef.is_approved !== 'undefined') ? stateRef.is_approved: "error: notfound",
    //   item_name: (stateRef.item_name) ? stateRef.item_name : "error: notfound",
    //   item_description: (stateRef.item_description) ? stateRef.item_description : "error: notfound",
    // });
  }

  updateValue(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      operationsInfo: {
        id: this.state.operationsInfo.id,
        data: {
          ...prevState.operationsInfo.data, [name]: value
        }
      },
    }));
  }

  operationInedxer() {
    switch(this.props.opIndex) {
      case 'items':
        return (<ItemView data={this.state.operationsInfo.data} />);
      case 'fcm_token':
        return (<Fcm data={this.state.operationsInfo.data} />);
      default:
        return "Choose a document...";
    }
  }

  render() {
    return (this.state.operationsInfo === null) ? <CircularProgress /> : (
      <div>
        {this.operationInedxer()}
      </div>
    )
  }
}

export default OperationField;
