import React from "react";
import { useDrop } from "react-dnd";
import DraggableCard from "../DraggableCard/DraggableCard";
import { ItemTypes } from "../Constants";
import TicketCard from "../Card/TicketCard";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Column = ({ tasks: { title, tasks }, columnIndex, handleMoveMyTask }) => {
  const cards = tasks.map((task, index) => {
    const propsToDraggbleCard = { task, columnIndex, index };
    return (
      <DraggableCard
        key={`${columnIndex} ${index} ${task}`}
        {...propsToDraggbleCard}
      />
    );
  });

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ItemTypes.CARD,
    drop: item => {
      const from = item;
      const to = { columnIndex };
      handleMoveMyTask(from, to);
    },
    canDrop: item => item.columnIndex !== columnIndex,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <Stack ref={dropRef} sx={{
      width: 1 / 3,
      ml: '4px',
      mr: '4px',
      background: '#f5f5f5',
      backgroundColor: '#70aae3',
      p: '10px',
      borderRadius: '4px'
    }}>
      <Typography sx={{
        fontWeight: 'bold',
        margin: '5px 0 15px',
        color: 'whitesmoke',
      }}>{title}</Typography>
      <Box>
        {cards}
        {isOver && canDrop ? <TicketCard task={{}} empty /> : ""}
      </Box>
    </Stack>
  );
};

export default Column;
