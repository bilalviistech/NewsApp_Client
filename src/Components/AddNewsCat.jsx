import React, { useState } from 'react'
import Nav from '../Components/Nav'
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewsCat = () => {

    const token = useSelector(state => state.user.token)
    const [category, setCategory] = useState('')

    const SuccessStyle = {
        background: 'green',
        color: 'white',
        fontSize: '16px',
        borderRadius: '8px',
    };
    const SuccessProgressStyle = {
        background: 'green',
    };

    const SuccessNotify = (message) => toast(message, {
        toastStyle: SuccessStyle,
        progressBar: true,
        progressStyle: SuccessProgressStyle,
        progressClassName: 'toast-progress'
    });

    const ErrorStyle = {
        background: 'green',
        color: 'white',
        fontSize: '16px',
        borderRadius: '8px',
    };
    const ErrorProgressStyle = {
        background: 'red',
    };

    const ErrorNotify = (message) => toast(message, {
        toastStyle: ErrorStyle,
        progressBar: true,
        progressStyle: ErrorProgressStyle,
        progressClassName: 'toast-progress'
    });

    const handlerSubmit = async (e)=>{
        e.preventDefault();

        let data = JSON.stringify({
            "CategoryName": category
        });
          
        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://yourappdemo.com/NewsApp/Server/users/add-category',
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`,
        },
        data : data
        };

        try {
            const res = await axios.request(config);
            // console.log('response', res.data);
            if (res.data.success === true) {
                SuccessNotify(res.data.message)
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            } else {
                ErrorNotify(res.data.message)
            }
            return res.data;
        } catch (error) {
            ErrorNotify(error.message)
        }
    }

    return (
        <>
         <ToastContainer />
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" class="d-flex flex-column">
                <Nav />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-11 mx-auto shadow-lg p-3">
                            <h5 className='text-center mx-auto text-info'>ADD NEWS CATEGORY</h5>
                            <div className="row">
                                <div className="col-6 mx-auto ">
                                    <form onSubmit={handlerSubmit}>

                                        <div className="mb-3 ">
                                            <label htmlFor="region">Add a new category:</label>
                                            <input type='text' className='form-control' onChange={(e)=>setCategory(e.target.value)} required/>
                                            
                                        </div>

                                        <div className="form-group mt-3">
                                            <input type="submit" name='addmusic' className='btn btn-info' />
                                        </div>
                                    </form>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
        </>
    )
}

export default AddNewsCat