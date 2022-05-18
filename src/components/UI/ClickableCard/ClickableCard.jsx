import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import cl from './ClickableCard.module.css'

const ClickableCard = ({children, title, summary, onClickAction}) => {

  return (
      <Card classes={{ root: cl.card }} onClick={onClickAction}>
        {children !== undefined
          ? children
          :<CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography classes={{ root: cl.summary }} variant="body2" color="text.secondary">
              {summary}
            </Typography>
          </CardContent>
        }
      </Card>
)
}

export default ClickableCard;
