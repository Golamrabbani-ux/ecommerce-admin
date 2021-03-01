import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import CustomModal from '../../common/CustomModal';
import Layout from '../../components/Layout/Layout';
import { addHomePageBanner, deleteHomePageBanner, editHomePageBanner, getHomePageBanners } from '../../redux/actions/homePageBanner.action';
import { productImgWithApi } from '../../urlConfig';
import { getCategoryDDl } from '../Api';
import '../containers.css';

const HomePageBanner = () => {
    const dispatch = useDispatch();
    const { banner, auth } = useSelector((state => state))
    const [show, setShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false)
    const [categoryNameDDl, setCategoryNameDDl] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [type, setType] = useState('');
    const [bannerPics, setBannerPics] = useState([]);
    const [editInfo, setEditInfo] = useState({});

    useEffect(() => {
        getCategoryDDl(setCategoryNameDDl);
        auth.authenticate && dispatch(getHomePageBanners())
    }, [auth.authenticate, dispatch])

    // Add a new banner
    const handleBannerSubmit = (e) => {
        e.preventDefault()
        const form = new FormData();
        form.append('categoryName', categoryName);
        form.append('type', type)
        if (bannerPics?.length > 0) {
            for (let pic of bannerPics) {
                form.append('bannerPics', pic)
            }
        }
        dispatch(addHomePageBanner(form, setShow))
    }
    // edit banner 
    const handleEditBannerSubmit = (e) => {
        e.preventDefault()
        const form = new FormData();
        form.append('categoryName', categoryName);
        form.append('type', type)
        if (bannerPics?.length > 0) {
            for (let pic of bannerPics) {
                form.append('bannerPics', pic)
            }
        }
        dispatch(editHomePageBanner(form, editInfo._id, setEditModalShow))
        dispatch(getHomePageBanners())
    }

    const renderAddModal = () => {
        return (
            <CustomModal
                show={show}
                handleClose={() => setShow(false)}
                size={"md"}
                title="Add a new banner"
            >
                <form onSubmit={handleBannerSubmit}>
                    <Row>
                        <Col>
                            <Select
                                onChange={(e) => {
                                    setCategoryName(e.label)
                                }}
                                options={categoryNameDDl}
                                name='categoryName'
                                className='mb-2'
                                placeholder="Select Category Name"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Select
                                onChange={(e) => {
                                    setType(e.label)
                                }}
                                options={[
                                    { value: 'Store', label: "Store" },
                                    { value: 'Product', label: "Product" },
                                    { value: 'Page', label: "Page" },
                                ]}
                                name='type'
                                className='mb-2'
                                placeholder="Select Type"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input
                                type='file'
                                name='bannerPics'
                                onChange={(e) => setBannerPics([e.target.files[0]])}
                                className='mb-2'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button className='btn btn-sm btn-primary' type="submit">Submit</button>
                        </Col>
                    </Row>
                </form>
            </CustomModal>
        )
    }
    const renderEditModal = () => {
        return (
            <CustomModal
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                size={"md"}
                title="Edit a banner"
            >
                <form onSubmit={handleEditBannerSubmit}>
                    <Row>
                        <Col>
                            <Select
                                onChange={(e) => {
                                    setCategoryName(e.label)
                                    editInfo.categoryName = { label: e.label, value: e.value }
                                }}
                                value={editInfo?.categoryName}
                                options={categoryNameDDl}
                                name='categoryName'
                                className='mb-2'
                                placeholder="Select Category Name"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Select
                                onChange={(e) => {
                                    setType(e.label)
                                    editInfo.type = { label: e.label, value: e.value }
                                }}
                                value={editInfo?.type}
                                options={[
                                    { value: 'Store', label: "Store" },
                                    { value: 'Product', label: "Product" },
                                    { value: 'Page', label: "Page" },
                                ]}
                                name='type'
                                className='mb-2'
                                placeholder="Select Type"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input
                                type='file'
                                name='bannerPics'
                                onChange={(e) => setBannerPics([e.target.files[0]])}
                                className='mb-2'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button className='btn btn-sm btn-primary' type="submit">Edit & Save</button>
                        </Col>
                    </Row>
                </form>
            </CustomModal>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className='d-flex justify-content-between my-2'>
                            <h5>Banner Page</h5>
                            <div className='button-area'>
                                <button 
                                    className='btn btn-sm btn-primary' 
                                    style={{width: '80px', height:'30px'}}
                                    onClick={() => setShow(true)}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className='text-center'>SL</th>
                                    <th>Banner Image</th>
                                    <th>Category Name</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    banner.banner.map((ban, index) =>
                                        <tr key={index}>
                                            <td className='text-center'>{index + 1}</td>
                                            <td>
                                                <img width='170px' height='100px' src={productImgWithApi(ban?.bannerPics[0]?.img)} alt={ban.categoryName} />
                                            </td>
                                            <td>{ban.categoryName}</td>
                                            <td>{ban.type}</td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        const categoryName = { label: ban.categoryName, value: ban.categoryName }
                                                        const type = { label: ban.type, value: ban.type }
                                                        setEditInfo({ categoryName, type, _id: ban._id })
                                                        setEditModalShow(true)
                                                    }}
                                                    className='editanddeletbtn mr-2'>Edit</button>
                                                <button
                                                    onClick={() => {
                                                        dispatch(deleteHomePageBanner(ban?._id))
                                                            .then(res => {
                                                                if (res) {
                                                                    dispatch(getHomePageBanners())
                                                                }
                                                            })
                                                    }}
                                                    className='editanddeletbtn'>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </Container>
            { renderAddModal()}
            { renderEditModal()}
        </Layout>
    );
};

export default HomePageBanner;