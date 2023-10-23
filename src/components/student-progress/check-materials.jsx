 import { useEffect, useState } from "react";
import { supabase } from '../../supabaseClient';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import  {Checkbox, CardActionArea, CardActions } from '@mui/material';


function ThisMaterials() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getLessonId = localStorage.getItem('lessonId') 

  // Cargar datos iniciales desde la base de datos
  useEffect(() => {
    
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('materials')
        .select('*').eq('lesson_id',getLessonId);;

      if (error) {
        console.error('Error al cargar:', error);
      } else {
        setData(data);        
      }
      setLoading(false);
    };
    fetchData();
  }, []);
 
  const handleChange = async (id) => {
    const updatedData = [...data];
    const index = updatedData.findIndex((item) => item.id === id);
    updatedData[index].checked = !updatedData[index].checked;
    setData(updatedData);
    console.log(updatedData);

    // Actualizar el valor booleano en la base de datos
    const { error } = await supabase
      .from('materials')
      .upsert(updatedData);

    if (error) {
      console.error('Error al actualizar el valor:', error);
    }
  };

  return (    
    <div className="material-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((item) => (
          <div key={item.id}>
            
            <Card sx={{width:250, minHeight: 200, m: 2 }} key={item.id}>
            <CardActionArea component="a" href={item.link} target="_blank">
              <CardMedia
                component="iframe"
                height="140"
                src={item.link}
                alt="link"
              />
              <CardContent sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 16, pb: 0 }} component="div" key={data.name}>
                {item.name}
                </Typography>
                
                <Checkbox                
                  checked={item.checked}
                  name="checked"
                  onChange={() => handleChange(item.id)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /> <p>Checked</p>
              </CardContent>
            </CardActionArea>
          </Card>
           
          </div>
        ))
      )}
    </div>
  );
}
export default ThisMaterials;
