import { NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/authorisation.store"
import { Container, Box, Flex, Center, Text, Square, Button, Heading, Link, InputGroup, Input, InputRightElement, FormControl } from "@chakra-ui/react"
import styles from "../assets/styles/Nav.module.css"
export function NavBar() {
  const { loggedIn, logOut, profile } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/dogs")
    logOut()
  }

  return (
    <Flex w={"100%"} h={"90px"} zIndex={"100"} className={styles.nav}>
      <nav className="navbar-container">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dogs">Dogs</NavLink>
        {loggedIn ? <NavLink to={`/profile/${profile}`}>My Profile</NavLink> : ""}
        {loggedIn ? <NavLink to={`/create-dog`}>Create Dog</NavLink> : ""}

        {loggedIn ? <a onClick={handleLogout}>LogOut</a> : ""}
      </nav>
    </Flex>
  )
}
