import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Link as ChackraLink } from "@chakra-ui/react"
import axios from "axios"
import { useAuthStore } from "../stores/authorisation.store"
import { getSingleDog } from "../hooks/useSingleDog"
import { useQuery, useQueryClient } from "react-query"

import { Container, Image, Box, Flex, Center, Text, Square, Button, Heading, Link as ChakraLink, InputGroup, Input, InputRightElement, FormControl } from "@chakra-ui/react"
import { IDog } from "../interfaces/dog.insterface"

const DogSinglePage = () => {
  const { id } = useParams<{ id: string }>()
  const [dog, setDog] = React.useState<IDog | null>(null)
  const navigation = useNavigate()

  const { accessToken } = useAuthStore()

  if (!id) {
    throw new Error("No Id")
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["dog"],
    queryFn: () =>
      axios.get(`/dogs/${id}`).then((response: any) => {
        return response.data
      }),
  })

  const handleNewConversation = async () => {
    try {
      if (!accessToken) {
        console.log(accessToken)
      }

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      }

      console.log(config)

      await axios.post(`/messages/${data.owner._id}`, null, config).then((res) => navigation(`/messages/${data.owner._id}`))
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.log("400 Bad Request error occurred:", error.response.data)
        // Handle 400 error here...
        if (!accessToken) {
          console.log(accessToken)
        }

        const config = {
          headers: { Authorization: `Bearer ${accessToken}` },
        }

        await axios
          .get(`/messages/${data.owner._id}`, config)
          .then((res) => navigation(`/messages/${data.owner._id}`))
          .catch((e) => console.log("400 Bad Request error occurred:", e.response.data))
      } else {
        console.error("An unexpected error occurred:", error)
        // Handle other errors here...
      }
    }
  }

  if (isLoading) return <div>"Loading..."</div>

  if (error) return <div>{"An error has occurred: " + error}</div>

  return (
    <Container w={"1500px"} h={"100vh"} marginTop={"5rem"}>
      <Flex flexDirection={"row"} align={"center"} justify={"center"}>
        <Container w={"800px"}>
          <Link to={`/update-dog-photo/${id}`}>
            <Image src={data.photo}></Image>
          </Link>
          <Text> Owner: {data.owner.username}</Text>
          <ChakraLink onClick={handleNewConversation}>Contact Owner</ChakraLink>
        </Container>
        <Container w={"1000px"}>
          <Heading>{data.name}</Heading>
          <Text marginTop={"1rem"}>
            <span>Sex:</span>
            <span>{data.sex}</span>
          </Text>
          <Text marginTop={"1rem"}>
            <span>Breed:</span>
            <span>{data.breed}</span>
          </Text>
          <Text marginTop={"1rem"}>
            <span>Note:</span>
            <span>{data.note}</span>
          </Text>
          <Text marginTop={"1rem"}>
            <span>Needs:</span>
            <span>{data.needs}</span>
          </Text>
        </Container>
      </Flex>
    </Container>
  )
}

export default DogSinglePage
