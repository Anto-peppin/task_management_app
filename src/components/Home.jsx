import { useState,useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const Home = ({ editId,viewId}) => {
  const navigate = useNavigate();
  const[search,setSearch] = useState('')

  let [tableData, setDableData] = useState(
    JSON.parse(localStorage.getItem("task"))
  );

const [filteredData,setFilteredData] = useState([])
const [pagedData, setPagedData] = useState([]);

useEffect(() => {
  let val  = tableData.filter((val) =>
    val.title.toLowerCase().includes(search.toLowerCase())
  );
  setFilteredData(val);
}, [search, tableData]);
// tableData.filter(val=> val.title.toLowerCase().includes(search.toLowerCase() ))


  let sty = {
    border: "1px solid gray",
    padding: "8px",
  };

  const edit = (val) => {
    editId(val);
    navigate(`/form`);
  };

  const blur = (id) => {
    let data = tableData.map((val) =>
      val.id === id ? { ...val, view: !val.view } : val
    );
    setDableData(data);
    localStorage.setItem("task", JSON.stringify(data));
  };

  const handleSarch = (e)=>{
    setSearch(e.target.value)
  }

  const handleDelete = (id) => {
    let deletedval = tableData.filter((val) => val.id != id);
    let mapVal = deletedval.map((val, ind) => {
      return { ...val, id: ind + 1 };
    });

    setDableData(mapVal);
    localStorage.setItem("task", JSON.stringify(mapVal));
  };
 const handleView = (id)=>{
  navigate('/view')
  viewId(id)

  }

  return (
    <div>
      <div className=" pl-1  flex  border-2 rounded-xl w-[70%] mx-auto my-6 md:w-[60%] ">
        <input value={search} onChange={handleSarch} className="border-0 outline-0 p-1 grow min-w-0" type="text" />
        <label className="bg-black text-white flex items-center rounded-[0_10px_10px_0] px-1.5 ">
         
          Search
        </label>
      </div>
      <h2 className="text-center font-bold text-xl mb-2">Tasks</h2>

      <table
        style={{ whiteSpace: "nowrap" }}
        className="border-gray-200 w-[99%]  md:w-[85%] mx-auto mt-4 "
      >
        <thead>
          <tr className="text-[10px] md:text-[14px] " style={sty}>
            <th style={sty}>Task Name</th>
            <th style={sty}>Due Date</th>
            <th style={sty}>Priority</th>
            <th style={sty}>Action</th>
            <th style={sty}>View Page</th>
          </tr>
        </thead>

        {
          filteredData.length>=1 ? 
          <tbody className="relative">

         {
          pagedData.map((val, ind) => (
            <tr
              className={`text-[10px] md:text-[14px] ${
                ind % 2 == 0 ? "bg-gray-300" : "bg-white"
              } ${val.view ? "blur-[1.5px]" : ""} `}
              style={sty}
              key={ind}
            >
              <td style={sty}>
                <input
                  onChange={() => blur(val.id)}
                  className="mr-1 relative top-0.5"
                  type="checkbox"
                />
                {val.title.length == 0
                  ? "---"
                  : val.title.length > 11
                  ? `${val.title.slice(0, 11)}...`
                  : val.title}
              </td>
              <td className="text-center " style={sty}>
                {val.date.length == 0 ? "---" : val.date}
              </td>
              <td
                style={sty}
                className={`${
                  val.priority == "hard"
                    ? "text-red-500"
                    : val.priority == "medium"
                    ? "text-green-500"
                    : val.priority == "low"
                    ? "text-yellow-500"
                    : "text-black"
                } font-bold text-center `}
              >
                {val.priority ? val.priority : "---"}
              </td>
              <td className="text-center " style={sty}>
                <FaEdit
                  onClick={() => edit(val.id)}
                  className="inline-block size-6 rounded text-white bg-blue-500 p-1 mr-2 md:mr-4 cursor-pointer"
                />{" "}
                <MdDelete
                  onClick={() => handleDelete(val.id)}
                  className="inline-block mr-2 border size-6 rounded text-white bg-red-500 p-1 cursor-pointer"
                />
              </td>
              <td
                className="bg-blue-700 text-center cursor-pointer font-bold "
                style={sty}
              >
                <button onClick={()=>handleView(val.id)} className="text-white cursor-pointer w-full h-full ">view </button>
              </td>
            </tr>
          ))
         


         }

        </tbody> : 
        <div className=" absolute flex justify-center p-4  w-[99%] md:w-[85%] mx-auto  ">
          <img src="./nodata.webp" alt=""/>  
        </div>
        }

      </table>
      {
        filteredData.length>=1 && <Pagination data={filteredData} set={setPagedData} />
      }

    </div>
  );
};

export default Home;
