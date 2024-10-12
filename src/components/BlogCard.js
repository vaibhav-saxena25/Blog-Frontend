import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';



const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
export default function BlogCard({title,description,image,username,time,id,isUser}) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const handleDelete= async()=>{
    try{
      const {data} = await axios.delete(`/api/v1/blog/delete-blog/${id}`)
      if(data?.success){
        alert('Blog Deleted');
        window.location.reload();
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <Card sx={{ width: '40%' ,margin:'auto',mt:2,padding:2,boxShadow:'5px 5px 10px #CCC',':hover:':{
        boxShadow:'10px 10px 20px #ccc'
    } }}>
      {isUser && (
        <Box display = {'flex'}>
          <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}>
            <ModeEditIcon color = 'info'/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color = 'error'/>
          </IconButton>

        </Box>

      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
     
        title={username}
        subheader={formatTime(time)}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           Title:{title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           Description:{description}
        </Typography>
      </CardContent>
      
      
    </Card>
  );
}
