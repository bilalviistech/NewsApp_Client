import React, { useState } from 'react';
import Nav from '../Components/Nav'
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const Addusers = () => {

    const token = useSelector(state => state.user.token)

    const [getAllCat, setGetAllCat] = useState([])
    const [newsCategory, setNewsCategory] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null);

    useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://yourappdemo.com/NewsApp/Server/users/get-all-category',
            headers: { 
                Authorization: `Bearer ${token}`,
            }
        };
          
        axios.request(config)
        .then((response) => {
        // console.log('this is stringfy data ',JSON.stringify(response.data));
        setGetAllCat(response.data.data)
        })
        .catch((error) => {
        // console.log(error);
        });
    },[])

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

    const handleRemoveCategory = (category) => {
        setNewsCategory('')
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        let data = new FormData();
        
        data.append('title', title);
        data.append('NewsDesc', description);
        data.append('category', newsCategory);
        if (file) {
            data.append('file', file);
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://yourappdemo.com/NewsApp/Server/users/addnews',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        try {
            const res = await axios.request(config);
            console.log('response', res.data);
            if (res.data.success === true) {
                SuccessNotify(res.data.message)
                setLoading(false)
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            } else {
                setLoading(false)
                ErrorNotify(res.data.message)
            }
            return res.data;
        } catch (error) {
            ErrorNotify(error.message)
            setLoading(false)
        }
    };
    return (
        <>
            <div class="loaderr" style={{position:"absolute",top:'50%',left:'50%', display: (loading === false ? 'none' : "block")}}></div>
            <ToastContainer />

            <div id="wrapper" style={{opacity: (loading === false ? 1 : 0.4)}}>
                <Sidebar />
                <div id="content-wrapper" class="d-flex flex-column">
                    <Nav />
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-11  shadow-lg mx-auto p-3">
                                <h5 className='text-center mx-auto text-info'>ADD NEWS</h5>
                                <div className="row">
                                    <div className="col-6 mx-auto ">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group ">
                                                <label htmlFor="">News Category</label>
                                                <select name='mregion' className="form-select form-control" required id="" onChange={(e)=>setNewsCategory(e.target.value)}>

                                                {getAllCat.length > 0 && (
                                                
                                                    getAllCat.map((item) => <option value={item.CategoryName} disabled={newsCategory.includes(item.CategoryName)} style={{ color: newsCategory.includes(item.CategoryName) ? "gray" : "black" }}>{item.CategoryName}</option>)
                                                )}
                                        
                                                </select>
                                                <div className="selected-options mt-3">
                                                    {
                                                        newsCategory && (
                                                            <div>
                                                                <p>Selected Category:</p>
                                                                <ul className="list-unstyled">
                                                                        <li key={newsCategory} className="mb-2" style={{ display: "inline-block", paddingLeft: "5px", paddingRight: "5px" }}>
                                                                            <span className="badge bg-primary">
                                                                                {newsCategory}
                                                                                <button
                                                                                    type="button"
                                                                                    className=" ms-2"
                                                                                    aria-label="Close"
                                                                                    onClick={() => handleRemoveCategory(newsCategory)}
                                                                                >X</button>
                                                                            </span>
                                                                        </li>
                                                                </ul>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="">News Title</label>
                                                <input type="text" required className='form-control' placeholder="Enter Title" name='uname' onChange={(e) => setTitle(e.target.value)} />
                                            </div>

                                            {/*  */}
                                            
                                            
                                            {/*  */}
                                            <div className="form-group ">
                                                <label htmlFor="">News Description</label>
                                                <input type="text" required className='form-control' placeholder="Enter Description" name='ulname' onChange={(e) => setDescription(e.target.value)} />
                                            </div>

                                            <div className="form-group ">
                                                <label htmlFor="">Mews Image</label>
                                                <input type="file" required className='form-control' name='ucity' onChange={handleFileChange} />
                                            </div>

                                            <div className="form-group mt-3">
                                                <input type="submit" name='adduser' className='btn btn-info' />
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

export default Addusers