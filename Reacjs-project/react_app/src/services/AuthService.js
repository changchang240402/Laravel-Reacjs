import { useNavigate } from "react-router-dom";
import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
export const handleUnauthorized = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    window.location.href = "/";
};
function AuthService() {
    const navigate = useNavigate();
    const regiter = async (
        email,
        password,
        confirm_password,
        name,
    ) => {
        try {
            const response = await api.post("/auth/register", {
                email,
                password,
                confirm_password,
                name,
            });
            if (response.status === 200) {
                Toastify.success("Đăng ký thành công");
                    navigate('/');
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            } else {
                Toastify.error("Đã xảy ra lỗi không mong muốn.");
            }
        }
    };
    const login = async (email, password) => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });
            if (response.status === 200) {

                Toastify.success("Đăng nhập thành công");
                localStorage.setItem("accessToken", response.data.access_token);
                localStorage.setItem("refreshToken", response.data.refresh_token);
                localStorage.setItem("userName", response.data.user.name);
                navigate('/home');
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    };

    const logout = async () => {
        try {
            const response = await api.post("/auth/logout");
            if (response.status === 200) {
                handleUnauthorized();
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await api.get("/auth/me");
            if (response.status === 200) {
                return response.data.user;
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/");
            }

            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }

    return {
        regiter,
        login,
        logout,
        getUserProfile,
    };
}

export default AuthService;