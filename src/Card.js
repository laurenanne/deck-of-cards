import React from "react";

function Card(props) {
  console.log(props);
  return (
    <div className="Card">
      <img src={props.card.image} alt=""></img>
    </div>
  );
}

export default Card;
