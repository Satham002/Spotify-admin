import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { url } from '../App'

const AddAlbum = () => {

  const [image, setImage] = useState(false)
  const [name, setname] = useState("")
  const [desc, setDesc] = useState("")
  const [color, setColor] = useState("#000000")
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      const formData = new FormData()
      formData.append("name", name)
      formData.append('desc', desc)
      formData.append("bgColor", color)
      formData.append("image", image)
      console.log(desc);
      const responce = await axios.post(`${url}/api/Albam/add`, formData)
      if (responce.data.result) {
        setImage(false)
        setname("")
        setDesc("")
        setColor("#000000")
        toast.success(responce.data.message)
      }
      else {
        toast.error(responce.data.message)
      }
    } catch (error) {
      toast.error("error occured")
    }
    setLoading(false)
  }

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'>
      </div>

    </div>
  )
    : (
      <form className='flex flex-col items-start gap-8 text-gray-600' onSubmit={onSubmitHandler}>
        <div className='flex flex-col gap-4'>
          <p>Uplode image</p>
          <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id='image' accept='image/*' hidden required />
          <label htmlFor="image">
            <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
        </div>
        <div className='flex flex-col gap-2.5'>
          <p>Album Name</p>
          <input onChange={(e) => { setname(e.target.value) }} value={name} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[max(40vw,250px)]' type="text" placeholder='Album Name?' required />
        </div>
        <div className='flex flex-col gap-2.5'>
          <p>Description</p>
          <input onChange={(e) => { setDesc(e.target.value) }} value={desc} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[max(40vw,250px)]' type="text" placeholder='Album Description?' required />
        </div>
        <div className='flex flex-col gap-3'>
          <div>
            <p>Background Color</p>
            <input onChange={(e) => { setColor(e.target.value) }} type="color" value={color} required />
          </div>
          <button className='text-base bg-black text-white py-2.5 px-14 cursor-pointer' type="submit">Submit</button>
        </div>

      </form>
    )
}

export default AddAlbum
