import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import databaseService from "../../appwrite/database";
import PostCard from "../Elements/PostCard";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        databaseService.getPosts([])
        .then((response)=>{
            setPosts(response.documents);
        })
        .catch((error)=>{
            console.log(`AllPosts :: useEffect :: error`,error);
        })
    },[])
    return (
       <div className="flex flex-wrap">
         {posts.map((post)=> (
            <div key={post.$id}>
                <PostCard {...post} />    
            </div>
         ))}
       </div>
    );
}

export default AllPosts;
