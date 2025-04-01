"use client";
import Post from "@/components/Post/Post";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";

export default function Home() {
  
  //posts
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts");
    const data = await response.json();
    console.log(data);
    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  //add post
  const addPost = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const body = {
      user_id: 1,
      title: form.title.value,
      content: form.content.value
    }
    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    if (response.status === 201) {
      getPosts();
      form.reset();
    }
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div>
          <h1 className={styles.title}>Write new post</h1>
          <form onSubmit={addPost} className={styles.form}>
            <input type="text" name="title" placeholder="Title" required />
            <textarea name="content" placeholder="Content" required></textarea>
            <button type="submit">Post</button>
          </form>
        </div>

        <div>
          <h1 className={styles.title}>Posts</h1>
          <div className={styles.posts_table}>
            {posts?.map((post: any) => (
              <Post key={post?.post_id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
