import { useEffect, useState } from "react";
import { supabase } from '../../supabaseClient'
import { DataGrid} from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";



function Lessons() {

  const getId = localStorage.getItem('courseId')
  const [lessons, setLessons] = useState([]);
  const [thisCourse, setThisCourseName] = useState([]); 
  const [thisTeacher, setGetTeacher] = useState([]);
  const nav = useNavigate();

  const setLessonId = (lessonId) => {
    localStorage.setItem('lessonId', lessonId)
    nav("/this-lesson");
};



  const columns = [    
    { field: 'title', headerName: 'Lesson', width: 500 },
    { field: 'state', headerName: 'State', width: 50 },
    { field: 'score', headerName: 'Score', width: 50 },
  ];
  

  useEffect(() => {
    getTeacher();
    getCourse();
    getLessons();
  }, []);

  async function getCourse() {
    const {data:thisCourse} = await supabase.from('courses').select('id, name, hours').eq('id',getId);
    setThisCourseName(thisCourse[0].name);
  }

  async function getTeacher() {
    const {data:thisTeacher} = await supabase.from('teachers').select('name, courses!inner(*)').eq('courses.id',getId);
    setGetTeacher(thisTeacher[0].name);
   
  }


  async function getLessons() {
    try{
      const {data: lessons} = await supabase.from('lessons')
      .select('id, title, state, score, courses(id)')
      .eq('course_id', getId);
        setLessons(lessons);
      } catch (error) {
        console.log('error', error);
      }
  }  
 

          return(
            <div className='lessons-table'>
              <div className='this-course-info'>
                <h2>Course: {thisCourse}</h2>
                <h3>Teacher: {thisTeacher}</h3>
              </div>
              <div  style={{ height: 500, width: '100%' }}>
                <DataGrid
                  /* onRowClick={getThisLesson} */
                  columns={columns}
                  rows={lessons}
                  onRowClick={itm => setLessonId(itm.id)}
                />
              </div> 
            </div> 
          );
        };

export default Lessons;
