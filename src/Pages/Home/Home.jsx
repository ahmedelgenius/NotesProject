import axios from 'axios';
import React, { useState ,useEffect} from 'react'

function Home({userData}) {
    let beseUrl = 'https://route-egypt-api.herokuapp.com/';
    let userID = userData._id;
    let token = localStorage.getItem('userToken');
const [allNotes ,setAllNotes] =useState([])
const [note,setNote] =useState({title:'',desc:'',userID,token});
const [NoteID ,setNoteID] =useState('')
const [noteTitle ,setNoteTitle] =useState('')
const [isLoading,setIsLoading]=useState(false);
const [Loading,setLoading]=useState(true);

async function getAllNotes(){
    let {data} = await axios.get(beseUrl+'getUserNotes',{ headers:{token,userID}
    })
    if (data.message === 'success'){
        setLoading(false)
        setAllNotes(data.Notes)

    } 
}
useEffect(()=>{
    getAllNotes();
},[])

function getNote({target}){
setNote({...note,[target.name]:target.value})
console.log(note.title)
}

async function addNote(e){
e.preventDefault()
setIsLoading(true)
let {data} = await axios.post(beseUrl +'addNote' ,note)
if(data.message === 'success')
{
    getAllNotes()
    setIsLoading(false)
}
 
}
function getValues(_id , title){
setNoteID(_id)
setNoteTitle(title)
}

async function deleteNote(){
    setIsLoading(true)
  let {data} =await axios.delete(beseUrl+ "deleteNote",{
      data:{
          NoteID,
          token
      }
    })
    if(data.message === 'deleted'){
        getAllNotes()
        setIsLoading(false)

    }
}
async function editNote(){
  let {data} = await axios.put(beseUrl +"updateNote" , 
  {
      title:note.title,
      desc:note.desc,
  },
  {
  headers: {
    NoteID,
      token
  },
  }
  );
  console.log(data.message);


}
  return (
    <>
        <div className="container my-5">
        <div className="col-md-12 m-auto text-end">
            <a className="add p-2 btn"  data-bs-toggle="modal" data-bs-target="#exampleModal">{isLoading?<i className='fa-solid fa-spinner fa-spin'></i>:' AddNew'} </a>
        </div>
    </div>

    {/* <!-- Modal --> */}
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <form onSubmit={addNote}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text"/>
                        <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button data-bs-dismiss='modal' type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

{/* delete modal  */}
<div className="modal fade" id="deleteNote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{noteTitle}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      Do you really want to delete it? 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  data-bs-dismiss='modal' type="button" className="btn btn-danger"  onClick={deleteNote} >{isLoading?<i className='fa-solid fa-spinner fa-spin'></i>:'Delete'}</button>
      </div>
    </div>
  </div>
</div>


{/* <!-- ==========================Notes=============================== --> */}

    <div className="container">
        <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
                
            {Loading?<h1>Loading...</h1>: <h1>All Notes</h1>}
                
               
            </div>
            {allNotes.map((note,index)=>{
            return(
                <div key={index} className="col-md-4 my-4">
                <div className="note p-4">
                    <h3 className="float-start">{note.title} </h3>
                    <a   data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{
                        editNote();
                    }} ><i className="fas fa-edit float-end edit"></i></a>
                    <a  data-bs-toggle="modal" data-bs-target="#deleteNote" onClick={()=>{getValues(note._id , note.title)}} > <i className="fas fa-trash-alt float-end px-3 del"></i></a>
                    <span className="clearfix"></span>
                    <p> {note.desc} </p>
                </div>
            </div>
            )
            })}

        </div> 
    </div>

    </>
  )
}

export default Home;