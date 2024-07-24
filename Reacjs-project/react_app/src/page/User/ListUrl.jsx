import React, { useState, useEffect } from 'react';
import urlService from '../../services/UrlService';
import {formatDateString} from '../../utility/formatdate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare, faTrash, faLink} from '@fortawesome/free-solid-svg-icons';
import { Toastify } from "../../toastify/Toastify";
const ListUrl = () => {
    const [dataUrls, setDataUrls] = useState([]);
    const {getUrlByUser, updateUrl, deleteUrl} = urlService();

    const fetchData = async () => {
        try {
            const data = await getUrlByUser();
            if (data) {
                setDataUrls(data.data)
            } else {
                setDataUrls([])
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        // setIsCopied(false);
    };
    const truncateItemName = (name) => (name.length > 80 ? name.slice(0, 80) + '...' : name);
    useEffect(() => {
        fetchData();
    }, []);
    const handleUpdate = async (code) => {
        try {
            await updateUrl(code);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
        fetchData();
    };
    const handleDelete = async (id) => {
        try {
            await deleteUrl(id);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
        fetchData();
    };
    // console.log(shortenUrl)
    const handleCopy = async (code) => {
        try {
            await navigator.clipboard.writeText(`http://localhost:3000/${code}`);
            Toastify.success("URL đã được sao chép vào clipboard!")
        } catch (error) {
            Toastify.error("Không thể sao chép URL.")
        }
    };

    return (
        <div className="m-6">
            {dataUrls.length > 0 ? (
                <div className="mt-6 flow-root sm:mt-8">
                    <div className="divide-y divide-gray-200 h-[1050px] sm:h-[100%]">
                        {dataUrls?.map((data) => (
                            <div className="flex flex-wrap items-center gap-y-6 py-6" key={data.id}>
                                <div className="w-full lg:w-full flex flex-wrap lg:flex-nowrap">
                                    <dl className="w-1/2 sm:w-2/5 lg:w-1/2">
                                        <dt className="text-base font-medium text-gray-500">Tên Url:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{truncateItemName(data.url)}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/6 sm:w-1/5 lg:w-1/6">
                                        <dt className="text-base font-medium text-gray-500">Short Url</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">http://localhost:3000/{data.code}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/6 sm:w-1/5 lg:w-1/6">
                                        <dt className="text-base font-medium text-gray-500">Thời gian</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{formatDateString(data.updated_at)}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/6 sm:w-1/5 lg:w-1/6">
                                        <div className='flex flex-row'>
                                            <button onClick={() => handleCopy(data.code)}className="mb-8 text-base font-semibold bg-white">
                                                <FontAwesomeIcon icon={faLink} color={'gray'} size='2x' className='mr-3' />
                                            </button>
                                            <button onClick={() => handleUpdate(data.code)} className="mb-8 text-base font-semibold bg-white">
                                                <FontAwesomeIcon icon={faPenToSquare} color={'green'} size='2x' className='mr-3' />
                                            </button>
                                            <button onClick={() => handleDelete(data.id)}className="mb-8 text-base font-semibold bg-white">
                                                <FontAwesomeIcon icon={faTrash} color={'red'} size='2x' />
                                            </button>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center mt-8 text-gray-500">
                    Không tìm thấy dữ liệu
                </div>
            )}
        </div>
    );

}
export default ListUrl