import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import CustomModal from '../../common/CustomModal';
import Layout from '../../components/Layout/Layout';
import { addProduct } from '../../redux/actions/product.action';
import { productImgWithApi } from '../../urlConfig';
import { getCategoryDDl } from '../Api';
import '../containers.css';

const Products = () => {
    const dispatch = useDispatch();
    const { initialData } = useSelector(state => state)
    const [categoryDDl, setCategoryDDl] = useState([])
    const [show, setShow] = useState(false);
    const [productDetailsModalShow, setProductDetailsModalShow] = useState(false);
    const [productDetails, setProductDetails] = useState(null)
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [productPictures, setProductPictures] = useState([]);


    // DDl data load from api
    useEffect(() => {
        getCategoryDDl(setCategoryDDl)
    }, [])

    // Add product to database
    const handleSubmit = (e) => {
        // e.preventDefault()
        const form = new FormData()
        form.append("productName", productName)
        form.append("price", price)
        form.append("quantity", quantity)
        form.append("description", description)
        form.append("category", category)

        if (productPictures.length > 0) {
            for (let pic of productPictures) {
                form.append("productPictures", pic)
            }
        }
        dispatch(addProduct(form))
    }

    // Modal Close
    const handleClose = () => {
        setShow(false)
    };
    const handleCloseProductDetails = () => {
        setProductDetailsModalShow(false)
    };

    // Add product Render 
    const addProductRender = () => {
        return (
            <CustomModal
                show={show}
                handleClose={handleClose}
                title={'Add new product'}
            >
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={12}>
                            <label>product name</label>
                            <input
                                type='text'
                                className='form-control'
                                name='productName'
                                placeholder='product name'
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </Col>
                        <Col sm={12}>
                            <label>product price</label>
                            <input
                                type='number'
                                className='form-control'
                                name='price'
                                placeholder='product price'
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Col>
                        <Col sm={12}>
                            <label>product qunatity</label>
                            <input
                                type='number'
                                className='form-control'
                                name='price'
                                placeholder='product qunatity'
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </Col>
                        <Col sm={12}>
                            <label>description</label>
                            <input
                                type='text'
                                className='form-control'
                                name='description'
                                placeholder='description'
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Col>
                        <Col sm={12} className='my-2'>
                            <label>category</label>
                            <Select
                                name='category'
                                onChange={(valueOption) => {
                                    setCategory(valueOption.value);
                                }}
                                options={categoryDDl}
                                placeholder='select category'
                            />
                        </Col>
                        <Col sm={12}>
                            <label>product image</label><br />
                            {productPictures.map((pdImg, index) => <div key={index}>{pdImg?.name}</div>)}
                            <input
                                name='productPictures'
                                type='file'
                                onChange={(e) => {
                                    setProductPictures([
                                        ...productPictures,
                                        e.target.files[0]
                                    ])
                                }}
                            />
                            <br />
                        </Col>
                        <Col sm={12} className='mt-1'>
                            <button
                                disabled={
                                    !productName || !price || !quantity || !category || !productPictures || !description
                                }
                                type='submit'
                                className='btn btn-primary'
                            >
                                Submit
                                    </button>
                        </Col>
                    </Row>
                </form>
            </CustomModal>
        );
    }
    // Product Details Render
    const productDetailsRender = () => {
        return (
            <CustomModal
                show={productDetailsModalShow}
                handleClose={handleCloseProductDetails}
                title={'Product Details'}
            >

                <Row>
                    <Col md={6}>
                        <label className='key'>Product Name</label>
                        <p className='value'>{productDetails?.productName}</p>
                    </Col>
                    <Col md={6}>
                        <label className='key'>Product Price</label>
                        <p className='value'>{productDetails?.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className='key'>Qunatity</label>
                        <p className='value'>{productDetails?.quantity || 12}</p>
                    </Col>
                    <Col md={6}>
                        <label className='key'>Category</label>
                        <p className='value'>{productDetails?.category?.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className='key'>Description</label>
                        <p className='value'>{productDetails?.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className='key'>Pictures</label>
                        <div className='d-flex'>
                            {
                                productDetails?.productPictures?.map(pic =>
                                    <div className='product-image-container' key={pic?._id}>
                                        <img
                                            className='product-img'
                                            src={productImgWithApi(pic?.img)}
                                            alt={productDetails?.productName}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </CustomModal>
        );
    }

    return (
        <Layout sidebar>
            <Container>
                <Row >
                    <Col>
                        <div className='d-flex justify-content-between mt-2'>
                            <h5>Product</h5>
                            <button
                                onClick={() => setShow(true)}
                                className='btn btn-primary'
                            >
                                Add Product
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            initialData.products.length > 0 &&
                            <div className='table mt-3'>
                                <Table borderless responsive>
                                    <thead>
                                        <tr>
                                            <th className='table-serial'>SL</th>
                                            <th>Product Name</th>
                                            <th>Product Id</th>
                                            <th>Price</th>
                                            <th>Qunatity</th>
                                            <th>Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            initialData.products.map((product, index) =>
                                                <tr
                                                    onClick={() => {
                                                        setProductDetailsModalShow(true);
                                                        setProductDetails(product)
                                                    }}
                                                    key={product._id}
                                                    style={{cursor: 'pointer'}}
                                                >
                                                    <td className='table-serial'>{index + 1}</td>
                                                    <td>{product?.productName}</td>
                                                    <td>{product?._id}</td>
                                                    <td>{product?.price}</td>
                                                    <td>{product?.quantity || 123}</td>
                                                    <td>{product?.category?.name}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        }
                    </Col>
                </Row>

                {addProductRender()}
                {productDetailsRender()}
            </Container>
        </Layout>
    );
};

export default Products;