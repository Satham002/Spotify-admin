import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { toast } from 'react-toastify'

const ListAlbum = () => {
  const [data, setdata] = useState([])

  const fetchAlbum = async () => {
    try {
      const responce = await axios.get(`${url}/api/Albam/list`)
      if (responce.data.result) {
        setdata(responce.data.message)
      }
      else {
        toast.error(responce.data.message)
      }
    } catch (error) {

    }
  }

  const removeAlbum = async (id) => {
    try {
      const responce = await axios.post(`${url}/api/Albam/remove`, { id })
      if (responce.data.result) {
        toast.success(responce.data.message)
        await fetchAlbum();
      }
      else {
        toast.error(responce.data.message)
      }
    } catch (error) {
      toast.error("Something went Wrong")
    }
  }

  useEffect(() => {
    fetchAlbum()
  }, [])

  return (
    <div>
      <p>All Album List</p>
      <br />
      <div className='sm:grid hidden grid-cols-5 items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
        <b>image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Album Color</b>
        <b>Action</b>
      </div>
      {data.map((item, index) => {
        return (
          <div key={index} className='sm:grid hidden grid-cols-5 items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <p>{item.name}</p>
            <img className='w-12' src={item.image} alt="" />
            <p>{item.desc}</p>
            <input type="color" value={item.bgColor} disabled/>
            <p className='text-red-600 font-bold cursor-pointer' onClick={() => { removeAlbum(item._id) }}>X</p>
          </div>
        )
      })}
    </div>
  )
}

export default ListAlbum
