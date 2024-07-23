import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import { Component, Label, LabelError } from "../../components/Components";
import { faArrowRotateLeft, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
const schema = yup.object({
    name: yup.string()
        .required('Không được để trống')
        .max(30,'Tên tài khoản tối đa 30 ký tự'),
    email: yup.string()
        .email('Email phải hợp lệ')
        .required('Không được để trống')
        .max(50, 'Email dài tối đa 50 ký tự'),
    password: yup.string()
        .required('Không được để trống')
        .min(8, 'Mật khẩu phải dài tối thiểu 8 ký tự')
        .max(20, 'Mật khẩu phải dài tối đa 50 ký tự'),
    confirm_password: yup.string()
        .required('Không được để trống')
        .oneOf([yup.ref('password'), null], 'Mật khẩu phải trùng khớp')
        .min(8).max(20),
})

const Register = () => {
    const { handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const {regiter} = AuthService();
    const formSubmit = async (data) => {
        const { email, password, confirm_password, name } = data;
        regiter(email,password,confirm_password,name);
    };

    return (
        <div className="flex justify-center items-center min-h-screen z-10">    
            <div className="rounded-3xl shadow-xl bg-white w-full max-w-lg">
                <div className="m-10"> 
                    <form className="form flex flex-col"
                        onSubmit={handleSubmit(formSubmit)}
                    >
                        <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#6FD7EE] text-center text-5xl mb-6 font-semibold">
                            Đăng ký
                        </p>
                        <Component name='email' title='Email' placeholder='abc@gmail.com'
                            className1='mt-5'
                            register={register("email")}
                            error={errors?.email} />
                        <Component name='name' title='Tên tài khoản' placeholder='trangchang'
                            className1='mt-5'
                            register={register("name")}
                            error={errors?.name} />
                        <Component name='password' title='Mật khẩu' placeholder='abcd1234'
                            className1='mt-5'
                            register={register("password")}
                            error={errors?.password} />
                        <div className="flex flex-col">
                            <Label className='mt-5' name='confirm_password' title='Xác nhận mật khẩu' />
                            <input
                                className="px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none focus:border-[#6FD7EE] bg-white"
                                type="password"
                                placeholder="abcd1234"
                                id="confirm_password"
                                name="confirm_password"
                                {...register("confirm_password")}
                            />
                            {errors?.confirm_password && (
                                <LabelError name={confirm_password} error={errors?.confirm_password.message} />
                            )}
                        </div>
                        <div className="flex justify-between mt-10 text-center">
                            <Link to="/" className="bg-[#6FD7EE] rounded-3xl px-6 py-3 font-bold text-white">
                                <FontAwesomeIcon icon={faArrowRotateLeft} className="mr-3" />
                                Đăng nhập
                            </Link>
                            <button type="submit" className="bg-[#6FD7EE] rounded-3xl px-6 py-3 font-bold text-white">
                                Đăng ký
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;