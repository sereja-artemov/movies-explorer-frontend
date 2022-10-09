import React, { useState } from "react";
import Popup from "../Popup/Popup";

const InfoTooltip = ({ isOpen, onClose, text }) => {
  return (
    <Popup
      id="info-tooltip"
      containerSelector="info-tooltip__container"
      isOpen={isOpen}
      onClose={onClose}
      content={
        <>
          <p className="info-tooltip__text">{text}</p>
        </>
      }
    />
  );
};

export default InfoTooltip;
