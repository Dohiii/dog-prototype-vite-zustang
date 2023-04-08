import React, { useState } from "react"
import axios from "axios"
import styles from "../assets/styles/RegisterForm.module.css"
import { useNavigate } from "react-router-dom"

interface RegisterData {
  name: string
  email: string
  password: string
}

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: RegisterData = { name, email, password }

    try {
      await axios.post("/auth/register", data)
      navigate("/user/verify-email-info")
    } catch (err: any) {
      console.log(err.response.data)
      // setError(err.response.data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Register</h2>
      {error && <div className={styles.error}>{error}</div>}
      <label className={styles.label}>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
      </label>
      <label className={styles.label}>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
      </label>
      <label className={styles.label}>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
      </label>
      <button type="submit" className={styles.button}>
        Register
      </button>
    </form>
  )
}

export default RegisterForm
