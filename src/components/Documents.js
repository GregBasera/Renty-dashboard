import React from 'react'
import { useSelector } from 'react-redux';

// Components
import RentalsView from './RentalsView';
import ItemsView from './ItemsView';

// Layout
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Documents() {
  const viewTitle = useSelector(state => state.docView.title);
  const viewIndex = useSelector(state => state.docView.index);

  const view = (index) => {
    if(index >= 1 && index <= 4) {
      return <RentalsView />;
    } else if(index >= 5 && index <= 7) {
      return <ItemsView />;
    } else if(index >= 8 && index <= 11) {
      
    } else {
      return <h2>Select another Collection you dumb shit..</h2>;
    }
  }

  return (
    <Container maxWidth="md" disableGutters="true" style={{height:"90vh",overflowY:"scroll"}}>
      <Typography variant="h6" style={{marginLeft:"10px"}}>
        {viewTitle}
      </Typography>
      <hr size="1"/>

      <Typography variant="h6" style={{marginLeft:"10px"}}>
        {view(viewIndex)}
      </Typography>
    </Container>
  )
}

export default Documents;
