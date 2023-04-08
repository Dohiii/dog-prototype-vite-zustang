import axios from "axios"
import { useQuery } from "react-query"

export const getSingleDog = async (dogId: string) => await axios.get(`/dogs/${dogId}`)

// export const useSingleDog = () => useQuery(["dog", todoId], () => getSingleDog(todoId))
