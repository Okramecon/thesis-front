import { Card, CardContent, Typography } from "@mui/material";
import ClickableCard from "components/UI/ClickableCard/ClickableCard";
import React from "react";
import "./Card.styles.scss";

const TicketCard = ({ task: {title, details}, empty }) => {
  return <div className={`card ` + (empty ? "card--empty" : "")}>
    <div>{title}</div>
    <div>{details}</div>
  </div>;
};

export default TicketCard;