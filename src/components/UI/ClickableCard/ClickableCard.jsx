import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import cl from './ClickableCard.module.css'

const ClickableCard = ({children, title, summary, onClickAction}) => {

  return (
      <Card
        sx={{
            width: "250px",
            height: 150,
            display: "flex",
            margin: 0,
            boxShadow: "0px 4px 6px 2px  rgba(0,0,0,0.2)"}}
        onClick={onClickAction}
        className={cl.cursor_ptr}>

        {children !== undefined
          ? children
          :<CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {summary}
            </Typography>
          </CardContent>
        }
      </Card>
)
}

export default ClickableCard;
