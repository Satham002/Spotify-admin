import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { toast } from 'react-toastify'

const ListSong = () => {

  const [data, setData] = useState([])

  const fetchSong = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`)
      if (response.data.result) {
        console.log(response.data.message)
        setData(response.data.message)
      }
    }
    catch (error) {
      toast.error("Error occured")
    }
  }

  useEffect(() => {
    fetchSong()
  }, [])

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove/`,{id})
      console.log(`${url}/api/song/remove`, { id })
      if (response.data.result) {
        toast.success(response.data.message)
        await fetchSong()
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error occured")
    }

  }
  return (
    <div>
      <p>All Song List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-5 items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {
          data.map((item, index) => {
            return (
              <div key={index} className='sm:grid hidden grid-cols-5 items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                <img src={item.image} alt="" className='w-12' />
                <p>{item.name}</p>
                <p>{item.albam}</p>
                <p>{item.duration}</p>
                <p onClick={() => (removeSong(item._id))} className='cursor-pointer text-red-500 font-bold items-center'>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ListSong
