import React from 'react'
import { useSelector } from 'react-redux';

// Components
import RentalView from './RentalView';

// Layout
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Documents() {
  const viewTitle = useSelector(state => state.docView.title);
  const viewIndex = useSelector(state => state.docView.index);

  const view = (index) => {
    switch (index) {
      case 1:
        return <RentalView />;
      default:
        return 0;
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
