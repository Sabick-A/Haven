import React, { useCallback, useEffect } from "react";
import { RTE } from "../";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import storageService from "../../appwrite/storage";
import databaseService from "../../appwrite/database";
import { useSelector } from "react-redux";
function NewPost({ post }) {
    const { register, handleSubmit, control, setValue, watch, getValues } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active",
            },
        });
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    const submit = async (data) => {
        if (post) {
            const file = data.image[0]
                ? await storageService.uploadFile(data.image[0])
                : null;
            if (file) {
                storageService.deleteFile(post.image);
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                image: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/posts/${dbPost.$id}`);
            }
        } else {
            const file = data.image[0]
                ? await storageService.uploadFile(data.image[0])
                : null;

            const dbPost = await databaseService.createPost({
                ...data,
                image: file ? file.$id : undefined,
                userId: userData.$id,
            });

            if (dbPost) {
                navigate(`/posts/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((title) => {
        if (title && typeof title === "string") {
            return title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }

        return "";
    }, []);

    useEffect(() => {
        const sub = watch((value, { name }) => {
            if (name == "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => sub.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <>
            <form className="bg-gray-100" onSubmit={handleSubmit(submit)}>
                {/* <div className="header my-3 h-12 px-10 flex items-center justify-between">
                    <h1 className="font-medium text-2xl">NEW POST</h1>
                </div> */}
                <div className="flex flex-col mx-3 mt-6 lg:flex-row">
                    <div className="w-full lg:w-1/3 m-1">
                        <div className="w-full bg-white shadow-md p-6">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-full px-3 mb-6">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="title"
                                    >
                                        TITLE
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                                        type="text"
                                        id="title"
                                        {...register("title", {
                                            required: true,
                                        })}
                                        placeholder="Enter Your Title"
                                    />
                                </div>
                                <div className="w-full md:w-full px-3 mb-6">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="slug"
                                    >
                                        Slug
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-slate-100 text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                                        type="text"
                                        id="slug"
                                        placeholder="Enter Title To Generate Slug"
                                        onInput={(e) => {
                                            setValue(
                                                "slug",
                                                slugTransform(
                                                    e.currentTarget.value
                                                ),
                                                { shouldValidate: true }
                                            );
                                        }}
                                        {...register("slug", {
                                            required: true,
                                        })}
                                        disabled
                                    />
                                </div>
                                <div className="w-full px-3 mb-6">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="summary"
                                    >
                                        Summary
                                    </label>
                                    <textarea
                                        rows="4"
                                        id="summary"
                                        className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                                        type="text"
                                        {...register("summary", {
                                            required: true,
                                        })}
                                    >
                                    </textarea>
                                </div>
                                <div className="w-full px-3 mb-8">
                                    {post && (
                                        <div className="w-full mb-5">
                                            <img
                                                src={storageService.getFilePreview(
                                                    post.image
                                                )}
                                                alt={post.title}
                                                className="rounded-lg"
                                            />
                                        </div>
                                    )}
                                    <label
                                        className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                                        htmlFor="dropzone-file"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-10 w-10 text-green-800"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>

                                        <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                                            Featured image
                                        </h2>

                                        <p className="mt-2 text-gray-500 tracking-wide">
                                            Upload or drag & drop your file SVG,
                                            PNG, JPG or GIF.{" "}
                                        </p>

                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            accept="image/png, image/jpg, image/jpeg, image/gif"
                                            {...register("image")}
                                        />
                                    </label>
                                </div>
                                <div className="w-full md:w-full px-3 mb-6">
                                    <button className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500">
                                        {post ? "Update" : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200">
                        <div className="overflow-x-auto rounded-lg p-6">
                            <RTE
                                label="content"
                                control={control}
                                labelClass="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                defaultValue={getValues("content")}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default NewPost;
