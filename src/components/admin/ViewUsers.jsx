import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
//import { useEffect } from 'react';
import axios from "axios";
import { environment } from '../../api';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications'

import ReactPaginate from 'react-paginate';
import CircularProgress from '@mui/material/CircularProgress';

import ModalD from '../ModalD';
const ViewUsers = () => {
    const { addToast } = useToasts()

    const [users, setUsers] = useState([]);
    const [checkLoader, setcheckLoader] = useState(true);
    const [types, settypes] = useState(['Users', 'Doctors', 'Clients', 'Admins']);
    const [type, settype] = useState('Users');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const startIndex = currentPage * itemsPerPage;
    const pagedItems = users.slice(startIndex, startIndex + itemsPerPage);
    const userData = useSelector(state => state.userData.userData)
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.isAuth.isAuth)


    useEffect(() => {
        if (!isAuth) {
            navigate('/auth/signin');
        }
    })
    useEffect(() => {
        setcheckLoader(true)
        //console.log(type)
        axios.get(`${environment.ApiUrl}/all${type}`).then((res) => {
            //console.log(res.data)
            if (type === 'Users') {
                setUsers((oldState) => [...res.data.users])
            }
            else if (type === 'Doctors') {
                setUsers((oldState) => [...res.data.allDoctorsData])
            }
            else if (type === 'Clients') {
                setUsers((oldState) => [...res.data.clients])
            }
            else if (type === 'Admins') {
                setUsers((oldState) => [...res.data.admins])
            }
            setcheckLoader(false)
        })
    }, [type])

    const handleType = (e) => {
        settype(e.target.value)
        //console.log(type)
    }



    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleted, setDeleted] = useState('');

    const showDeleteModal = (id) => {
        setDeleted(id)
        setDisplayConfirmationModal(true);
    };
    // Hide the modal
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };
    // Handle the actual deletion of the item
    const submitDelete = () => {
        setDisplayConfirmationModal(false);
    };

    
    const getDeleted = (id)=>
    {
        //setDeleted(id)
        console.log(id)
        console.log(deleted)

        const httpOptions = {
            headers: {  'auth':userData.token    }}

        axios.delete(`${environment.ApiUrl}/deleteuser/${deleted}`,httpOptions).then((res)=>{
            console.log(res)
            if(res.data.message == "user Deleted successfully")
            {
                addToast('Deleted successfully', {
                    appearance: 'success',
                    autoDismiss: true,
                  })
                    //console.log(type)
                    axios.get(`${environment.ApiUrl}/all${type}`).then((res) => {
                        //console.log(res.data)
                        if (type === 'Users') {
                            setUsers((oldState) => [...res.data.users])
                        }
                        else if (type === 'Doctors') {
                            setUsers((oldState) => [...res.data.allDoctorsData])
                        }
                        else if (type === 'Clients') {
                            setUsers((oldState) => [...res.data.clients])
                        }
                        else if (type === 'Admins') {
                            setUsers((oldState) => [...res.data.admins])
                        }
                        setcheckLoader(false)
                    })
            }
            else
            {
                addToast(`Can't Deleted`, {
                    appearance: 'error',
                    autoDismiss: true,
                  })
            }
        })
        setDeleted('')
    }



    return (
        <div className='container py-5'>
            {checkLoader && <div className='d-flex justify-content-center'>
                <CircularProgress />
            </div>
            }
            {!checkLoader &&
                <>
                    <div className="row d-flex justify-content-center my-2 py-3">
                        <h4 className="col-md-3">Filter Users</h4>
                        <select onChange={handleType} className="form-select col-md-3 w-25" aria-label="Default select example">
                            {types.map((type) => <option value={type}>  {type}</option>)}

                        </select>
                    </div>
                    <table className="table ">
                        <thead>
                            <tr>
                                <th scope="col ">name</th>
                                <th scope="col ">Email </th>
                                <th scope="col ">Gender</th>
                                <th scope="col ">mobilePhone</th>
                                <th scope="col ">type</th>
                                <th scope="col "></th>


                            </tr>
                        </thead>
                        <tbody>
                            {pagedItems.map((user) => {
                                return (<tr >
                                    <th scope="row ">{user.name}</th>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.mobilePhone}</td>
                                    <td>{user.type}</td>
                                    <td><button   onClick={() => showDeleteModal(user._id) } class="btn btn-danger">Delete </button></td>

                                    <ModalD getDeleted={getDeleted} showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={deleted}/>

                                </tr>)
                            })}


                        </tbody>
                    </table>
                    <div className='pg'>
                        <ReactPaginate
                            pageCount={Math.ceil(users.length / itemsPerPage)}
                            pageRange={10}
                            marginPagesDisplayed={Math.ceil(users.length / itemsPerPage)}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'Aactive'}
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                        />
                    </div>
                </>
            }




        </div >

    );
};

export default ViewUsers;