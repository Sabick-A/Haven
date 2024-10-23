import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../appwrite/database";
import { ErrorModal, NewPost } from "..";

function EditPost() {
    const [post, setPost] = useState({});
    const { slug } = useParams();
    const [error, setError] = useState(null);
    const closeModal=()=>{
        setError(null);
    }
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
                    setError(error.message);
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);
    return post ? (
        <div>
            {error && <ErrorModal {...{error,closeModal}}/>}
            <NewPost post={post} />
        </div>
    ) : null;
}

export default EditPost;
