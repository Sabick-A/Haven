import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import databaseService from '../../appwrite/database';
import { Query } from 'appwrite';
import PostCard from '../Elements/PostCard';

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const userData=useSelector((state)=>state.auth.userData);
    useEffect(()=>{
        databaseService.getPosts([Query.equal('userId', userData.$id)])
        .then((response)=>{
            setPosts(response.documents);
        })
        .catch((error)=>{
            console.log(`AllPosts :: useEffect :: error`,error);
        })
    },[])
    return (
       <div className="flex ">
         {posts.map((post)=> (
            <div key={post.$id}>
                <PostCard {...post} />    
            </div>
         ))}
       </div>
    );
}

export default MyPosts