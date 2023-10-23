 import { useEffect, useState } from "react";
import { supabase } from '../../supabaseClient';
import ThisMaterials from '../student-progress/check-materials';
import { Button } from "@mui/material";

export default function ThisLesson(){
    const getLessonId = localStorage.getItem('lessonId')
    const [thisLesson, setThisLesson] = useState([]);
    const [thisLessonMaterials, setThisLessonMaterials] = useState([]);
  
    useEffect(() => {
        getThisLesson();
        getThisLessonMaterials();           
      }, []);


    async function getThisLesson() {
        const {data:thisLesson} = await supabase.from('lessons').select('*').eq('id',getLessonId);
        setThisLesson(thisLesson);
      }
    
     async function getThisLessonMaterials() {
       const {data:thisLessonMaterials} = await supabase.from('materials').select('*, lessons(id)').eq('lesson_id',getLessonId);
        setThisLessonMaterials(thisLessonMaterials);
        
    }
   
    return(
      <div className="lesson-container" >
        <div className="text-container" > 
        {thisLesson.map((lesson) => (
            <div key={lesson.id}>
            <div className='titulo2' key={lesson.title}>{lesson.title}</div>
            <div className='lesson-body' key={lesson.content}>{lesson.content}</div>
            <p key={lesson.state}>This lesson state is: {lesson.state}</p>
            <p key={lesson.score}>Now your score is: {lesson.score}</p>
            </div>
            ))}

        <Button>Take Quiz</Button>    
        </div>
      
        <ThisMaterials />
         
      </div>     
    );}