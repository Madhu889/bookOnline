import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/esm/Table';
import { DLT } from '../redux/actions/action';
import "./style.css";
import classes from "./style.module.css";

const Header = () => {

    const [price,setPrice] = useState(0);
    const getdata = useSelector((state)=> state.cartreducer.carts);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dlt = (id)=>{
        dispatch(DLT(id))
    }
    const total = ()=>{
        let price = 0;
        getdata.map((ele,k)=>{
            price = ele.price * ele.qnty + price
        });
        setPrice(price);
    };

     useEffect(()=>{total(); },[total])
     return (
        <>
            <Navbar className="bg-secondary variant-dark navhead">
                <Container>
                <Nav className="me-auto">
                        
                        <NavLink to="/" className="text-decoration-none text-light home">Home</NavLink>
                        <NavLink to="/login" className="text-decoration-none text-light home">Login/Sign Up</NavLink>
                        
                </Nav>
                     <Badge badgeContent={getdata.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                       <i className={`${classes.headercart} fa-solid fa-cart-shopping text-light`}></i>
                    </Badge>

                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{ 'aria-labelledby': 'basic-button', }}>

                    {
                        getdata.length ? 
                        <div className='card_details' >
                            <Table>
                                <thead>
                                    <tr>
                                        <th>BOOK</th>
                                        <th>TITLE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getdata.map((e)=>{
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                        <NavLink to={`/cart/${e.id}`}   onClick={handleClose}>
                                                        <img src={e.imgdata} className="Headerimg"  alt="" />
                                                        </NavLink>   
                                                        </td>
                                                        <td>
                                                            <p>{e.name}</p>
                                                            <p>Price : ₹{e.price}</p>
                                                            <p>Quantity : {e.qnty}</p>
                                                            <p>Click on the <strong>book</strong> to check details</p>
                                                            <p onClick={()=>dlt(e.id)}>
                                                                <i className='fas fa-trash smalltrash'></i>
                                                            </p>
                                                        </td>

                                                        <td className={`${classes.largetrash} mt-5 `} onClick={()=>dlt(e.id)}>
                                                        <i className='fas fa-trash largetrash'></i>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <p className='text-center'>Total :₹ {price}</p>
                                </tbody>
                            </Table>
                        </div>:
                        
                   <div className='card_details d-flex justify-content-center align-items-center' >
                    <i className={` ${classes.cross} fas fa-close smallclose`} onClick={handleClose}
                     ></i>
                    <p className={classes.emptytext}>Your carts is empty</p>
                    <img src="./cart.gif" alt="" className='emptycart_img' />
                   </div>
                    }

                </Menu>
            </Navbar>
        </>
    )
}

export default Header