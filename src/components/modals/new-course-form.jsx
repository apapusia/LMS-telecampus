import { useState } from "react";
import { supabase } from '../../supabaseClient'


export default function NewCourse() {

  
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
      new_course({name: name, hours: hours, description:description})
      e.target.reset();
      event.preventDefault();

  };

  const handleName = (event) => {
      event.preventDefault();
      setName(event.target.value)
  };

  const handleHours = (event) => {
      event.preventDefault();
      setHours(event.target.value)
  }
  const handleDescription = (event) => {
      event.preventDefault();
      setDescription(event.target.value)
  }

  const new_course = async () => {
      const {data, error} = 
      await supabase
          .from('courses')
          .insert([
              {name: name, hours: hours, description: description}
          ])
  };

  return (
      <div>
        <h3>Add a new course</h3>
        <form onSubmit={handleSubmit}>                  
                  <input onChange={handleName} type="text" value={name} placeholder="Name" autoComplete="false" /><br></br>
                  <input onChange={handleHours} type="integer" value={hours} placeholder="hours" autoComplete="false" /><br></br>
                  <input onChange={handleDescription} type="text" value={description} placeholder="description" autoComplete="false" /><br />
                  <button className="btn-add">Add</button>
        </form>
      </div>
  )
}