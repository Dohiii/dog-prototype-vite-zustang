import { Link, useNavigate } from "react-router-dom"
import styles from "../assets/styles/VerifyEmail.module.css"
import axios from "axios"

function VerifyEmailConfirm() {
  const queryParameters = new URLSearchParams(window.location.search)
  const token = queryParameters.get("token")
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      await axios.post("/auth/verify-email", { verificationToken: token })
      navigate("/login")
    } catch (err: any) {
      console.log(err.response.data)
      // setError(err.response.data.message);
    }
  }
  return (
    <div className={styles.VerifyEmailConfirm}>
      <h2>Verify your email address</h2>
      <p>Please confirm your email.</p>
      <button onClick={handleSubmit}>Verify email</button>
      <div className={styles.verifyEmailButtons}></div>
    </div>
  )
}

export default VerifyEmailConfirm
