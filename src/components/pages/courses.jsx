
import { useEffect, useState } from "react";
import { supabase } from '../../supabaseClient'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Courses() {
    
  const [courses, setCourses] = useState([]);
  const nav = useNavigate();
  const UnsplashImages = [
    'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/fotos/mujer-colocando-notas-adhesivas-en-la-pared-Oalh2MojUuk',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&q=80&w=2076&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1564609116494-380be7238d7d?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  
  useEffect(() => {
    getCourses();
  }, []);
  

  async function getCourses() {
    const {data} = await supabase.from('courses').select('*');
      setCourses(data);
  }

return (
  <div className="grid-card-container">

  {courses.map((course, index) => (

  <Card sx={{ Width: 340 , minWidth: 320, m: 3 }} key={course.id}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="150"
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
    </CardActions>
  </Card>
 )) }
 </div>
);
}

export default Courses;


  