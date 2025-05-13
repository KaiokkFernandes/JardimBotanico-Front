const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// cata todos os items do acervo
export async function fetchEspecimes() {
  const res = await fetch(`${BASE_URL}/especimes`);
  if (!res.ok) throw new Error('Erro ao buscar espécimes');
  return res.json();
}

// cata um item do acervo pelo id
export async function fetchEspecimeById(id) {
  const res = await fetch(`${BASE_URL}/especimes/${id}`);
  if (!res.ok) throw new Error('Erro ao buscar espécime');
  return res.json();
}

// cria um item no acervo
export async function createEspecime(data) {
  const res = await fetch(`${BASE_URL}/especimes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar espécime');
  return res.json();
}

// atualiza um item do acervo
export async function updateEspecime(id, data) {
  const res = await fetch(`${BASE_URL}/especimes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao atualizar espécime');
  return res.json();
}

// deleta um item do acervo
export async function deleteEspecime(id) {
  const res = await fetch(`${BASE_URL}/especimes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao excluir espécime');
  return res.json();
}
