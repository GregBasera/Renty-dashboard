import React from 'react';

function RentalsView(props) {
  props.query.onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      console.log(change);
    })
  })

  return(
    <h1>{"hello"}</h1>
  )
}

export default RentalsView;
