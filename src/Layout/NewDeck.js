import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api/index.js";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function NewDeck() {
   const navigate = useNavigate();
  
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
   
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    createDeck(formData);
    setFormData({ ...initialFormState });
   
  };

  return (
    <Container>
   <Card variant="secondary"> 
        <Card.Title >
          <Card.Body>
        <Breadcrumb >
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Create Deck</Breadcrumb.Item>
        </Breadcrumb>
        </Card.Body>
        </Card.Title>
        </Card>
      <Row><h1>Create Deck</h1> </Row>
    <form name="create" onSubmit={handleSubmit}>
     <div>
          <h6>Name </h6>
            <input
            id="name"
            type="text"
            name="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={formData.name} />
         </div>      
         <div>
            <h6>Description </h6>
                <textarea name="description"
                id="description"
                placeholder="Brief Description of the deck"
                onChange={handleChange}
                value={formData.description}>
                </textarea>
                </div>
             
            <Button type="cancel" variant="secondary" onClick={() => navigate('/')}>Cancel</Button>
            
            <Button type="submit" onClick={handleSubmit} className="ml-2">Submit</Button>
           
    </form>
    
    </Container>
  );
}

export default NewDeck;