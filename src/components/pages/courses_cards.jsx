
import { useEffect, useState } from "react";
import { supabase } from '../../supabaseClient'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from "react-router-dom";


export default function CourseCards() {
  
  const [myCourses, setMyCourses] = useState([]);
  const nav = useNavigate();
  const UnsplashImages = [
    'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/fotos/mujer-colocando-notas-adhesivas-en-la-pared-Oalh2MojUuk',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  

  const setId = (courseId) => {
    localStorage.setItem('courseId', courseId)
    nav("/lessons");
};

 useEffect(() => {
    getStudentCourses();
  }, []);

    
  async function getStudentCourses() {        
        try{
        const { data: { user } } = await supabase.auth.getUser()     
        const {data: myCourses} = await supabase.from('courses')
        .select('* , dasboard!inner(student_id)')
        .eq('dasboard.student_id', user.id); 
        setMyCourses(myCourses);
      } catch (error) {
        console.log('error', error);
      }};  
       
  async function dropCourse(courseId) {        
    const confirmation = window.confirm("Are you sure you want to delete this course?");

    if (confirmation) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: error } = await supabase.from('dasboard')
          .delete().match({ student_id: user.id, course_id: courseId });
        getStudentCourses();
        if (error) {
          console.log(error);
        }
      } catch (error) {
        console.log('error', error);
      }
    }}; 

  return (
    <div>
      <div className="text-div">
      You are enrolled in:
      </div>
    <div className="card-container">
    {myCourses.map((course, index) => (

    <Card sx={{ Width: 340 , minWidth: 320, m: 3 }} key={course.id}>
      <CardActionArea onClick={() => setId(course.id)}>
        <CardMedia
          component="img"
          height="140"
          image={UnsplashImages[index]}
          alt={course.name}
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" key={course.name}>
          {course.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" key={course.description}>
          {course.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" key={course.hours}>
          {course.hours} hours
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="error" onClick={() => dropCourse(course.id)}>
          Drop
        </Button>        
      </CardActions>
    </Card>
   )) }
    </div>
    </div>
    
);
}
