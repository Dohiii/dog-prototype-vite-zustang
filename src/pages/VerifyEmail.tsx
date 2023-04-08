// import { Link } from "react-router-dom"
import { Container, Box, Flex, Center, Text, Square, Button, Heading, Link, InputGroup, Input, InputRightElement, FormControl } from "@chakra-ui/react"

function VerifyEmail() {
  return (
    <Container h={"90vh"} overflow={"hidden"}>
      <Box marginTop={"5rem"}>
        <Heading>Verify your email address</Heading>
        <Text>
          A verification email has been sent to your email address. Please check your inbox and follow the instructions to complete the verification process.{" "}
          <Link marginLeft={"10px"} href="/">
            Re-send Verification email
          </Link>
        </Text>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Link href="/">Back to main screen</Link>

          {/* <Link to="/login">Proceed to login screen</Link> */}
        </Flex>
      </Box>
    </Container>
  )
}

export default VerifyEmail
