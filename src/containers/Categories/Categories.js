import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { addCategories, deleteCategories, getAllCategories, updateCategories } from '../../redux/actions/category.action';
import CheckboxTree from 'react-checkbox-tree';
import { IoChevronDownOutline, IoChevronForward, IoCheckboxSharp, IoSquareOutline, IoFolderOpenOutline, IoDocumentsOutline } from "react-icons/io5";
import '../containers.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './UpdateCategoriesModal';
import AddCategoriesModal from './AddCategoriesModal';
import DeleteCategoriesModal from './DeleteCategoriesModal';


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
        if (checked.length > 0 || expanded.length > 0) {
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

    const handleDeleteCategory = () => {
        const checkedIds = checkedArray.map(item => ({ _id: item.value }))
        if (checkedIds.length > 0) {
            dispatch(deleteCategories(checkedIds))
                .then(result => {
                    if (result) {
                        setDeleteCategoryModal(false);
                        dispatch(getAllCategories());
                    }
                })
        }
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
                                    className='btn btn-sm btn-primary'
                                    onClick={() => setShow(true)}
                                >
                                    Add
                                </button>
                                <button
                                    className='mx-2 btn btn-sm btn-primary'
                                    style={{ width: '80px', height: '30px' }}
                                    onClick={() => handleUpdateCategory()}
                                >
                                    Edit
                                </button>
                                <button
                                    className='btn btn-sm btn-primary'
                                    style={{ width: '80px', height: '30px' }}
                                    onClick={() => {
                                        if (checked.length > 0) {
                                            setDeleteCategoryModal(true);
                                            updateCategory()
                                        }
                                        else {
                                            alert("Please select checked!")
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
                <AddCategoriesModal
                    show={show}
                    handleClose={handleClose}
                    title="Add new category"
                    categoryName={categoryName}
                    handleSubmit={handleSubmit}
                    setCategoryName={setCategoryName}
                    setParentCategoryId={setParentCategoryId}
                    renderValueLabel={renderValueLabel(category.categories)}
                    handleCategoryImage={handleCategoryImage}
                />
                <UpdateCategoriesModal
                    show={updateCategoryModal}
                    handleClose={handleClose}
                    title="Update Category"
                    size="xl"
                    expandedArray={expandedArray}
                    checkedArray={checkedArray}
                    handleUpdateCategorySubmit={handleUpdateCategorySubmit}
                    handleEditInput={handleEditInput}
                    renderValueLabel={renderValueLabel(category.categories)}
                />
                <DeleteCategoriesModal
                    show={deleteCategoryModal}
                    handleClose={handleClose}
                    setDeleteCategoryModal={setDeleteCategoryModal}
                    handleDeleteCategory={handleDeleteCategory}
                    expandedArray={expandedArray}
                    checkedArray={checkedArray}
                />
            </Container>
        </Layout>
    )
};

export default Categories;