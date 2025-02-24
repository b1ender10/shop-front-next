"use client"
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {

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


  return (
    <div className={styles.page}>
      
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
      </div>

      <div>
        <button onClick={signUp}>Sign up</button>
      </div>


    </div>
  );
}
