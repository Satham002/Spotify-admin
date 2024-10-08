import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';
const AddSong = () => {
    const [image, setImage] = useState(false);
    const [song, setSong] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [album, setAlbum] = useState("none");
    const [loading, setLoading] = useState(false);
    const [albumData, setAlbumData] = useState([]);

    const onSubmitHandler = async (e) => {

        // console.log(e)
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('image', image);
            formData.append('file', song);
            formData.append('albam', album);

            const response = await axios.post(`${url}/api/song/add`, formData)
            console.log(name)
            console.log(desc)
            console.log(image)
            console.log(song)

            if (response.data.result) {
                toast.success("Song added")
                setName("")
                setDesc("")
                setImage(false)
                setSong(false)
                setAlbum('none')
            }
            else {
                toast.error("Something went Wrong")
            }
        } catch (error) {
            toast.error("Error occured")
        }
        setLoading(false)
    }

    const loadAlbumData = async () => {
        try {
            const responce = await axios.get(`${url}/api/Albam/list`)
            if (responce.data.result) {
                setAlbumData(responce.data.message)
            }
            else {
                toast.error("unable to load Album")
            }
        } catch (error) {
            toast.error("error occured")
        }
    }

    useEffect(() => {
        loadAlbumData()
    }, [])

    return loading ? (
        <div className='grid place-items-center min-h-[80vh]'>
            <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'>
            </div>

        </div>
    )
        :
        (
            <form className='flex flex-col items-start gap-8 mb-2 text-gray-600' onSubmit={onSubmitHandler}>
                <div className='flex gap-8'>
                    <div className='flex flex-col gap-4'>
                        <p>Upload Song</p>
                        <input type="file" id='Song' accept='audio/*' onChange={(e) => setSong(e.target.files[0])} hidden />
                        <label htmlFor="Song">
                            <img src={song ? assets.upload_added : assets.upload_song} className='w-24 cursor-pointer' alt="" />
                        </label>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <p>Uplode image</p>
                        <input type="file" id='image' accept='image/*' onChange={(e) => setImage(e.target.files[0])} hidden />
                        <label htmlFor="image">
                            <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-24 cursor-pointer' alt="" />
                        </label>
                    </div>
                </div>

                <div className='flex flex-col gap-2.5'>
                    <p>Song Name</p>
                    <input className='bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[max(40vw,250px)]' placeholder='Song name?' type="text" id='name' onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className='flex flex-col gap-2.5'>
                    <p>Song Description</p>
                    <input className='bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[max(40vw,250px)]' placeholder='Song Description?' type="text" id='desc' onChange={(e) => setDesc(e.target.value)} value={desc} required />
                </div>
                <div className='flex flex-col gap-2.5'>
                    <p>Song Albam</p>
                    <select onChange={(e) => setAlbum(e.target.value)} defaultValue={album} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[150px]'>
                        <option value="none">None</option>
                        {
                            albumData.map((item, index) => {
                                return (
                                    <option key={index} value={item.name}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button type='submit' className='text-base text-white py-2.5 px-14 cursor-pointer bg-black'>Add Song</button>
            </form>
        )
}

export default AddSong
