import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrCodeGenerator = ({ value }) => {
  return (
    <div style={{ margin: "1rem 0" }}>
      <QRCodeCanvas value={value} size={256} />
    </div>
  );
};

export default QrCodeGenerator;
