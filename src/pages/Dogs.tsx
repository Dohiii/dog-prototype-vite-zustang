import React, { useState, useEffect } from "react"
import axios from "axios"
import DogCard from "../components/DogCard"
import styles from "../assets/styles/Dogs.module.css"
import { useAuthStore } from "../stores/authorisation.store"
import { useQuery, useQueryClient } from "react-query"
import { Container, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Image, Box, Flex, Center, Text, Square, Button, Heading, Link as ChakraLink, InputGroup, Input, InputRightElement, FormControl, Spinner, TagLabel } from "@chakra-ui/react"
import { IDog, IDogsResponse } from "../interfaces/dog.insterface"

const DogsMain = () => {
  const LIMIT = 10
  const [sliderTemperament, setTemperament] = useState(3)

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  }

  const getAllDogs = async(page: number) => axios.get<IDogsResponse>(`/dogs/${}`)

  const cache = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["dogs"],
    queryFn: () =>
      axios.get<IDogsResponse>("/dogs").then((response: any) => {
        return response.data.items
      }),
    onSuccess: () => {
      cache.invalidateQueries({
        queryKey: ["dogs"],
        exact: true,
      })
    },
  })

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    )

  if (error) return <div>{"An error has occurred: " + error}</div>

  if (!data)
    return (
      <div>
        <Spinner />
      </div>
    )

  return (
    <Container maxWidth={"1000px"} marginTop={"6rem"}>
      <Heading marginBottom={"5rem"}>Search for a Mate for your Pet</Heading>
      <Flex direction={"row"}>
        {/* sliders */}
        <Flex width={"300px"} direction={"column"} alignItems={"center"}>
          <Box width={"200px"} pt={6} pb={2}>
            <Text marginBottom={"1rem"}>Temperament</Text>
            <Slider min={1} max={5} aria-label="slider-ex-1" onChange={(val) => setTemperament(val)}>
              <SliderMark value={1} {...labelStyles}>
                1
              </SliderMark>
              <SliderMark value={2} {...labelStyles}>
                2
              </SliderMark>
              <SliderMark value={3} {...labelStyles}>
                3
              </SliderMark>
              <SliderMark value={4} {...labelStyles}>
                4
              </SliderMark>
              <SliderMark value={5} {...labelStyles}>
                5
              </SliderMark>

              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text marginTop={"1rem"}>spokojny - energiczny</Text>
          </Box>
        </Flex>
        <Flex width={"700px"} flexWrap={"wrap"}>
          {data.map((dog: IDog) =>
            isLoading ? (
              <Spinner />
            ) : (
              <Box width={"200px"} key={dog._id}>
                <a href={`/dogs/${dog._id}`} className={styles.dogCard}>
                  <DogCard name={dog.name} age={dog.age} breed={dog.breed} photo={dog.photo} key={dog._id} />
                </a>
              </Box>
            )
          )}
        </Flex>
      </Flex>
    </Container>
  )
}

export default DogsMain
