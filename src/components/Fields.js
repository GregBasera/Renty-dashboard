import React from 'react'

// Layout
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Fields() {
  return (
    <Container maxWidth="md" disableGutters="true" style={{height:"90vh",overflowY:"scroll"}}>
      <Typography variant="h6" style={{marginLeft:"10px"}}>
        Fields
      </Typography>
      <hr size="1"/>
    </Container>
  )
}

export default Fields;