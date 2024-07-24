import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { handleUnauthorized } from "./AuthService";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function urlService() {
    const navigate = useNavigate();
    const createUrl = async (url) => {
        try {
            const response = await api.post("/auth/create",{url});
            if (response.status === 201) {
                return {
                    data: response.data.data.code
                };
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    handleUnauthorized();
                }
                Toastify.error("Đường link đã tồn tại");
            } else {
                Toastify.error("Đã xảy ra lỗi không mong muốn.");
            }
        }
    };
    const getUrlByUser = async () => {
        try {
            const response = await api.get("/auth/list");
            if (response.status === 200) {
                return {
                    data: response.data.data
                };
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    handleUnauthorized();
                }
                Toastify.error(error.response.data.message);
            } else {
                Toastify.error("Đã xảy ra lỗi không mong muốn.");
            }
        }
    };
    const updateUrl = async (code) => {
        try {
            const response = await api.post(`/auth/update/${code}`);
            if (response.status === 200) {
                Toastify.success("Cập nhập thành công");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    handleUnauthorized();
                }
                Toastify.error(error.response.data.message);
            } else {
                Toastify.error("Đã xảy ra lỗi không mong muốn.");
            }
        }
    };
    const deleteUrl = async (id) => {
        try {
            const response = await api.delete(`/auth/delete/${id}`);
            if (response.status === 200) {
                Toastify.success("Xóa thành công");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    handleUnauthorized();
                }
                Toastify.error(error.response.data.message);
            } else {
                Toastify.error("An unexpected error occurred.");
            }
        }
    };
    const shortUrl = async (code) => {
        try {
            const response =await axios.get(`http://localhost:8080/api/find/${code}`);
            if (response.status === 200) {
                const url = response.data.data.url;
                window.location.href = url;
            }
        }  catch (error) {
            if (error.response) {
                return {
                    error: true,
                    message: error.response.data.message
                };
            } else {
                return {
                    error: true,
                    message: "Đã xảy ra lỗi không mong muốn."
                };
            }
        }
    };
   
    return {
        createUrl,
        getUrlByUser,
        updateUrl,
        deleteUrl,
        shortUrl
    };
};

export default urlService;