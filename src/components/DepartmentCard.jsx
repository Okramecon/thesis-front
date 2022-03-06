import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const DepartmentCard = (props) => {

    const navigate = useNavigate();

    const onClickAction = props.onClick === undefined ?
        () => navigate(`/departments/${props.id}`) :
        () => props.onClick();

    return (
        <Card sx={{ maxWidth: 345 }} onClick={onClickAction} className='cursor_ptr'>
            <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                {props.title}
                </Typography>
                <div style={props.style}></div>
                <Typography variant="body2" color="text.secondary">
                {props.summary}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
};

export default DepartmentCard;