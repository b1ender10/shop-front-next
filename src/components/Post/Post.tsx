import React, { use, useEffect } from "react";
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

    return (
        <div className={styles.post}>
            <h2>{post?.title}</h2>
            <p>{post?.content}</p>
            <div className={styles.comments}>
                {comments?.length > 0 && <h4>Comments</h4>}
                {comments?.map((comment: any) => (
                    <div className={styles.comment} key={comment?.comment_id}>
                        <p>{comment?.user_id}</p>
                        <p>{comment?.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Post;