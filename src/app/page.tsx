"use client"
import Post from "@/components/Post/Post";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {


  //signup
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const signUp = async () => {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password_hash: password,
        firstName,
        lastName
      }),
    });

    const data = await response.json();
    console.log(data);
  }

  //users
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:3001/users");
    const data = await response.json();
    console.log(data);
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, []);

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

  //products
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();
    console.log(data);
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  //orders
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await fetch("http://localhost:3001/orders");
    const data = await response.json();
    console.log(data);
    setOrders(data);
  }

  useEffect(() => {
    getOrders();
  }, []);

  //order items
  const [orderItems, setOrderItems] = useState([]);

  const getOrderItems = async () => {
    const response = await fetch("http://localhost:3001/orders-items");
    const data = await response.json();
    console.log(data);
    setOrderItems(data);
  }

  useEffect(() => {
    getOrderItems();
  }, []);


  return (
    <div className={styles.page}>
      <div>
        <h1>Sign up</h1>
        <div style={{display: "flex", flexDirection: "column"}}>
          <label>First Name</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <label>Last Name</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />

          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={signUp}>Sign up</button>
        </div>
      </div>

      <div>
        <h1>Users</h1>
        <div className={styles.users_table}>
          <button onClick={getUsers}>refresh</button>
          <div className={styles.users_table_row}>
            <h2>Username</h2>
            <h2>Email</h2>
            <h2>First Name</h2>
            <h2>Last Name</h2>
          </div>

          {users?.map((user: any) => (
            <div key={user?.user_id} className={styles.users_table_row}>
              <p>{user?.username}</p>
              <p>{user?.email}</p>
              <p>{user?.first_name}</p>
              <p>{user?.last_name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1>Posts</h1>
        <div className={styles.posts_table}>
          {posts?.map((post: any) => (
            <Post key={post?.post_id} post={post} />
          ))}
        </div>
      </div>

      <div>
        <h1>Products</h1>
        {products?.map((product: any) => (
          <div key={product?.product_id} style={{display: "flex", gap: "10px"}}>
            <p>{product?.name}</p>
            <p>{product?.description}</p>
            <p>{product?.price}</p>
          </div>
        ))}
      </div>

      <div>
        <h1>Orders</h1>
        {orders?.map((order: any) => (
          <div key={order?.order_id} style={{display: "flex", gap: "10px"}}>
            <p>{order?.user_id}</p>
            <p>{order?.total_amount}</p>
            <p>{order?.status}</p>
          </div>
        ))}
      </div>

      <div>
        <h1>Orders Items</h1>
        {orderItems?.map((orderItem: any) => (
          <div key={orderItem?.order_item_id} style={{display: "flex", gap: "10px"}}>
            <p>{orderItem?.order_id}</p>
            <p>{orderItem?.product_id}</p>
            <p>{orderItem?.quantity}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
