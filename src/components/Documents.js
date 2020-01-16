import React from 'react'
import { useSelector } from 'react-redux';

// Layout
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Documents() {
  const veiwIndex = useSelector(state => state.docView.index);
  const viewTitle = useSelector(state => state.docView.title);

  return (
    <Container maxWidth="md" disableGutters="true" style={{height:"90vh",overflowY:"scroll"}}>
      <Typography variant="h6" style={{marginLeft:"10px"}}>
        {viewTitle}
      </Typography>
      <hr size="1"/>

      <Typography variant="h6" style={{marginLeft:"10px"}}>
        {veiwIndex}
      </Typography>
    </Container>
  )
}

export default Documents;