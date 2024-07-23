import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import { Component } from "../../components/Components";
const schema = yup.object({
    email: yup.string()
        .email('Email phải hợp lệ')
        .required('Không được để trống')
        .max(50, 'Email dài tối đa 50 ký tự'),
    password: yup.string()
        .required('Không được để trống')
        .min(8, 'Mật khẩu phải dài tối thiểu 8 ký tự')
        .max(20, 'Mật khẩu phải dài tối đa 50 ký tự'),
})

const Login = () => {
    const { login } = AuthService();

    const { handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const formSubmit = async (data) => {
        const { email, password } = data;
        login(email, password);
    };

    return (
        <div className="flex justify-center items-center min-h-screen z-10">    
            <div className="rounded-3xl shadow-xl bg-white w-full max-w-lg">
                <div className="m-10">
                    <form
                        className="form flex flex-col"
                        onSubmit={handleSubmit(formSubmit)}
                    >
                        <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#6FD7EE] text-center text-5xl mb-8 font-semibold">
                            Đăng nhập
                        </p>
                        <Component name='email' title='Email' placeholder='abc@gmail.com'
                            register={register("email")}
                            error={errors?.email} />
                        <Component name='password' title='Mật khẩu' placeholder='abcd1234'
                            className1='mt-12'
                            register={register("password")}
                            error={errors?.password} />
                        <div className="flex justify-center mt-16 text-center">
                            <button className="bg-[#6FD7EE] rounded-3xl px-6 py-3 font-bold text-white">
                                ĐĂNG NHẬP
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <div style={{ fontFamily: 'Lobster, cursive' }} className="font-medium text-lg mb-2 text-[#6FD7EE]">
                                Bạn chưa có tài khoản ?
                                <Link to="/register" className="text-gray-900 ml-1">Đăng ký tại đây</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;