import React from 'react';
import CustomModal from '../../common/CustomModal';

const DeleteCategoriesModal = (props) => {
    const {
        show,
        handleClose,
        setDeleteCategoryModal,
        handleDeleteCategory,
        expandedArray,
        checkedArray
    } = props;
    return (
        <CustomModal
            show={show}
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
    );
};

export default DeleteCategoriesModal;