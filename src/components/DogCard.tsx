import React from "react"
import styles from "../assets/styles/DogCard.module.css"

type IDogCardProps = {
  name: string
  age: number
  breed: string
  photo: string
}

const DogCard = ({ name, age, breed, photo }: IDogCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={photo} alt={name} />
      </div>
      <div className={styles.details}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.age}>{age}</p>
        <p className={styles.breed}>{breed} asfasfassfas</p>
      </div>
    </div>
  )
}

export default DogCard
