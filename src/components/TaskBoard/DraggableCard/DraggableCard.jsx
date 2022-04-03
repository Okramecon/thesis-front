import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "../Constants";
import TicketCard from "../Card/TicketCard";

const DraggableCard = props => {
  const [, dragRef, preview] = useDrag({
    item: { ...props },
    type: ItemTypes.CARD
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div ref={dragRef}>
      <TicketCard task={props.task} />
    </div>
  );
};

export default DraggableCard;
