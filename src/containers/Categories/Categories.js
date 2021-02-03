import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../common/CustomModal';
import Layout from '../../components/Layout/Layout';
import { addCategories, deleteCategories, getAllCategories, updateCategories } from '../../redux/actions/category.action';
import CheckboxTree from 'react-checkbox-tree';
import { IoChevronDownOutline, IoChevronForward, IoCheckboxSharp, IoSquareOutline, IoFolderOpenOutline, IoDocumentsOutline } from "react-icons/io5";
import '../containers.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';


const Categories = () => {
    const dispatch = useDispatch();
    const { category } = useSelector((state) => state, shallowEqual)
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([])
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)


    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    // Render All Categroies
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push({
                value: category._id,
                label: category.name,
                children: category.children.length > 0 && renderCategories(category.children)
            })
        }
        return myCategories;
    }

    // Select Option With Value and Label
    const renderValueLabel = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category?.name, parentId: category.parentId })
            if (category.children.length > 0) {
                renderValueLabel(category.children, options)
            }
        }
        return options;
    }

    //Modal Close
    const handleClose = () => {
        setShow(false)
        setUpdateCategoryModal(false)
        setDeleteCategoryModal(false)
    };
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    // Add Categories
    const handleSubmit = (e) => {
        // e.preventDefault()
        const form = new FormData()
        form.append("name", categoryName)
        form.append("parentId", parentCategoryId)
        form.append("categoryImage", categoryImage)
        dispatch(addCategories(form))
    }
    // It's call Edit Button
    const handleUpdateCategory = () => {
        if (checked.length  > 0 || expanded.length > 0) {
            setUpdateCategoryModal(true);
            updateCategory()
        }
        else {
            alert("Please select expanded or checked!")
        }
    }
    // Update Category 
    const updateCategory = () => {
        let expandedList = [];
        let checkedList = [];
        const categoriesList = renderValueLabel(category.categories);

        checked.length > 0 && checked.forEach((categoryId) => {
            const category = categoriesList.find((item) => item.value === categoryId);
            category && checkedList.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryId) => {
            const category = categoriesList.find((item) => item.value === categoryId);
            category && expandedList.push(category)
        })
        setExpandedArray(expandedList);
        setCheckedArray(checkedList);
    }

    //handleEditInput it means defaultvalue handle
    const handleEditInput = (key, value, index, type) => {
        if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => _index === index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray)
        }
        else if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => _index === index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray)
        }
    }

    // handleEditCategorySubmit it means  submit handle
    const handleUpdateCategorySubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        if (expandedArray.length > 0) {
            expandedArray.forEach((item, index) => {
                form.append("_id", item.value)
                form.append("name", item.name)
                form.append("parentId", item.parentId ? item.parentId : '')
                form.append("type", item.type || "store")
            })
        }
        if (checkedArray.length > 0) {
            checkedArray.forEach((item, index) => {
                form.append("_id", item.value)
                form.append("name", item.name)
                form.append("parentId", item.parentId ? item.parentId : '')
                form.append("type", item.type || "store")
            })
        }
        dispatch(updateCategories(form))
            .then(result => {
                if (result) {
                    dispatch(getAllCategories());
                    setUpdateCategoryModal(false)
                }
            })
    }

    const handleDeleteCategory = () =>{
        const expendedIds = expandedArray.map(item => ({_id: item.value}))
        const checkedIds = checkedArray.map(item => ({_id: item.value}))
        const idsArray = expendedIds.concat(checkedIds)
        dispatch(deleteCategories(idsArray))
        .then(result =>{
            if(result){
                setDeleteCategoryModal(false);
                dispatch(getAllCategories());
            }
        })
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className='d-flex justify-content-between mt-2'>
                            <h5>Category</h5>
                            <div>
                                <button
                                    style={{ width: '80px', height: '30px' }}
                                    onClick={() => setShow(true)}
                                >
                                    Add
                                </button>
                                <button
                                    className='mx-2'
                                    style={{ width: '80px', height: '30px' }}
                                    onClick={() => handleUpdateCategory()}
                                >
                                    Edit
                                </button>
                                <button
                                    className='mx-2'
                                    style={{ width: '80px', height: '30px' }}
                                    onClick={() => {
                                        if (checked.length  > 0 || expanded.length > 0) {
                                            setDeleteCategoryModal(true);
                                            updateCategory()
                                        }
                                        else {
                                            alert("Please select expanded or checked!")
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoCheckboxSharp />,
                                uncheck: <IoSquareOutline />,
                                halfCheck: <IoCheckboxSharp />,
                                expandClose: <IoChevronForward />,
                                expandOpen: <IoChevronDownOutline />,
                                parentOpen: <IoFolderOpenOutline />,
                                parentClose: <IoFolderOpenOutline />,
                                leaf: <IoDocumentsOutline />
                            }}
                        />
                    </Col>
                </Row>

                {/* Add Category Modal  */}
                <CustomModal
                    show={show}
                    handleClose={handleClose}
                    title="Add new category"
                >
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col sm={12}>
                                <label>category name</label>
                                <input
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    name='name'
                                    type='text'
                                    placeholder='category name'
                                    className='form-control'
                                />
                            </Col>
                            <Col sm={12} className='my-2'>
                                <label>parent name</label>
                                <select
                                    onChange={(e) => setParentCategoryId(e.target.value)}
                                    className='form-control'
                                >
                                    <option>Select Parent</option>
                                    {
                                        renderValueLabel(category.categories).map((option) =>
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >{option.name}</option>
                                        )
                                    }
                                </select>
                            </Col>
                            <Col sm={12}>
                                <label>category image</label><br />
                                <input
                                    onChange={handleCategoryImage}
                                    name="categoryImage"
                                    type='file'
                                />
                            </Col>
                            <Col sm={12} className='mt-1'>
                                <button
                                    type="submit"
                                    className='btn btn-primary'
                                >
                                    Submit
                                </button>
                            </Col>
                        </Row>
                    </form>
                </CustomModal>
                {/* Edit or Update Category Modal */}
                <CustomModal
                    show={updateCategoryModal}
                    handleClose={handleClose}
                    title="Update Category"
                    size="xl"
                >
                    <form onSubmit={handleUpdateCategorySubmit}>
                        <h6>Expaned list</h6>
                        {
                            expandedArray.length > 0 &&
                            expandedArray.map((item, index) =>
                                <div key={index}>
                                    <Row>
                                        <Col lg={4} md={12}>
                                            <input
                                                value={item.name}
                                                name='name'
                                                type='text'
                                                placeholder='category name'
                                                className='my-1 form-control'
                                                onChange={(e) => handleEditInput("name", e.target.value, index, "expanded")}
                                            />
                                        </Col>
                                        <Col lg={4} md={12}>
                                            <select
                                                defaultValue={item.parentId}
                                                onChange={(e) => handleEditInput("parentId", e.target.value, index, "expanded")}
                                                className='my-1 form-control'
                                            >
                                                <option>Select Parent</option>
                                                {
                                                    renderValueLabel(category.categories).map((option) =>
                                                        <option
                                                            key={option.value}
                                                            value={option.value}
                                                        >{option.name}</option>
                                                    )
                                                }
                                            </select>
                                        </Col>
                                        <Col lg={4} md={12}>
                                            <select
                                                className='my-1 form-control'
                                            >
                                                <option>Select type</option>
                                                <option value={"store"}>Store</option>
                                                <option value={"product"}>Product</option>
                                                <option value={'brand'}>Brand</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        }
                        <h6>Checked list</h6>
                        {
                            checkedArray.length > 0 &&
                            checkedArray.map((item, index) =>
                                <div key={index}>
                                    <Row>
                                        <Col lg={4} md={12}>
                                            <input
                                                value={item.name}
                                                name='name'
                                                type='text'
                                                placeholder='category name'
                                                className='my-1 form-control'
                                                onChange={(e) => handleEditInput("name", e.target.value, index, "checked")}
                                            />
                                        </Col>
                                        <Col lg={4} md={12}>
                                            <select
                                                onChange={(e) => handleEditInput("parentId", e.target.value, index, "checked")}
                                                value={item.parentId}
                                                className='my-1 form-control'
                                            >
                                                <option>Select Parent</option>
                                                {
                                                    renderValueLabel(category.categories).map((option) =>
                                                        <option
                                                            key={option.value}
                                                            value={option.value}
                                                        >{option.name}</option>
                                                    )
                                                }
                                            </select>
                                        </Col>
                                        <Col lg={4} md={12}>
                                            <select
                                                className='my-1 form-control'
                                            >
                                                <option>Select type</option>
                                                <option value={"store"}>Store</option>
                                                <option value={"product"}>Product</option>
                                                <option value={'brand'}>Brand</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        }
                        <button
                            className='btn btn-primary'
                            type='submit'
                        >
                            Submit
                        </button>
                    </form>
                </CustomModal>
                {/* Delete Category Modal */}
                <CustomModal
                    show={deleteCategoryModal}
                    handleClose={handleClose}
                    title="Confirm"
                    size="md"
                    buttons={[
                        {
                            label: "no",
                            color: "primary",
                            onClick: () => {
                                setDeleteCategoryModal(false)
                            }
                        },
                        {
                            label: "yes",
                            color: "danger",
                            onClick: () => {
                                handleDeleteCategory()
                            }
                        }
                    ]}
                >
                    Are you sure delete this category <br />
                    <p>Expanded List</p>
                    {
                        expandedArray.map(item => <li>{item.name}</li>)
                    }
                    <p>Checked List</p>
                    {
                        checkedArray.map(item => <li>{item.name}</li>)
                    }
                </CustomModal>
            </Container>
        </Layout>
    )
};

export default Categories;