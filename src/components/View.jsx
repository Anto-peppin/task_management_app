import React, { useEffect } from 'react'
import { FaHandPointLeft } from "react-icons/fa6";
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom';
const View = ({viewId}) => {
   const navigate = useNavigate()

  const data =  JSON.parse(localStorage.getItem('task')).find(val=>val.id == viewId)

  const today = new Date();
  
  const dueDate = new Date(data?.date);
  
  
  const diffTime = dueDate - today;
  
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    useEffect(()=>{
        gsap.fromTo('.show',{
            opacity:0,
            stagger:.2,
            duration:.2,
            top:10,
            position:'relative'

        },{
            opacity:1,
            stagger:.2,
            duration:.2,
            top:0,
            position:'relative'
        })

    },[])

  return (
     <div className='w-full '>
        <button onClick={()=>navigate('/home')} className='cursor-pointer ml-5 border mt-5 p-2 flex items-center gap-2 bg-blue-600 text-white px-5 rounded-[50px_0_0_50px]'><FaHandPointLeft  /> Go Back</button>

      {
        data ? (
             <div className=' overflow-x-auto border w-[95%] md:w-[70%] mx-auto p-3 rounded-[20px_0_20px_0] mt-8'>
            <header className=' show flex gap-1 pb-1 mb-2 border-dashed border-b  border-b-gray-500 ' >
                <label className='font-bold '>Title: </label>
                <p>{data?.title}</p>
            </header>

            <main className='show  bg-gray-50 p-1 '>
                <label className='font-bold '>Task Summary:</label>
                <div className='flex flex-col mt-2 ml-2 md:flex-row gap-x-3'>
                    <span className='font-bold '>Due Date : <span className='font-normal'> {`${data?.date?data?.date:'---'}`}</span> </span>
                    <span className='font-bold '>remaining Days : <span className='font-normal'> {`${isNaN(diffDays)?'---':diffDays }`} Days</span> </span>
                </div>

                <div className='flex gap-1 ml-2 mt-2'>
                    <label className='font-bold '>Priority: </label>
                    <span className={`${data.priority=='hard'?'text-red-500':data.priority=='medium'?'text-green-500':'text-yellow-500'}`}>{`${data.priority?data.priority:'----'}`}</span>
                </div>
                
            </main>

            <footer className=' show mt-3'>
                <label className='font-bold  '>Discription: </label>
                <p className=' ml-2 text-[14px] md:text-[17px]'>{`${data.discription?data.discription:'---'}`}</p>
            </footer>



        </div>
        ) : 
        <div className='w-full  mt-10 flex justify-center'>
            <img  src="./nodata.webp" alt=""/>
        </div>
      }

    </div>
    
  )
}

export default View