import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Community = () => {
  const {name} = useParams()
  const [comm, setComm] = useState([])

  useEffect(() => {
    const fetchComm = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/community?name=${name}/`)
        setComm(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchComm()
  }, [])


  return (
    <div>{comm}</div>
  )
}

export default Community