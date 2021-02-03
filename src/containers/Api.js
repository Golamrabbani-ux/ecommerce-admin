import axiosInstance from "../helper/axios";


export const getCategoryDDl = async(setter) =>{
    try {
        const res = await axiosInstance.get('/category/categoryOption');
        if(res.status === 200){
            // eslint-disable-next-line array-callback-return
            const categoryDDl = res?.data?.cat?.map(cat => {
                return {
                    value: cat._id,
                    label: cat.name
                }
            })
            setter(categoryDDl);
        }
    } catch (error) {
        console.log(error.message);
    }
}