export interface IDogsResponse {
  items: IDog[]
  totalItems: number
  itemsPerPage: number
  totalPages: number
  location: string
  currentPage: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface IDog {
  _id: string
  name: string
  age: number
  location: string
  breed: string
  photo: string
}
