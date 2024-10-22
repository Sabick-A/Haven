import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../appwrite/database";
import { NewPost } from "..";

function EditPost() {
    const [post, setPost] = useState({});
    const { slug } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (slug) {
            databaseService
                .getPost(slug)
                .then((response) => {
                    if (response) {
                        setPost(response);
                    }
                })
                .catch((err) => {
                    console.log(`EditPosts :: useEffect :: error`, err);
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);
    return post ? (
        <div>
            <NewPost post={post} />
        </div>
    ) : null;
}

export default EditPost;
