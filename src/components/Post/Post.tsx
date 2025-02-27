import React, { use, useEffect } from "react";
import Comment from "../Comment/Comment";
import styles from "./styles.module.css";

interface PostProps {
    post: any;
}

const Post:React.FC<PostProps> = ({post}) => {

    const [comments, setComments] = React.useState<any[]>([]);
    const getComments = async () => {
        const response = await fetch(`http://localhost:3001/posts/${post?.post_id}/comments`);
        const data = await response.json();
        setComments(data);
    }
    useEffect(() => {
        getComments();
    }, [post]);

    // post comment
    const [commentText, setCommentText] = React.useState("");

    const postComment = async (e: any) => {
        e.preventDefault();
        const body = {
            user_id: 1,
            content: commentText
        }
        const response = await fetch(`http://localhost:3001/posts/${post?.post_id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        if (response.status === 201) {
            getComments();
            setCommentText("");
        }
    }

    return (
        <div className={styles.post}>
            <h2>{post?.title}</h2>
            <p>{post?.content}</p>
            <div className={styles.comments}>
                {comments?.length > 0 && <h4>Comments</h4>}
                {comments?.map((comment: any) => (
                    <Comment comment={comment} key={comment?.comment_id} />
                ))}
                <div>
                    <form className={styles.comment_form}>
                        <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Comment" />
                        <button onClick={postComment}>Comment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Post;