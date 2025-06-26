import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DetalhesEspecie = () => {
  const router = useRouter();
  const { nome } = router.query;
  const [especie, setEspecie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/Data/data.json');
      const data = await response.json();
      const todas = [...(data.flora || []), ...(data.fauna || [])];

      const item = todas.find(
        (e) => normalizarNome(e.nome_comum) === nome
      );
      setEspecie(item);
    };

    if (nome) fetchData();
  }, [nome]);

  const normalizarNome = (str) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove acentos
      .replace(/[^\w\s-]/g, '') // remove pontuações
      .replace(/\s+/g, '-') // espaços viram hífens

  if (!especie) return <p style={{ padding: '2rem' }}>Carregando...</p>;

  return (
    <div style={{ backgroundColor: '#B1DABB', padding: '2rem', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <img
          src={especie.imagem.replace('../Imagens', '/Imagens').replace('../Feed', '/Feed')}
          alt={especie.nome_comum}
          style={{
            width: '100%',
            maxWidth: '700px',
            borderRadius: '24px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            alignSelf: 'center',
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{especie.nome_comum}</h1>
          <h2 style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>{especie.nome_cientifico}</h2>
        </div>
        <div style={{ borderTop: '1px solid #004d00' }}></div>
        <div style={{ lineHeight: '1.8', textAlign: 'justify', background: '#f9f9f9', padding: '1rem', borderRadius: '16px' }}>
          <p><strong>Categoria:</strong> {especie.categoria}</p>
          <p><strong>Habitat:</strong> {especie.habitat}</p>
          <p>{especie.descricao}</p>
          <h3>Curiosidades:</h3>
          <ul>
            {especie.curiosidades.map((curiosidade, idx) => (
              <li key={idx}>{curiosidade}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetalhesEspecie;
