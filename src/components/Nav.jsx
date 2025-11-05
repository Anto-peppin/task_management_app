
import { useEffect, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const Nav = ({ sWidth,editId }) => {


  
let navigate = useNavigate()
    const[smallNav,setSmallNav] = useState(false)

     useEffect(() => {
    gsap.to("ul", {
          scale: 1,
          ease: "bounce",
          duration: .8,
          opacity: 1,
        })
   
  }, [smallNav]);

  const handleHome = ()=>{
    setSmallNav(false)
    if(JSON.parse(localStorage.getItem('task')).length>=1){
       navigate('home',{replace:false})
    }
    else{
      Swal.fire({
  title: "Add the Task First!",
  text: "Then go to the task session",
  icon: "warning"
});
    }

  }
const handleAdd = ()=>{
   
    setSmallNav(false)
    editId(null)
    navigate('/form',{replace:true})
    
}
return(
     <nav className="w-full p-1 bg-black text-white flex px-3 items-center justify-between ">
        <div className="flex items-center gap-1 ">
            <img className="w-10" src="./logo.webp" alt=""/>
            <h1 className="text-2xl ">Task Management App</h1>
        </div>

       {
        sWidth>=650 ?  <ul className="flex gap-8 mr-10">
            <li className="cursor-pointer hover:text-gray-400 " onClick={handleHome}>HOME</li>
            <li className="cursor-pointer hover:text-gray-400 " onClick={handleAdd}>ADD TASKS</li>
        </ul>:  <div className="relative " >
            <RiMenu3Line className="cursor-pointer" onClick={()=>setSmallNav(!smallNav)} />
          {
            smallNav &&   <ul className=" ul scale-0 absolute text-black text-center font-bold border-2 border-gray-500 top-5 right-5 backdrop-blur-2xl p-2 " style={{whiteSpace:'nowrap',borderRadius:'10px 0px 10px 10px'}}>
                <li className="hover:scale-110 cursor-pointer " onClick={handleHome} >HOME</li>
                <li className="hover:scale-110 cursor-pointer " onClick={handleAdd}>ADD TASKS</li>
            </ul>
          }

        </div>
       }

       
    </nav>

)
   
 
};


export default Nav;



