import styles from "../assets/styles/HomePage.module.css"

import { Container, Box, Flex, Center, Text, Square, Button, Heading, Link } from "@chakra-ui/react"

function HomePage() {
  return (
    <Container centerContent h={"93vh"} maxW={"xl"}>
      <Flex w="900px" direction={"column"} align="center" justify={"center"}>
        <Heading marginTop={"20%"}>Welcome to my app!</Heading>
        <Text fontSize="3xl">Please select an option below:</Text>
        <Box>
          <Link fontSize={"4xl"} marginRight={"10px"} href="/login" className={styles.navLink}>
            Login
          </Link>
          <Link fontSize={"4xl"} href="/register" className={styles.navLink}>
            Register
          </Link>
        </Box>
      </Flex>
    </Container>

    // <div className={styles.container}>
    //   <h1 className={styles.title}>Welcome to my app!</h1>
    //   <p className={styles.message}>Please select an option below:</p>
    //   <nav>
    //     <ul className={styles.navList}>
    //       <li className={styles.navItem}>
    //         <Link to="/login" className={styles.navLink}>
    //           Login
    //         </Link>
    //       </li>
    //       <li className={styles.navItem}>
    //         <Link to="/register" className={styles.navLink}>
    //           Register
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
  )
}

export default HomePage
