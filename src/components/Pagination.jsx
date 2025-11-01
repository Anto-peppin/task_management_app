import { useEffect, useState } from 'react'

const Pagination = ({data=[],set}) => {

    const[dataPerPage] = useState(5)
    const[currentPage,setCurrentPage] = useState(1)
    let end = currentPage * dataPerPage
    let start = end - dataPerPage

// let data = JSON.parse(localStorage.getItem('task'))


let finalData = data.slice(start,end)
let count = Math.ceil(data.length/dataPerPage)

useEffect(()=>{
    set(finalData);
},[data, currentPage])

  const changeValue = (val) => setCurrentPage(val);

const butSty = {
    border:'2px solid black',
    backgroundColor:'blue',
    cursor:'pointer',
    padding:5,
    color:'white',
    borderRadius:'8px',



}

  return (
    <div className='flex justify-center gap-2  mt-5 mb-3 '>
        {
           new Array(count).fill(0).map((_,ind)=>(
            <button onClick={()=>changeValue(ind+1)} style={butSty} key={ind}>{ind+1}</button>
           )) 

        }

    </div>
  )
}

export default Pagination