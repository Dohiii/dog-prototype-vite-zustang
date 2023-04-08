import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthStore } from "../stores/authorisation.store"
import { Container, CardBody, Card, Textarea, Box, Flex, Center, Text, Square, Button, Heading, Link, InputGroup, Input, InputRightElement, FormControl } from "@chakra-ui/react"
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query"
import styles from "../assets/styles/Conversation.module.css"

interface LoginData {
  email: string
  password: string
}

const ConversationPage: React.FC = () => {
  const [message, setMessage] = useState<string>("")
  const [unput, setInput] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  const { profileId } = useParams<{ profileId: string }>()

  const { accessToken, profile } = useAuthStore()

  const navigate = useNavigate()

  if (!accessToken) {
    console.log(accessToken)
  }

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversation"],
    queryFn: async () =>
      await axios
        .get(`/messages/${profileId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response: any) => {
          return response.data
        })
        .catch((e) => console.log(e.response.data)),
  })

  useEffect(() => {
    console.log(data)
  }, [])

  useEffect(() => {
    // Set the scroll position of the page to the bottom
    if (contentRef.current !== null) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    })
  }, [data])

  const CreateMessage = async (text: string) => {
    const newMessage = { text: text }
    console.log(newMessage)

    const res: Response = await axios.post(`/messages/${data._id}/conversation`, newMessage, config)

    if (res.ok) {
      return res.json()
    }
    console.log(res)
  }
  const cache = useQueryClient()

  const mutation = useMutation(async (message: any) => CreateMessage(message), {
    // onMutate: async (variables) => {
    //   await cache.cancelQueries({ queryKey: ["conversation"], exact: true })
    // },

    onSuccess: () => {
      cache.invalidateQueries({
        queryKey: ["conversation"],
        exact: true,
      })

      return console.log("mutation data", data)
    },
  })

  if (isLoading) return <div>"Loading..."</div>

  if (error) return <div>{"An error has occurred: " + error}</div>

  const handleClick = (e: any) => {
    e.preventDefault()
    // ✅ mutation is invoked when the form is submitted
    mutation.mutate(message)
    setMessage("")
  }

  return (
    <Container centerContent maxW={"xl"} marginTop={"10rem"}>
      <form>
        <Flex w="400px" direction={"column"} align="center" justify={"center"}>
          <Flex direction={"column"} w={"500px"}>
            {data.messages.map((message: any, index: number) => (
              <Card w={"250px"} key={message._id} margin={"0.2rem"} bg={message.senderId === profile ? "grey" : "green"} marginLeft={message.senderId === profile ? "auto" : "-auto"}>
                <CardBody>
                  <Text>{`${message.text}`}</Text>
                </CardBody>
              </Card>
            ))}
          </Flex>

          <Textarea placeholder="Here is a sample placeholder" marginTop={"2rem"} value={message} onChange={(e) => setMessage(e.target.value)} />
          {mutation.isLoading ? (
            <Button isLoading variant="solid" marginTop={"2rem"} colorScheme="teal">
              Send Message
            </Button>
          ) : (
            <Button marginTop={"2rem"} colorScheme="teal" size="md" onClick={handleClick}>
              Send Message
            </Button>
          )}
        </Flex>
      </form>
    </Container>
  )
}

export default ConversationPage
