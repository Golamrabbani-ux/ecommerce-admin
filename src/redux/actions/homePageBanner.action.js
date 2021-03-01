import axiosInstance from "../../helper/axios";
import { add_home_page_banner_failed, add_home_page_banner_request, add_home_page_banner_success, get_home_page_banner_failed, get_home_page_banner_request, get_home_page_banner_success } from "../type";

export const addHomePageBanner = (bannerInfo, setter) => {
    return async dispatch => {
        try {
            dispatch({ type: add_home_page_banner_request });
            const res = await axiosInstance.post(`/home-page/banner/add`, bannerInfo);
            if (res.status === 201) {
                const payload = [res.data.bannerInfo]
                dispatch({
                    type: add_home_page_banner_success,
                    payload
                })
                setter(false)
            }
        } catch (error) {
            dispatch({
                type: add_home_page_banner_failed,
                payload: error.message
            })
        }
    }
}

export const editHomePageBanner = (bannerEditInfo, id, setter) => {
    return async dispatch => {
        try {
            const res = await axiosInstance.patch(`/home-page/banner/edit/${id}`, bannerEditInfo);
            if (res.status === 201) {
                const payload = [res.data.bannerInfo]
                dispatch({
                    type: add_home_page_banner_success,
                    payload
                })
                setter(false)
            }
        } catch (error) {
            dispatch({
                type: add_home_page_banner_failed,
                payload: error.message
            })
        }
    }
}
export const deleteHomePageBanner = (id) => {
    return async dispatch => {
        const res = await axiosInstance.delete(`/home-page/banner/delete/${id}`);
        if(res.status === 200){
            return true;
        }
    }
}

export const getHomePageBanners = () => {
    return async dispatch => {
        try {
            dispatch({ type: get_home_page_banner_request })
            const res = await axiosInstance.get('/home-page/get-banner');
            if (res.status === 200) {
                dispatch({
                    type: get_home_page_banner_success,
                    payload: res.data.bannerInfo
                })
            }
        } catch (error) {
            dispatch({
                type: get_home_page_banner_failed,
                payload: error.message
            })
        }
    }
}