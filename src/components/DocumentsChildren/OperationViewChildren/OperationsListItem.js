import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFieldView } from '../../../actions/collectionsActs';

// Layout
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// import Tooltip from '@material-ui/core/Tooltip';

// import Icon from '@material-ui/core/Icon';
// import BeenhereIcon from '@material-ui/icons/Beenhere';
// import HelpIcon from '@material-ui/icons/Help';

function OperationsListItem(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const dispatch = useDispatch();

  const handleListItemClick = (event, index, id) => {
    setSelectedIndex(index);
    dispatch(changeFieldView(index, id));
  };

  return(
    <div>
      <Divider />
      {props.operations.map((operations, index) =>
        {
          return (
            <React.Fragment key={operations.name}>
            <ListItem selected={selectedIndex === index} onClick={event => handleListItemClick(event, index, operations.name)}>
              <ListItemText primary={
                <Typography variant="subtitle1">
                  {operations.name}
                </Typography>
              } />
            </ListItem>
            <Divider />
            </React.Fragment>
          )
        })
      }
    </div>
  )
}

export default OperationsListItem;
