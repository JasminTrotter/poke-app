export type Pokemon = {
  id: number
  image: string
  name: string
  stats: {
    hp: number
    attack: number
    defense: number
    speed: number
  }
  types: string[]
}
