import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DLT,ADD,REMOVE } from '../redux/actions/action'
import "./style.css";
import classes from "./style.module.css";


const CardsDetails = () => {

  const [data,setData] = useState([]);
  const {id} = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const getdata = useSelector((state)=> state.cartreducer.carts);
  const compare = ()=>{
    let comparedata = getdata.filter((e)=>{
      return e.id == id
    });
    setData(comparedata);
  }
  const send = (e)=>{
    
    dispatch(ADD(e));
  }
  const dlt = (id)=>{
    dispatch(DLT(id));
    history("/");
}
const remove = (item)=>{
  dispatch(REMOVE(item))
}
useEffect(()=>{compare();},[id])
return (
    <>
      <div className="container mt-2">
        <h2 className='text-center'>Book Details</h2>

        <section className='container mt-3'>
          <div className="iteamsdetails">
          {
            data.map((ele)=>{
              return (
                <>
                <div className="items_img">
              <img src={ele.imgdata} alt="" />
            </div>

            <div className="details">
              <Table>
                <tr>
                  <td>
                    <p> <strong>Name</strong>  : {ele.name}</p>
                    <p> <strong>Price</strong>  : ₹{ele.price}</p>
                    <p> <strong>Author</strong>  : {ele.author}</p>
                    <p> <strong>Total</strong>  :₹  {ele.price * ele.qnty}</p>
                    <div className={`${classes.quantity} mt-5 d-flex justify-content-between align-items-center`}>
                    <span  onClick={ele.qnty <=1 ? ()=>dlt(ele.id) : ()=>remove(ele)}>-</span>
                    <span>{ele.qnty}</span>
                    <span onClick={()=>send(ele)}>+</span>

                    </div>

                  </td>
                  <td>
                    <p><strong>Rating :</strong> <span className="rating">{ele.rating} ★	</span></p>
                    <p><strong>Genre :</strong> <span >{ele.somedata}	</span></p>
                    <p><strong>Remove :</strong> <span ><i className={`${classes.trash} fas fa-trash`} onClick={()=>dlt(ele.id)}></i>	</span></p>
                  </td>
                </tr>
              </Table>
            </div>
          
                </>
              )
            })
          }
          </div>
        </section>
      </div>
    </>
  )
}

export default CardsDetails