import React, { useEffect } from "react";
import styles from "./styles.module.css";


interface CommentProps {
    comment: any;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    const [user, setUser] = React.useState<any>(null);
    console.log(comment);
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${comment?.user_id}`);
        const data = await response.json();
        setUser(data);
    }
    useEffect(() => {
        getUser();
    }, [comment]);

    return (
        <div className={styles.comment}>
            <p>{user?.first_name} {user?.last_name}</p>
            <p className={styles.comment_content}>{comment?.content}</p>
        </div>
    )
}
export default Comment;