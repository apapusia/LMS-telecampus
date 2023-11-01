import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';



function MyTasks() {
  const [profileData, setProfileData] = useState(null);
  const [newTask, setNewTask] = useState("");


  const fetchData = async () => {
        try {
          const response = await axios.get('https://todo-db-4bcaf6399c04.herokuapp.com/todo');
          const res = response.data;
          setProfileData(res);
        } catch (error) {
          console.error(error);
        }
      };
    
    useEffect(() => {
        fetchData();
    }, []);

  const handleAddTask = async () => {
    try {
      const response = await axios.post('https://todo-db-4bcaf6399c04.herokuapp.com/add', {
        todoitem: newTask,
      });
      
      fetchData();
      setNewTask('');
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleCompleteTask = async (id) => {
    try {
      const response = await axios.put(`https://todo-db-4bcaf6399c04.herokuapp.com/complete/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDeleteCompletedTasks = async (id) => {
    try {
      await axios.delete(`https://todo-db-4bcaf6399c04.herokuapp.com/delete/${id}`);
      
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="tasks-container">
        <div className="tasks-header">
        <p>Netlify does not provide the option to deploy the backend of this component. Go to: "apapusia.pythonanywhere.com" </p>
				  <p className="text-header"><DoneIcon/>My Todo-s</p>
          <div className="input-area">
            <input
                    type="text"
                    id='task-input'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Insert a new task"
            />
            <button className='btn-enroll' onClick={handleAddTask}>Add</button>
			    </div>
        </div>
        <div className='task-items-area'>
        {/* Muestra los datos del objeto */}
        
        {profileData && (
  <div >
    <p className='text-body'>Incomplete Tasks:</p>
    <ol>
        {profileData.incomplete.map((task) => (
              <li   key={task.id}>
                <div className="item-line">
                <p>{task.text}</p>
                <DoneIcon style={{ color: 'green' }} onClick={() => handleCompleteTask(task.id)}/>
              </div>
              </li>
        ))}
    </ol>

    <p className='text-body'>Complete Tasks:</p>
    <ol>
         {profileData.complete.map((task) => (
              <li key={task.id}>
                <div className="item-line">
                <p>{task.text}</p>
                <DeleteIcon style={{ color: 'red' }} onClick={() => handleDeleteCompletedTasks(task.id)}/>
                </div>
              </li>
            ))}
    </ol>
  </div>
)}
      </div>
    </div>
  );
}

export default MyTasks;
