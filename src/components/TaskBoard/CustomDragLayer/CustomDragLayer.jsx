import React from "react";
import { useDragLayer } from "react-dnd";
import { ItemTypes } from "../Constants";
import TicketCard from "../Card/TicketCard";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "calc(100%/3 - 70px)",
  zIndex: 100,
  left: 0,
  top: 0
};

function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

const CustomDragLayer = () => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));
  function renderItem() {
    switch (itemType) {
      case ItemTypes.CARD:
        return <TicketCard task={item.task} drag/>;
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};
export default CustomDragLayer;
