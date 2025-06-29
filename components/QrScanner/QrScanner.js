import { useEffect, useRef } from "react";

export default function QrScanner() {
  const qrRef = useRef(null);

  useEffect(() => {
    let html5QrCode;

    (async () => {
      const { Html5Qrcode } = await import("html5-qrcode");
      html5QrCode = new Html5Qrcode("qr-reader");

      try {
        const cameras = await Html5Qrcode.getCameras();
        if (!cameras.length) throw new Error("Nenhuma câmera encontrada");

        // use the first available camera
        const cameraId = cameras[0].id;
        await html5QrCode.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            try {
              const url = new URL(decodedText);
              window.location.href = url.href;
            } catch {
              alert("QR inválido");
            }
          },
          (errorMessage) => {
            console.warn("Scan error:", errorMessage);
          }
        );
      } catch (err) {
        alert("Erro ao acessar câmera: " + err.message);
      }
    })();

    return () => {
      if (html5QrCode) {
        html5QrCode
          .stop()
          .then(() => html5QrCode.clear())
          .catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div id="qr-reader" className="absolute inset-0" ref={qrRef} />
      <div className="absolute top-6 left-0 right-0 text-center z-20">
        <h1 className="text-white text-xl font-medium drop-shadow">
          Escaneie o QR Code de alguma espécie do jardim
        </h1>
      </div>
      <style jsx global>{`
        .html5-qrcode .qrbox {
          border: 2px solid #79A06E !important;
          border-radius: 8px !important;
          overflow: hidden !important;
          position: relative !important;
        }

        .html5-qrcode .qrbox::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            to bottom,
            rgb(121, 160, 110),
            rgba(85, 135, 103, 0.73),
            rgb(0, 125, 56)
          );
          box-shadow: 0 0 10px 4px rgba(5, 101, 32, 0.6);
          animation: scanAnim 2.5s ease-in-out infinite;
        }

        @keyframes scanAnim {
          0% {
            transform: translateY(0%);
            opacity: 1;
          }
          50% {
            transform: translateY(100%);
            opacity: 0.6;
          }
          100% {
            transform: translateY(0%);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
