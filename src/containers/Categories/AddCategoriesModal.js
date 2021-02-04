import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CustomModal from '../../common/CustomModal';

const AddCategoriesModal = (props) => {
    const {
        show,
        title,
        categoryName,
        handleClose,
        handleSubmit,
        setCategoryName,
        setParentCategoryId,
        renderValueLabel,
        handleCategoryImage
    } = props;
    return (
        <CustomModal
            show={show}
            handleClose={handleClose}
            title={title}
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
                            className='form-control form-control-sm'
                        />
                    </Col>
                    <Col sm={12} className='my-2'>
                        <label>parent name</label>
                        <select
                            onChange={(e) => setParentCategoryId(e.target.value)}
                            className='form-control form-control-sm'
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
                            disabled={!categoryName}
                            type="submit"
                            className='btn btn-sm btn-primary'
                        >
                            Submit
                        </button>
                    </Col>
                </Row>
            </form>
        </CustomModal>
    );
};

export default AddCategoriesModal;