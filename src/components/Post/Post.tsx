import React, { use, useEffect } from "react";

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
        <div>
            <h2>{post?.title}</h2>
            <p>{post?.content}</p>
            {comments?.length > 0 && <h3>Comments</h3>}
            <div>
                {comments?.map((comment: any) => (
                    <div key={comment?.comment_id}>
                        <p>{comment?.user_id}</p>
                        <p>{comment?.content}</p>
                    </div>
                ))}
            </div>

            <hr/>
        </div>
    )
}

export default Post;