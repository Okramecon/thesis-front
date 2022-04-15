import React, {useEffect, useRef, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) =>
    createStyles({
        wrapForm : {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: `10px auto`
        },
        wrapText  : {
            height: 5,
            width: "100%"
        },
        button: {
            //margin: theme.spacing(1),
            height: "26px",
            marginLeft: "5px"
        },
    })
);


export const TextInput = (props) => {

    const [comment, setComment] = useState({userId:props.userId, ticketId:props.ticketId, message:''});
    const valueRef = useRef('')

    const send = async () => {
        if (isEmptyOrSpaces(comment.message))
            return;
        var response = await props.sendComment(comment);

            setComment({...comment, message: ""})
        props.updateComments(!props.updateTrigger);
    }

    function isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }

    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm}  noValidate autoComplete="off">
                <TextField
                    id="outlined-basic"
                    label=""
                    className={classes.wrapText}
                    InputProps={{ classes: { input: classes.wrapText } }}
                    size='small'
                    inputRef={valueRef}
                    variant="outlined"
                    value={comment.message}
                    onChange={(e)=>setComment({...comment, message: e.target.value})}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            send();
                            ev.preventDefault();
                        }
                    }}
                    //margin="normal"
                />
                <Button variant="contained" color="primary" className={classes.button} onClick={async () => await send()}>
                    <SendIcon />
                </Button>
            </form>
        </>
    )
}