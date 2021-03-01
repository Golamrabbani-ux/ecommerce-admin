import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomModal from '../../common/CustomModal';

const UpdateCategoriesModal = (props) => {
    const {
        show,
        handleClose,
        title,
        size,
        expandedArray,
        checkedArray,
        handleUpdateCategorySubmit,
        handleEditInput,
        renderValueLabel,
    } = props;
    return (
        <CustomModal
            show={show}
            handleClose={handleClose}
            title={title}
            size={size}
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
                                        className='my-1 form-control form-control-sm'
                                        onChange={(e) => handleEditInput("name", e.target.value, index, "expanded")}
                                    />
                                </Col>
                                <Col lg={4} md={12}>
                                    <select
                                        defaultValue={item.parentId}
                                        onChange={(e) => handleEditInput("parentId", e.target.value, index, "expanded")}
                                        className='my-1 form-control form-control-sm'
                                    >
                                        <option>Select Parent</option>
                                        {
                                            renderValueLabel.map((option) =>
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
                                        onChange={(e) => handleEditInput("type", e.target.value, index, "expanded")}
                                        value={item.type}
                                        className='my-1 form-control form-control-sm'
                                    >
                                        <option>Select type</option>
                                        <option value={"store"}>Store</option>
                                        <option value={"product"}>Product</option>
                                        <option value={'page'}>Page</option>
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
                            {console.log("type", item)}
                            <Row>
                                <Col lg={4} md={12}>
                                    <input
                                        value={item.name}
                                        name='name'
                                        type='text'
                                        placeholder='category name'
                                        className='my-1 form-control form-control-sm'
                                        onChange={(e) => handleEditInput("name", e.target.value, index, "checked")}
                                    />
                                </Col>
                                <Col lg={4} md={12}>
                                    <select
                                        onChange={(e) => handleEditInput("parentId", e.target.value, index, "checked")}
                                        value={item.parentId}
                                        className='my-1 form-control form-control-sm'
                                    >
                                        <option>Select Parent</option>
                                        {
                                            renderValueLabel.map((option) =>
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
                                        onChange={(e) => handleEditInput("type", e.target.value, index, "checked")}
                                        value={item.type}
                                        className='my-1 form-control form-control-sm'
                                    >
                                        <option>Select type</option>
                                        <option value={"store"}>Store</option>
                                        <option value={"product"}>Product</option>
                                        <option value={'page'}>Page</option>
                                    </select>
                                </Col>
                            </Row>
                        </div>
                    )
                }
                <button
                    className='btn btn-sm btn-primary'
                    type='submit'
                >
                    Submit
                        </button>
            </form>
        </CustomModal>
    );
};

export default UpdateCategoriesModal;