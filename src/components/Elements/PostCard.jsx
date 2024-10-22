import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import storageService from "../../appwrite/storage";
import authService from "../../appwrite/auth";

function PostCard({
    $id,
    title = "Title",
    username = "",
    summary,
    featuredImage,
}) {
    return (
        <div className=" inline-block w-full max-w-lg h-5/6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden  mx-10 my-10">
            <div className="flex justify-between items-center px-6 py-4">
                <div className="flex space-x-4">
                    {/* we can add pfp here */}
                    <div>
                        <svg
                            className="rounded-full bg-gray-200 dark:bg-gray-600"
                            height="48"
                            width="48"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <image
                                href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s"
                                height="48"
                                width="48"
                                preserveAspectRatio="xMidYMid slice"
                                clipPath="circle(24px at center)"
                            />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-bold dark:text-white">
                            {title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-200">
                            {`@${username}`}
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        role="combobox"
                        aria-controls="radix-:R6dafnnja:"
                        aria-expanded="false"
                        aria-autocomplete="none"
                        dir="ltr"
                        data-state="closed"
                        data-placeholder=""
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Options"
                    >
                        <svg
                            className="w-6 h-6 text-gray-500 dark:text-gray-200"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 opacity-50"
                            aria-hidden="true"
                        >
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </button>
                    <select
                        aria-hidden="true"
                        tabIndex="-1"
                        style={{
                            position: "absolute",
                            border: 0,
                            width: "1px",
                            height: "1px",
                            padding: 0,
                            margin: "-1px",
                            overflow: "hidden",
                            clip: "rect(0, 0, 0, 0)",
                            whiteSpace: "nowrap",
                            wordWrap: "normal",
                        }}
                    >
                        <option value=""></option>
                    </select>
                </div>
            </div>
            {featuredImage && (
                <div className="px-6 py-4 w-full">
                    <img
                        src={storageService.getFilePreview(featuredImage)}
                        alt="Image Here"
                        className="w-full h-64 object-contain"
                        onError={(e) =>
                            console.error("Image failed to load:", e)
                        }
                    />
                </div>
            )}
            <Link to={`/post/${$id}`}>
                <div className="px-6 pb-3 h-20 overflow-hidden">
                    <div
                        className="text-sm text-gray-800 dark:text-gray-200  overflow-hidden text-ellipsis"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                        }}
                        >{summary}
                    </div>
                </div>
                <div className="px-6 pb-5 fle">
                    <div className="text-sm text-gray-800 font-bold dark:text-gray-200">
                        Click To Read More
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PostCard;
