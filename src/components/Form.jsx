import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({editId}) => {

  
   const navigate = useNavigate();


   const [final,setFinal] = useState(JSON.parse(localStorage.getItem('task')))

  let time = new Date();
  let day = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();

  const reducer = (state, action) => {
    let { type, value } = action;

    switch (type) {
      case "title":
        return { ...state, [type]: value };

      case "discription":
        return { ...state, [type]: value };

      case "date":
        return { ...state, [type]: value };

      case "priority":
        return { ...state, [type]: value };
    }
    
  };

  const [taskData, dispatch] = useReducer(reducer, {
    id: editId == null ? JSON.parse(localStorage.getItem('task')).length+1 :editId ,
    title: "",
    discription: "",
    date: "",
    priority: "",
    view:false
  });

  function handleInput(e) {
    let { name, value } = e.target;

    dispatch({ type: name, value });
  }
  const handleSave = ()=>{
   
    
    if(editId !== null){
     let newData = JSON.parse(localStorage.getItem('task')).map(val=>val.id == editId ? taskData:val)
     localStorage.setItem('task',JSON.stringify(newData))
     navigate('/home',{replace:true})
    }
    else{
      setFinal(pre=>[...pre,taskData])
      navigate('/home',{replace:true})
    }

  }




useEffect(()=>{

  
  let editcon =  JSON.parse(localStorage.getItem('task')).filter(val=>editId == val.id)
  if(editId !== null ){
 

   dispatch({ type: "title", value: editcon[0]?.title });
    dispatch({ type: "discription", value: editcon[0]?.discription });
    dispatch({ type: "date", value: editcon[0]?.date });
    dispatch({ type: "priority", value: editcon[0]?.priority });
   

  }
  else{
    dispatch({ type: "title", value: ''});
    dispatch({ type: "discription", value: '' });
    dispatch({ type: "date", value: '' });
    dispatch({ type: "priority", value: '' });
   

  }
},[editId])

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(final));
  }, [final]);

const handleCancel = ()=>{
  navigate('/home',{replace:true})
}
  

  return (
  <div className='w-full min-h-screen flex items-center justify-center'>
    <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto my-5 bg-gray-200 p-4 rounded-3xl flex flex-col gap-3.5">
      <div className="flex flex-col gap-1 ">
        <label className="text-xl font-bold " htmlFor="title">
          Task Title:
        </label>
        <input
        value={taskData.title}
          name="title"
          onChange={handleInput}
          className=" outline-0 shadow-[inset_3px_3px_3px_rgba(0,0,0,0.80),inset_-3px_-3px_3px_white] focus:shadow-[3px_3px_3px_rgba(0,0,0,0.80),-3px_-3px_3px_white] rounded-2xl p-2 font-bold  "
          id="title"
          type="text"
          placeholder="Task Name"
        />
      </div>

      <div className="flex flex-col gap-1 ">
        <label className="text-xl font-bold " htmlFor="dis">
          Task Discription:
        </label>
        <textarea
        value={taskData.discription}
          name="discription"
          onChange={handleInput}
          className=" custom-scrollbar h-[100px] resize-none outline-0  shadow-[inset_3px_3px_3px_rgba(0,0,0,0.80),inset_-3px_-3px_3px_white] focus:shadow-[3px_3px_3px_rgba(0,0,0,0.80),-3px_-3px_3px_white] rounded-2xl p-2 px-3 font-bold  "
          id="dis"
        ></textarea>
      </div>

      <div className="flex flex-col gap-1 ">
        <label className="text-xl font-bold " htmlFor="date">
          Due Date:
        </label>
        <input
        value={taskData.date}
          name="date"
          onChange={handleInput}
          min={`${year}-${month}-${day}`}
          max={`2026-${month}-${day}`}
          className=" self-start outline-0  shadow-[inset_3px_3px_3px_rgba(0,0,0,0.80),inset_-3px_-3px_3px_white] focus:shadow-[3px_3px_3px_rgba(0,0,0,0.80),-3px_-3px_3px_white] rounded-2xl p-2 font-bold  "
          id="date"
          type="date"
        />
      </div>

      <div className="flex flex-col  gap-2">
        <label className="text-xl font-bold" htmlFor="">
          Priority Status:
        </label>
        <div className="flex gap-2 items-center ml-2 ">
          <span className=" flex gap-1 p-1 px-2 rounded shadow-[inset_3px_3px_3px_rgba(0,0,0,0.80),inset_-3px_-3px_3px_white]">
            <input
              value="high"
              name="priority"
              onChange={handleInput}
              id="high"
              className="accent-red-500 "
              type="radio"
            />
            <label htmlFor="high" className="font-bold">
              HIGH
            </label>
          </span>
          <span className=" flex gap-1 p-1 px-2 rounded shadow-[inset_3px_3px_3px_rgba(0,0,0,0.80),inset_-3px_-3px_3px_white] ">
            <input
              value="medium"
              name="priority"
              onChange={handleInput}
              id="medium"
              className="accent-green-500"
              type="radio"
            />
            <label htmlFor="medium" className="font-bold">
              MEDIUM
            </label>
          </span>
          <span className=" flex gap-1 p-1 px-2 rounded shadow-[inset_3px_3px_3px_rgba(0,0,0,0.80),inset_-3px_-3px_3px_white] ">
            <input
              value="low"
              name="priority"
              onChange={handleInput}
              id="low"
              className="accent-yellow-500"
              type="radio"
            />
            <label htmlFor="low" className="font-bold">
              LOW
            </label>
          </span>
        </div>
      </div>

      <div className="self-center flex gap-2 mt-4">
        <button
          onClick={handleSave}
          className=" hover:shadow-[3px_3px_3px_rgba(0,0,0,0.80),-3px_-3px_3px_white] cursor-pointer text-green-500 font-bold p-1 px-2 rounded shadow-[inset_3px_3px_3px_rgba(0,0,0,0.80),inset_-3px_-3px_3px_white] "
        >
          Save Changes
        </button>
        <button onClick={handleCancel} className=" hover:shadow-[3px_3px_3px_rgba(0,0,0,0.80),-3px_-3px_3px_white] cursor-pointer text-red-500 font-bold p-1 px-2 rounded shadow-[inset_3px_3px_3px_rgba(0,0,0,0.80),inset_-3px_-3px_3px_white] ">
          cancel
        </button>
      </div>
    </div>
  </div>
  );
};

export default Form;
