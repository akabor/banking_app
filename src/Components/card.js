import React from "react";
import ReactBootstrap from "react-bootstrap"
import { Card } from "react-bootstrap";

function CustomCard(props) {
  function classes(){
    //set defaults if styles were not indicated
    const bg = props.bgcolor ? ' bg-'+props.bgcolor : ' ';
    const txt = props.txtcolor? ' text-'+props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt;
  }
  return(
    <Card style={{maxWidth: "18rem"}}>
      <Card.Title>{props.header}</Card.Title>
      <Card.Body>
        {props.title && (<Card.Title>{props.title}</Card.Title>)}
        {props.text && (<Card.Text>{props.text}</Card.Text>)}
        {props.body}
        {props.image && (<Card.Img src={"./"+props.image} />)}
        {props.status && (<div id="createStatus">{props.status}</div>)}
      </Card.Body>
    </Card>
  );
}

export default CustomCard;