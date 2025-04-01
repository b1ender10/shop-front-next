import React, { use, useEffect } from "react";
import Comment from "../Comment/Comment";
import styles from "./styles.module.css";

interface PostProps {
    post: any;
}

const Post: React.FC<PostProps> = ({ post }) => {
    const [comments, setComments] = React.useState<any[]>([]);
    const [commentText, setCommentText] = React.useState("");

    const getComments = async () => {
        const response = await fetch(`http://localhost:3001/posts/${post?.post_id}/comments`);
        const data = await response.json();
        setComments(data);
    }

    useEffect(() => {
        getComments();
    }, [post]);

    const postComment = async (e: any) => {
        e.preventDefault();
        if (!commentText.trim()) return;

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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <article className={styles.post}>
            <header>
                <h2>{post?.title}</h2>
                <div className={styles.meta}>
                    <span>Posted on {formatDate(post?.created_at)}</span>
                    <span>•</span>
                    <span>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
                </div>
            </header>
            
            <div className={styles.content}>
                <p>{post?.content}</p>
            </div>

            <div className={styles.comments}>
                {comments?.length > 0 && (
                    <div className={styles.comments_list}>
                        <h4>Comments</h4>
                        {comments?.map((comment: any) => (
                            <Comment comment={comment} key={comment?.comment_id} />
                        ))}
                    </div>
                )}
                
                <form className={styles.comment_form} onSubmit={postComment}>
                    <input 
                        type="text" 
                        value={commentText} 
                        onChange={(e) => setCommentText(e.target.value)} 
                        placeholder="Write a comment..." 
                    />
                    <button type="submit">Post</button>
                </form>
            </div>
        </article>
    )
}

export default Post;