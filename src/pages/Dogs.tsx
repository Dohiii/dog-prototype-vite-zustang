import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import DogCard from "../components/DogCard"
import styles from "../assets/styles/Dogs.module.css"
import { useAuthStore } from "../stores/authorisation.store"
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query"
import { Container, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Image, Box, Flex, Center, Text, Square, Button, Heading, Link as ChakraLink, InputGroup, Input, InputRightElement, FormControl, Spinner, TagLabel } from "@chakra-ui/react"
import { IDog, IDogsResponse } from "../interfaces/dog.insterface"

const DogsMain = () => {
  const limit = 10
  const [sliderTemperament, setTemperament] = useState(3)
  const [location, setLocation] = useState("Poznan")
  const [debouncedLocationValue, setDebouncedLocationValue] = useState("")

  const handleLocationChange = useCallback((e: any) => {
    setLocation(e.target.value)
  }, [])

  useEffect(() => {
    // Create a timer that will update the debouncedInputValue state
    // after 1 second has elapsed since the last update to the inputValue state
    const timerId = setTimeout(() => {
      setDebouncedLocationValue(location)
    }, 1000)

    // Clean up the timer on each update to the inputValue state
    return () => {
      clearTimeout(timerId)
    }
  }, [location])

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  }

  const getAllDogs = async (location: string, temperament: number) => axios.get<IDogsResponse>(`dogs?page=$1&limit=${limit}&location=${location}&temperament=${temperament}`)

  const queryClient = useQueryClient()

  const { status, data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, error, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: ["dogs", debouncedLocationValue, sliderTemperament],
    queryFn: () => getAllDogs(debouncedLocationValue, sliderTemperament),
    keepPreviousData: true,
  })

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    )

  if (error) return <div>{"An error has occurred: " + error}</div>

  return (
    <Container maxWidth={"1000px"} marginTop={"6rem"}>
      <Heading marginBottom={"5rem"}>Search for a Mate for your Pet</Heading>
      <Flex direction={"row"}>
        {/* sliders */}
        <Flex width={"300px"} direction={"column"} alignItems={"center"}>
          <Text>Location:</Text>
          <Input placeholder="location" w={"200px"} onChange={(e) => handleLocationChange(e)} value={location} />

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
          {isSuccess &&
            data.pages[0].data.items.map((dog: IDog) => (
              <Box width={"200px"} key={dog._id}>
                <a href={`/dogs/${dog._id}`} className={styles.dogCard}>
                  <DogCard name={dog.name} age={dog.age} breed={dog.location} photo={dog.photo} key={dog._id} />
                </a>
              </Box>
            ))}
        </Flex>
      </Flex>
    </Container>
  )
}

export default DogsMain
