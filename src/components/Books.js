import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Cardsdata from './BooksData'
import "./style.css";
import { useDispatch } from 'react-redux';
import { ADD } from '../redux/actions/action';
import classes from "./style.module.css";

const Cards = () => {

  const [data] = useState(Cardsdata);
  const dispatch = useDispatch();
  const send = (e)=>{
  
    dispatch(ADD(e));
  }
  return (
    <div className='container mt-3'>
      <h2 className='mt-3 name'>THE BOOKSPOT.com</h2>

      <div className="row d-flex justify-content-center align-items-center">
        {
          data.map((element, id) => {
            return (
              <>
                <Card  className="mx-2 mt-4 card_style">
                  <Card.Img variant="top" src={element.imgdata}  className={`${classes.imgstyle} mt-3`} />
                  <Card.Body>
                    <Card.Title>{element.name}</Card.Title>
                    <Card.Text>
                     Price : ₹ {element.price}
                    </Card.Text>
                    <div className="button_div d-flex justify-content-center">
                    <Button variant="warning"  
                      onClick={()=> send(element)}
                     className='col-lg-12'>Add to Cart</Button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            )
          })
        }

      </div>
    </div>
  )
}

export default Cards