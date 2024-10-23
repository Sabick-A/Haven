import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import databaseService from "../../appwrite/database";
import PostCard from "../Elements/PostCard";
import ErrorModal from "../Elements/ErrorModal";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const closeModal=()=>{
        setError(null);
    }
    useEffect(() => {
        databaseService
            .getPosts([])
            .then((response) => {
                setPosts(response.documents);
            })
            .catch((error) => {
                setError(error.message);
                console.log(`AllPosts :: useEffect :: error`, error);
            });
    }, []);
    return (
        <>
            {error && <ErrorModal {...{error,closeModal}}/>}
            <div className="ml-28 flex flex-wrap ">
                {posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default AllPosts;
