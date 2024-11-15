'use client'
import React from 'react'
import { MdArrowBack, MdOutlineAccountBox,MdOutlinePrivacyTip } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiNotification2Line } from "react-icons/ri";
import { IoColorPaletteOutline } from "react-icons/io5";
import { TbHelpSquareRounded } from "react-icons/tb";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const SettingsSidebar = () => {
    const router = useRouter();
    const [referrer, setReferrer] = useState('');

    useEffect(() => {
        setReferrer(document.referrer);
    }, []);

    const handleBackButtonClick = () => {
        if (referrer) {
            router.push(referrer);
        } else {
            router.back();
        }
    };
    return (
        <div>
            <div
                className="relative flex h-full w-1/6 max-w-[20rem] flex-col  bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
                <div className="flex items-center gap-4 p-4 mb-2">
                    <Link href='' onClick={handleBackButtonClick}><MdArrowBack className='text-2xl' /></Link>
                    <h5 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        Settings
                    </h5>
                </div>
                <div className="p-2">
                    <div className="relative h-10 w-full min-w-[200px]">
                        <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                aria-hidden="true" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                            </svg>
                        </div>
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Search
                        </label>
                    </div>
                </div>
                <nav className="flex h-screen justify-between min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                    <div>
                        <div className="relative block w-full">
                            <div role="button"
                                className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <div role="button"
                                    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <div className="grid mr-4 place-items-center">
                                        <MdOutlineSpaceDashboard className='text-2xl' />
                                    </div>
                                    <Link href='/settings/general' className='text-gray-500 font-bold'>General</Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative block w-full">
                            <div role="button"
                                className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <button type="button"
                                    className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-gray-900">
                                    <div className="grid mr-4 place-items-center">
                                        <MdOutlineAccountBox className='text-2xl' />
                                    </div>
                                    <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                                        <Link href='/settings/account' className='text-gray-500 font-bold'>Account</Link>
                                    </p>
                                </button>
                            </div>
                        </div>
                        <div className="relative block w-full">
                            <div role="button"
                                className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <div role="button"
                                    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <div className="grid mr-4 place-items-center">
                                        <FaRegUser className='text-2xl' />
                                    </div>
                                    <a className='text-gray-500 font-bold'>Profile</a>
                                </div>
                            </div>
                        </div>
                        <div className="relative block w-full">
                            <div role="button"
                                className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <div role="button"
                                    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <div className="grid mr-4 place-items-center">
                                        <RiNotification2Line className='text-2xl' />
                                    </div>
                                    <a className='text-gray-500 font-bold'>Notifications</a>
                                </div>
                            </div>
                        </div>
                        <div className="relative block w-full">
                            <div role="button"
                                className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <div role="button"
                                    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <div className="grid mr-4 place-items-center">
                                        <IoColorPaletteOutline className='text-2xl' />
                                    </div>
                                    <a className='text-gray-500 font-bold'>Appearance</a>
                                </div>
                            </div>
                        </div>
                        <div className="relative block w-full">
                            <div role="button"
                                className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <div role="button"
                                    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <div className="grid mr-4 place-items-center">
                                        <MdOutlinePrivacyTip className='text-2xl' />
                                    </div>
                                    <a className='text-gray-500 font-bold'>Privacy</a>
                                </div>
                            </div>
                        </div>
                        <div className="relative block w-full">
                            <div role="button"
                                className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <div role="button"
                                    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <div className="grid mr-4 place-items-center">
                                        <TbHelpSquareRounded className='text-2xl' />
                                    </div>
                                    <a className='text-gray-500 font-bold'>Help</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr className="my-2 border-blue-gray-50" />
                        <div role="button"
                            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <div className="grid mr-4 place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                    className="w-5 h-5">
                                    <path fill-rule="evenodd"
                                        d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <a className='text-gray-500 font-bold'>Inbox</a>
                            <div className="grid ml-auto place-items-center justify-self-end">
                                <div
                                    className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                                    <span className="">14</span>
                                </div>
                            </div>
                        </div>
                        <div role="button"
                            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <div className="grid mr-4 place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                    className="w-5 h-5">
                                    <path fill-rule="evenodd"
                                        d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <a className='text-gray-500 font-bold'>Log Out</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default SettingsSidebar