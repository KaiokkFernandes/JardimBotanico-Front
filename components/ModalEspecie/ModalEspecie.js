import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { normalizarNome } from "../Utils/normalizarNome";
import { motion } from "framer-motion";

export default function ModalEspecie({ nome, onClose }) {
  const router = useRouter();
  const [especie, setEspecie] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    fetch("/Data/data.json")
      .then((res) => res.json())
      .then((json) => {
        const all = [...(json.flora || []), ...(json.fauna || [])];
        const found = all.find(
          (e) => normalizarNome(e.nome_comum) === nome
        );
        setEspecie(found);
      })
      .catch((err) => console.error("Erro ao buscar espécie:", err));
  }, [nome]);

  if (!especie) return null;

  const handleOverlayClick = () => {
    if (isNavigating) return;
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
    setIsNavigating(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#212922]/40 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleOverlayClick}
    >
      <motion.div
        className="relative bg-white rounded-xl p-6 shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={ isNavigating 
          ? { scale: 1.1, opacity: 0 }  
          : { scale: 1, opacity: 1 }    
        }
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          if (isNavigating) {
            router.push(`/especie/${nome}`);
          }
        }}
        onClick={handleContentClick}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Fechar"
          className="absolute top-4 right-4 text-2xl font-bold text-[#294936] hover:text-[#3E6259]"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2 text-[#212922]">
          {especie.nome_comum}
        </h2>
        <p className="italic text-gray-600 mb-4">
          {especie.nome_cientifico}
        </p>
        <img
          src={especie.imagem}
          alt={especie.nome_comum}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <p className="text-gray-700 whitespace-pre-line mb-4">
          {especie.texto}
        </p>
        <p className="text-sm text-center text-[#3E6259] font-medium">
          (Toque dentro deste card para ver a página completa)
        </p>
      </motion.div>
    </motion.div>
  );
}
