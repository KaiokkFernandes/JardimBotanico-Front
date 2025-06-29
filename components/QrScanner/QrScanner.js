import { useEffect, useRef } from "react";

export default function QrScanner() {
  const qrRef = useRef(null);

  useEffect(() => {
    let html5QrCode;

    const startScanner = async () => {
      if (typeof window === "undefined" || !navigator.mediaDevices) return;

      const { Html5Qrcode } = await import("html5-qrcode");

      html5QrCode = new Html5Qrcode("qr-reader");

      try {
        const cameras = await Html5Qrcode.getCameras();

        if (cameras && cameras.length) {
          await html5QrCode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            (decodedText) => {
              try {
                const url = new URL(decodedText);
                window.location.href = url.href;
              } catch {
                alert("QR inválido: " + decodedText);
              }
            },
            (errorMessage) => {
              console.warn("Falha ao ler QR:", errorMessage);
            }
          );
        } else {
          alert("Nenhuma câmera encontrada.");
        }
      } catch (err) {
        console.error("Erro ao iniciar câmera:", err);
        alert("Erro ao iniciar a câmera: " + err.message);
      }
    };

    if (qrRef.current) {
      startScanner();
    }

    return () => {
      if (html5QrCode) {
        html5QrCode.stop().then(() => html5QrCode.clear());
      }
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black text-white">
      <div
        ref={qrRef}
        id="qr-reader"
        className="absolute inset-0 z-10"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="w-full h-full relative bg-black bg-opacity-50">
          <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-green-400 overflow-hidden">
            <div className="scanner-line absolute left-0 w-full h-[3px]" />
          </div>
        </div>
      </div>

      <div className="absolute top-6 left-0 right-0 text-center z-30">
        <h1 className="text-white text-xl font-medium drop-shadow">
          Escaneie o QR Code de alguma espécie do jardim
        </h1>
      </div>

      <style jsx>{`
        .scanner-line {
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
            top: 0%;
            opacity: 1;
          }
          50% {
            top: 100%;
            opacity: 0.6;
          }
          100% {
            top: 0%;
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
