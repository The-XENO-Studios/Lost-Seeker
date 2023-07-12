interface cardInfo {
  name: string
  date: {
    month: string
    year: number
  }
  message: string
}
const cardInfo: cardInfo[] = [
  {
    name: "name1",
    date: { month: "month1", year: 2023 },
    message:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum voluptate, omnis, amet nam ducimus,1",
  },
  {
    name: "name2",
    date: { month: "month2", year: 2023 },
    message:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum voluptate, omnis, amet nam ducimus,2",
  },
  {
    name: "name3",
    date: { month: "month3", year: 2023 },
    message:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum voluptate, omnis, amet nam ducimus,3",
  },
]
export default cardInfo
