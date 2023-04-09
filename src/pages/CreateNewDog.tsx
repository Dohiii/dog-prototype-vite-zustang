import { useRef, useState } from "react"
import styles from "../assets/styles/LoginPage.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/authorisation.store"
import { Modal, ModalOverlay, ModalHeader, ModalFooter, ModalBody, ModalContent, ModalCloseButton, Container, Spinner, Select, Box, Flex, Center, Text, Square, Button, Heading, Link, InputGroup, Input, InputRightElement, FormControl, Avatar, Image, useDisclosure } from "@chakra-ui/react"
import { IDog } from "../interfaces/dog.insterface"
import { useMutation, useQuery, useQueryClient } from "react-query"

const CreateNewDog: React.FC = () => {
  const [formData, setFormData] = useState(new FormData())

  const { accessToken, profile } = useAuthStore()

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [name, setName] = useState<string>("")
  const [sex, setSex] = useState<string>("")
  const [age, setAge] = useState<number>(1)
  const [size, setSize] = useState<string>("")
  const [temperament, setTemperament] = useState<number>(3)
  const [aggresive, setAgressive] = useState<number>(3)

  const navigate = useNavigate()

  if (!accessToken) {
    console.log(accessToken)
  }

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const CreateDog = async (newDogData: IDog) => await axios.post(`/dogs`, newDogData, config)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newDogData: any) => CreateDog(newDogData),
    onError: (data, error) => {
      console.log
      console.log(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dogs"],
        exact: true,
      })

      navigate(`/dogs/${data.data._id}`)
    },
  })

  const handleImageSelect = (event: any) => {
    const file = event.target.files[0]
    formData.set("image", file)
    setSelectedImage(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    try {
      const dogData = { name: name, age: age, temperament: temperament, aggresive: aggresive, size: size, sex: sex }

      // Append form data to request
      formData.append("data", JSON.stringify(dogData))

      mutation.mutate(formData)

      // mutation.mutate(dogData)
    } catch (e: any) {
      console.log("Nope")
    }
  }

  if (mutation.isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    )

  return (
    <Container centerContent h={"93vh"} maxW={"xl"} marginTop={"5rem"}>
      <form>
        <Heading marginTop={"20%"}>Update Dog Picture</Heading>
        <Flex direction={"row"}>
          <Input type="file" accept="image/*" id="myFile" name="filename" marginTop={"5rem"} onChange={handleImageSelect} />
          {selectedImage && <Image src={selectedImage} boxSize="150px" objectFit="cover" />}
        </Flex>
      </form>

      <form>
        <Flex w="400px" direction={"column"} align="center" justify={"center"}>
          <Heading marginTop={"20%"}>Create new Dog</Heading>
          <Input placeholder="name" onChange={(e: any) => setName(e.target.value)} />
          <Select placeholder="Rozmiar" onChange={(e: any) => setSize(e.target.value)}>
            <option value="mały">mały</option>
            <option value="średni">średni</option>
            <option value="duży">duży</option>
            <option value="ogromny">ogromny</option>
            <option value="insane">insane</option>
          </Select>
          <Select placeholder="Sex" onChange={(e: any) => setSex(e.target.value)}>
            <option value="pies">pies</option>
            <option value="suka"></option>
          </Select>
          <Select placeholder="Temperament" onChange={(e: any) => setTemperament(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
          <Select placeholder="Agresive" onChange={(e: any) => setAgressive(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
          <Input type="number" placeholder="age" onChange={(e: any) => setAge(e.target.value)} />
          {mutation.isLoading ? (
            <Button isLoading marginTop={"1rem"} colorScheme="teal" size="md">
              Create New Dog
            </Button>
          ) : (
            <Button marginTop={"1rem"} colorScheme="teal" size="md" onClick={(e) => handleSubmit(e)}>
              Create New Dog
            </Button>
          )}
        </Flex>
      </form>
    </Container>
  )
}

export default CreateNewDog
