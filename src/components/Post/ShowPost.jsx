import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../../appwrite/database";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import storageService from "../../appwrite/storage";

function ShowPost() {
    const { slug } = useParams();
    const [post, setPost] = useState({});
    const [date, setDate] = useState();
    const [isAuthor, setIsAuthor] = useState(false);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const closeModal = () => {
        setError(null);
    };
    useEffect(() => {
        databaseService
            .getPost(slug)
            .then((response) => {
                setPost(response);

                const date = new Date(response.$createdAt);
                const options = {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                };
                setDate(date.toLocaleDateString("en-US", options));

                const author = response.userId;
                if (userData) {
                    setIsAuthor(author === userData.$id);
                } else {
                    setIsAuthor(false);
                }

                console.log(isAuthor);
            })
            .catch((error) => {
                console.log(`ShowPost :: useEffect :: error`, error);
                setError(error.message);
            });
    }, [slug, userData]);

    const handleDelete = () => {
        databaseService
            .deletePost(post.$id)
            .then((status) => {
                if (status) {
                    storageService.deleteFile(post.featuredImage);
                    navigate("/");
                } else {
                    throw new Error("Unable to delete post");
                }
            })
            .catch((error) => {
                console.log(`ShowPost :: handleDelete :: error`, error);
                setError(error.message);
            });
    };
    return (
        <>
            {error && <ErrorModal {...{ error, closeModal }} />}
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
                <div className="flex justify-between px-4 mx-auto max-w-screen-6xl ">
                    <article className="mx-auto w-full max-w-6xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            <address className="flex items-center mb-10 not-italic">
                                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    <img
                                        className="mr-4 w-16 h-16 rounded-full bg-gray-200"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s"
                                        alt=""
                                    />
                                    <div>
                                        <a
                                            href="#"
                                            rel="author"
                                            className="text-xl font-bold text-gray-900 dark:text-white"
                                        >
                                            {post.username}
                                        </a>
                                        {/* <p className="text-base text-gray-500 dark:text-gray-400">Graphic Designer, educator /p>  if i want to add profile of user*/}
                                        <p className="text-base text-gray-500 dark:text-gray-400">
                                            <time
                                                pubdate="true"
                                                dateTime={date}
                                                title="February 8th, 2022"
                                            >
                                                {date}
                                            </time>
                                        </p>
                                    </div>
                                </div>
                            </address>
                            <div className="head flex justify-between ">
                                <div className="title w-3/5">
                                    <h1 className="mb-4 text-3xl  font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl  dark:text-white">
                                        {post.title}
                                    </h1>
                                </div>
                                {isAuthor && (
                                    <div className="options w-2/5 flex self-start justify-center gap-x-20">
                                        <Link to={`/post/edit/${post.$id}`}>
                                            <button class="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#3b82f6] via-[#2563eb] to-[#1e40af] hover:shadow-xl hover:shadow-blue-500 hover:scale-105 duration-300 hover:from-[#1e3a8a] hover:to-[#60a5fa]">
                                                <svg
                                                    class="w-6 h-6"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                                EDIT
                                            </button>
                                        </Link>

                                        <button
                                            onClick={handleDelete}
                                            class="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                                        >
                                            <svg
                                                viewBox="0 0 15 15"
                                                class="w-5 fill-white"
                                            >
                                                <svg
                                                    class="w-6 h-6"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        stroke-linejoin="round"
                                                        stroke-linecap="round"
                                                    ></path>
                                                </svg>
                                            </svg>
                                            DELETE
                                        </button>
                                    </div>
                                )}
                            </div>
                        </header>
                        <div className="content prose prose-lg dark:prose-dark max-w-6xl">
                            {post.content && parse(post.content)}
                        </div>
                    </article>
                </div>
            </main>
        </>
    );
}

export default ShowPost;
