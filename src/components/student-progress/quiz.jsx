import { useEffect, useState } from "react";
import { supabase } from '../../supabaseClient';


export default function saveQuizResults() {
  
    /* const [id, setId] = useState(''); */
    const [student_id, setStudentId] = useState('');
    const [lesson_id, setLessonId] = useState('');
    const [score, setScore] = useState('');

    const handleSubmit = (event) => {
        new_course({student_id: student_id, lesson_id: lesson_id, score:score})
        e.target.reset();
        event.preventDefault();  
    };
  
    const handleStudentId = (event) => {
        event.preventDefault();
        setStudentId(event.target.value)
    };
  
    const handleLessonId = (event) => {
        event.preventDefault();
        setLessonId(event.target.value)
    }
    const handleScore = (event) => {
        event.preventDefault();
        setScore(event.target.value)
    }
  
    const new_course = async () => {
        const {data, error} = 
        await supabase
            .from('quizzes')
            .insert([
                {student_id: student_id, lesson_id: lesson_id, score: score}
            ]);
            console.log(data);
    };
  
    return (
        <div>
          <h3>Add a new course</h3>
          <form onSubmit={handleSubmit}>                  
                    <input onChange={handleStudentId} type="text" value={student_id} placeholder="studentId" autoComplete="false" /><br></br>
                    <input onChange={handleLessonId} type="integer" value={lesson_id} placeholder="lessonId" autoComplete="false" /><br></br>
                    <input onChange={handleScore} type="text" value={score} placeholder="score" autoComplete="false" /><br />
                    <button className="btn-add">Add</button>
          </form>
        </div>
    )
  }