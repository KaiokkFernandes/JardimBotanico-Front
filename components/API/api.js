const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3333";

// cata todos os items do acervo independentemente de specimen_type
export async function fetchEspecimes() {
  const res = await fetch(`${BASE_URL}/especimes`);
  if (!res.ok) throw new Error("Erro ao buscar espécimes");
  return res.json();
}
//cata os items do acervo de especimes que o type corresponde
export async function fetchEspecimesBySpecimenType(specimen_type) {
  const res = await fetch(`${BASE_URL}/especimes/tipo/${specimen_type}`);
  if (!res.ok) throw new Error("Erro ao buscar espécime pelo tipo");
  return res.json();
}
// cata um item do acervo pelo id
export async function fetchEspecimeById(id) {
  const res = await fetch(`${BASE_URL}/especimes/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar espécime");
  return res.json();
} 

// cria um item no acervo
export async function createEspecime(data) {
  console.log(data);
  const res = await fetch(`${BASE_URL}/especimes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar espécime");
  return res.json();
}

// atualiza um item do acervo
export async function updateEspecime(id, data) {
  const res = await fetch(`${BASE_URL}/especimes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar espécime");
  return res.json();
}

// deleta um item do acervo
export async function deleteEspecime(id) {
  const res = await fetch(`${BASE_URL}/especimes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir espécime");
  return;
}

export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Erro ao buscar usuários");
  return res.json();
}

export async function fetchUserById(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar usuário");
  return res.json();
}

export async function createUser(data) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar usuário");
  return res.json();
}

export async function updateUser(id, data) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar usuário");
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir usuário");
  return res.json();
}

/*

VISITAS

*/
// cata todas os formularios de avaliacao de visita enviados
export async function fetchVisitas() {
  const res = await fetch(`${BASE_URL}/visitas`);
  if (!res.ok) throw new Error("Erro ao buscar visitas");
  return res.json();
}

// cata um formulario de visita por id
export async function fetchVisitaById(id) {
  const res = await fetch(`${BASE_URL}/visitas/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar visita com esse id");
  return res.json();
}
// cria um formulario de visita
export async function createVisita(data) {
  console.log("oiie", data);
  const res = await fetch(`${BASE_URL}/visitas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar o formulário de visita");
  return res.json();
}

// atualiza um formulario de visita
export async function updateVista(id, data) {
  const res = await fetch(`${BASE_URL}/visitas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar formulario");
  return res.json();
}
// deleta formulario de visita
export async function deleteVisita(id) {
  const res = await fetch(`${BASE_URL}/visitas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir formulario de visita");
  return res.json();
}


export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao fazer login");
  }
  return res.json();
}

// ESTATISTICAS
export async function getEstatisticaGenero() {
  const res = await fetch(`${BASE_URL}/estatisticas/genero`);
  if (!res.ok) throw new Error("Erro ao buscar estatísticas de gênero");
  return res.json();
}

export async function getEstatisticaCursos() {
  const res = await fetch(`${BASE_URL}/estatisticas/curso`);
  if (!res.ok) throw new Error("Erro ao buscar estatísticas de cursos");
  return res.json();
}

export async function getEstatisticaEstados() {
  const res = await fetch(`${BASE_URL}/estatisticas/estado`);
  if (!res.ok) throw new Error("Erro ao buscar estatísticas de estados");
  return res.json();
}

export async function getEstatisticaDias() {
  const res = await fetch(`${BASE_URL}/estatisticas/data`);
  if (!res.ok) throw new Error("Erro ao buscar estatísticas por dia");
  return res.json();
}

export async function getTotalVisitas(ano) {
  try {
    const url = ano
      ? `${BASE_URL}/estatisticas/total-visitas?ano=${ano}`
      : `${BASE_URL}/estatisticas/total-visitas`;

    console.log("URL para total de visitas:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao buscar total de visitas");
    }

    const data = await response.json();
    return data.total; // ou return data, se quiser todo o objeto
  } catch (error) {
    console.error(error);
    throw error;
  }
}

