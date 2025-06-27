import Link from "next/link";

export default function BotaoScanner() {
  return (
    <Link href="/scanner">
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-[#1E4026] hover:bg-[#245a3] text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300"
        >
          Escanear QR Code 📷
        </button>
      </div>
    </Link>
  );
}
