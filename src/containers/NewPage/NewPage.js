import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../common/CustomModal';
import Layout from '../../components/Layout/Layout'
import { createPage } from '../../redux/actions/page.action';

const NewPage = () => {
    const dispatch = useDispatch();
    const { category } = useSelector(state => state)
    const [show, setShow] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [productsPictures, setProductPictures] = useState([]);
    const [banners, setBanners] = useState([]);

    const renderValueLabel = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category?._id,
                name: category?.name,
                parentId: category?.parentId,
                type: category?.type
            })
            if (category?.children?.length > 0) {
                renderValueLabel(category?.children, options)
            }
        }
        return options;
    }

    const handleSubmit = (e) =>{
        // e.preventDefault();
        const form = new FormData();
        form.append('title', title)
        form.append('description', desc)
        form.append('category', categoryId)
        form.append('type', type)
        if(banners?.length > 0){
            banners.forEach((banner) => {
                form.append('banners', banner)
            })
        }
        if(productsPictures?.length > 0){
            productsPictures.forEach((product) => {
                form.append('productsPictures', product)
            })
        }
        dispatch(createPage(form));
    }

    return (
        <Layout sidebar>
            <button onClick={() => setShow(true)}>Cretate</button>
            <CustomModal
                show={show}
                title={'New Page'}
                handleClose={() => setShow(false)}
            >
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <select
                                value={categoryId}
                                onChange={(e) => {
                                    setCategoryId(e.target.value)
                                    const findCategory = renderValueLabel(category.categories).find(cat => cat.value === e.target.value);
                                    setType(findCategory?.type)
                                }}
                                className='form-control form-control-sm'
                            >
                                <option>Select Category</option>
                                {renderValueLabel(category?.categories).map((category) =>
                                    <option key={category?.value} value={category?.value} type={category?.type} >{category.name}</option>
                                )}
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input
                                className='my-1 form-control form-control-sm'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page title'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <textarea
                                className='form-control form-control-sm'
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Description'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {productsPictures.length > 0 && productsPictures.map((pic, index) => <li key={index}>{pic.name}</li>)}
                            <input
                                type='file'
                                className='my-1'
                                onChange={(e) =>{
                                    setProductPictures([...productsPictures, e.target.files[0]])
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {banners.length > 0 && banners.map((pic, index) => <li key={index}>{pic.name}</li>)}
                            <input
                                type='file'
                                className='my-1'
                                onChange={(e) =>{
                                    setBanners([...banners, e.target.files[0]])
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button
                                type={"submit"}
                                className='btn btn-sm btn-primary'
                            >
                                Submit
                            </button>
                        </Col>
                    </Row>
                </form>
            </CustomModal>
        </Layout>
    );
};

export default NewPage;