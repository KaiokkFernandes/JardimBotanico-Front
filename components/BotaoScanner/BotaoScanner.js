import Link from "next/link";
import { MdQrCodeScanner } from "react-icons/md";

export default function BotaoScanner() {
  return (
    <Link href="/scanner">
      <div className="fixed bottom-6 right-6 z-50">
        <button
          aria-label="Escanear QR Code"
          className="bg-[#212922] hover:bg-[#3E6259] text-white font-semibold py-3 px-5 rounded-full shadow-lg flex items-center space-x-2 transition duration-300"
        >
          <MdQrCodeScanner className="w-6 h-6" />
          <span>Escanear</span>
        </button>
      </div>
    </Link>
  );
}
