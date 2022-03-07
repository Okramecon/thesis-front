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

    const onClickAction = props.isAdditionalCard ?
    () => props.onClick() :
        () => navigate(`/departments/${props.id}`);

    return (
        <Card sx={{ width: 250, height: 150, display: "flex", boxShadow: "0px 4px 6px 2px  rgba(0,0,0,0.2)" }} onClick={onClickAction} className='cursor_ptr'>
           
            {props.isAdditionalCard
                ? <div style={props.style}></div>
                :<CardContent>

                    <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.summary}
                    </Typography>
                </CardContent>
            }
            
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
};

export default DepartmentCard;