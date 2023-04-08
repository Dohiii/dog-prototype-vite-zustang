import React, { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Link as ChackraLink } from "@chakra-ui/react"
import axios from "axios"
import { useAuthStore } from "../stores/authorisation.store"
import { getSingleDog } from "../hooks/useSingleDog"
import { useMutation, useQuery, useQueryClient } from "react-query"

import { Container, Image, Box, Flex, Center, Text, Square, Button, Heading, Link as ChakraLink, InputGroup, Input, InputRightElement, FormControl } from "@chakra-ui/react"
import { IDog } from "../interfaces/dog.insterface"

const UpdateDogPhoto = () => {
  const { id } = useParams<{ id: string }>()

  const { isLoading, error, data } = useQuery({
    queryKey: ["dog"],
    queryFn: () =>
      axios.get(`/dogs/${id}`).then((response: any) => {
        return response.data
      }),
  })

  const [dog, setDog] = React.useState<IDog | null>(null)
  const navigate = useNavigate()

  const { accessToken } = useAuthStore()

  const config = {
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" },
  }

  if (!id) {
    throw new Error("No Id")
  }

  const [selectedImage, setSelectedImage] = useState<string | null>(data.photo)
  const [formData, setFormData] = useState(new FormData())

  const handleImageSelect = (event: any) => {
    const file = event.target.files[0]
    formData.set("image", file)

    setSelectedImage(URL.createObjectURL(file))
  }

  const UpdateImage = async (newDogData: IDog) => await axios.patch(`/dogs/upload-dog-image/${id}`, newDogData, config)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newDogData: any) => UpdateImage(newDogData),
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dogs"],
        exact: true,
      })

      navigate(`/dogs/${id}`)
    },
  })

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    try {
      mutation.mutate(formData)
    } catch (e: any) {
      console.log("Nope")
    }
  }

  if (isLoading) return <div>"Loading..."</div>

  if (error) return <div>{"An error has occurred: " + error}</div>

  return (
    <Container w={"1500px"} h={"100vh"} marginTop={"5rem"}>
      <Flex flexDirection={"row"} align={"center"} justify={"center"}>
        <form>
          <Heading marginTop={"20%"}>Update Dog Picture</Heading>
          <Flex direction={"row"}>
            <Input type="file" accept="image/*" id="myFile" name="filename" marginTop={"5rem"} onChange={handleImageSelect} />
            {selectedImage && <Image src={selectedImage} boxSize="150px" objectFit="cover" />}
          </Flex>

          {mutation.isLoading ? <Button isLoading>Update Photo</Button> : <Button onClick={(e) => handleSubmit(e)}>Update Photo</Button>}
        </form>
      </Flex>
    </Container>
  )
}

export default UpdateDogPhoto
