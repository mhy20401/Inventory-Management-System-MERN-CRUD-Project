import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Products() {
    useEffect(() => {
        getProducts();
    }, []);

    const [productData, setProductData] = useState([]);

    const getProducts = async (e) => {
        try {
            const res = await fetch("http://localhost:3001/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 201) {
                console.log("Data Retrieved.");
                setProductData(data);
            } else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteProduct = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this product?');
        if (!isConfirmed) {
            return;
        }

        const response = await fetch(`http://localhost:3001/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await response.json();
        console.log(deletedata);

        if (response.status === 422 || !deletedata) {
            console.log("Error");
        } else {
            console.log("Product deleted");
            getProducts();
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <div className='container-fluid p-5'>
                <h1>Products Inventory</h1>
                <div className='add_button'>
                    <NavLink to="/insertproduct" className='btn-76'>+ Add New Product</NavLink>
                </div>
                <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                    <table className="table table-striped table-hover mt-3 fs-5">
                        <thead>
                            <tr className="tr_color">
                                <th scope="col">#</th>
                                <th scope="col">Product Description</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Product Code</th>
                                <th scope="col">Date Added</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productData.map((element, id) => {
                                    return (
                                        <tr key={id}>
                                            <th scope="row">{id + 1}</th>
                                            <td>{element.ProductName}</td>
                                            <td>{element.ProductPrice}</td>
                                            <td>{element.ProductBarcode}</td>
                                            <td>{formatDate(element.DateAdded)}</td>
                                            <td><NavLink to={`/updateproduct/${element._id}`} className="btn btn-primary"><i className="fa-solid fa-pen-to-square"></i></NavLink></td>
                                            <td><button className="btn btn-danger" onClick={() => deleteProduct(element._id)}><i className="fa-solid fa-trash"></i></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
