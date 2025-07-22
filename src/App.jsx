import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from "react";
import NoteCard from "./components/noteCard";
import API from "./api";
import Auth from "./pages/auth"

import './components/noteCard.css';
function App() {
  
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [notes, setNotes] = useState([]);
 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [showForm, setShowForm] = useState(false);
 const [searchQuery, SetSearchQuery] = useState("");
 const [counter, setCounter] = useState(3);
 const [showAuth, setShowAuth] = useState(false);

 useEffect(()=> {
  const checkLogin = async () =>{
    try {
      const res = await API.get('/notes');
      setIsLoggedIn(true);
      setNotes(res.data);
     } catch (error) {
      setIsLoggedIn(false);
    };
  };
  checkLogin();
 }, []);


 useEffect(()=>{
     if (!isLoggedIn) {
      const timer = setInterval(()=>{
        setCounter((prev)=> prev-1);
      }, 1000);

      const timeout = setTimeout(()=>{
         setShowAuth(true);
      }, 3000);
      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
     }
 }, [isLoggedIn]);


 async function fetchNotes() {
  try {
    const res = await API.get('/notes');
    setNotes(res.data)

  } catch (error) {
    alert('failed to load notes');
  } 
 };


 async function handleAddNote() {
    try {
      await API.post('/notes', {title, content});
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
       alert("failed to add note");
    }  
 };


 const handleLogout = async () => {
    try{
      await API.post('/auth/logout');
      setIsLoggedIn(false);
      setNotes([]);
    }
    catch{
      alert('logout failed');
    }
 };


 const handleDelete = async(id) => {
   try{
     await API.delete(`/${id}`);
     fetchNotes();
   }
   catch{
    alert('failed to delete the note');
   }
 };


 const handleUpdate = async(id, editedTitle, editedText) => {
  try{
    await API.put(`/${id}`, {
      title: editedTitle,
      text: editedText
    });
    fetchNotes();
  }
  catch{
    console.log("updation of note failed");
  }
 };


 const filteredNotes = searchQuery.trim() === ""?
  notes: notes.filter((note)=> {
    return note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  })


 if(!isLoggedIn && !showAuth){
  return(
    <>
    <h2>You are not loggedIn</h2>
    <p>you will be redirected to the login page in {counter} second{counter !== 1 ? "s":""}...</p>
    </>
  )
 }

 if(!isLoggedIn && showAuth){
  return <Auth onLogin={()=> setIsLoggedIn(true)}/>;
 }


 return(
    <>
  <div className="main">

   <div className='logout'>
    <button onClick={handleLogout}>Logout</button>
   </div>

   <div className="mainChild1">
   <button className='addBtn' onClick={() => setShowForm(!showForm)}>
   <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} /></button>
    {showForm ? 
    <form onSubmit={handleAddNote}>
     <input type="text" 
      name="title" 
      placeholder="Title" 
     />
     <input type="text" 
      name="text" 
      placeholder="text" 
     />
     <button type="submit">Add Note</button>
    </form>: <p>"click on the + to add a new note"</p>} 
   </div>
   <div className="mainChild2">
    <input className="searchBar" type="text" placeholder="Search" 
    value={searchQuery} 
    onChange={(e)=> SetSearchQuery(e.target.value)}/>  
    
    <div className="divyansh">
    <h1 className="">divyansh Notes App</h1>
      </div>

  
   <NoteCard notes={filteredNotes} DeleteCard={handleDelete} updateNote={handleUpdate}/>
   </div> 
    </div>
    
   </>
  );


























































  // const [showForm, setShowForm] = useState(false)
 
  // const [notes, SetNotes] = useState(()=>{
  //   const Note = localStorage.getItem("Note")
  //   return(
  //   Note? JSON.parse(Note):[] )
  // });

  // const [searchQuery, SetSearchQuery] = useState("")

  
  // function DeleteCard(item_id){
  //   console.log("it deletes the card")
  //   const filtered_notes = notes.filter((item)=>item_id !== item.id)
  //   SetNotes(filtered_notes)
  // }

  // function SaveNote(e)
  // {
  //   e.preventDefault();
  //   console.log(e.target["title"].value);

  //   const titleInput = e.target["title"].value;
  //   const textInput = e.target["text"].value;
  //   const newNote = {title: titleInput, 
  //                    text: textInput, 
  //                    id: Date.now(),
  //                    date: new Date().toLocaleString()}
  //   SetNotes([newNote, ...notes])
  //   e.target.reset();

  // }


  // function updateNote(id, editTitle, editText){
  //   const updated = notes.map((note)=>note.id=== id? ({...note, title:editTitle, text:editText}):(note))
  //   SetNotes(updated)
  // }
 

  // useEffect(() => {
  //   localStorage.setItem("Note", JSON.stringify(notes))}, [notes]);

  // const filteredNotes = searchQuery.trim() === ""?
  // notes: notes.filter((note)=> {
  //   return note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   note.text.toLowerCase().includes(searchQuery.toLowerCase())
  // })  

  

};

export default App;
