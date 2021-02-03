
// Render All Categroies
export const renderCategories = (categories) => {
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
export const renderValueLabel = (categories, options = []) => {
    for (let category of categories) {
        options.push({ value: category._id, name: category?.name, parentId: category.parentId })
        if (category.children.length > 0) {
            renderValueLabel(category.children, options)
        }
    }
    return options;
}

// It's call Edit Button
export const handleUpdateCategory = (checked, expanded, setUpdateCategoryModal, category, setExpandedArray, setCheckedArray) => {
    if (checked.length > 0 || expanded.length > 0) {
        setUpdateCategoryModal(true);
        updateCategory(checked, expanded, category, setExpandedArray, setCheckedArray)
    }
    else {
        alert("Please select expanded or checked!")
    }
}

//handleEditInput it means defaultvalue handle
const handleEditInput = (key, value, index, type, expandedArray, setExpandedArray, ) => {
    if (type === "expanded") {
        const updatedExpandedArray = expandedArray.map((item, _index) => _index === index ? { ...item, [key]: value } : item);
        setExpandedArray(updatedExpandedArray)
    }
    else if (type === "checked") {
        const updatedCheckedArray = checkedArray.map((item, _index) => _index === index ? { ...item, [key]: value } : item);
        setCheckedArray(updatedCheckedArray)
    }
}




// It calls delete button
export const handleDeleteCategoryButton = (checked, expanded, setDeleteCategoryModal, category, setExpandedArray, setCheckedArray) => {
    if (checked.length > 0 || expanded.length > 0) {
        setDeleteCategoryModal(true);
        updateCategory(checked, expanded, category, setExpandedArray, setCheckedArray)
    }
    else {
        alert("Please select expanded or checked!")
    }
}

// Update Category 
const updateCategory = (checked, expanded, category, setExpandedArray, setCheckedArray) => {
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

