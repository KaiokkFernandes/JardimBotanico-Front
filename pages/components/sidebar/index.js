// components/Sidebar/index.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ddd;

  a {
    text-decoration: none;
    color: #333;

    &:hover {
      color: #007bff;
    }
  }
`;

const Sidebar = () => {
  const [exposicao, setExposicao] = useState([]);

  useEffect(() => {
    fetch("/Data/data.json")
      .then((response) => response.json())
      .then((data) => setExposicao(data.exposicao))
      .catch((error) => console.error(error));
  }, []);

  return (
    <SidebarList>
      {exposicao.map((item, index) => (
        <SidebarItem key={index}>
          <Link href={`/planta/${index}`} legacyBehavior>
            <a>{item.nome_comum}</a>
          </Link>
        </SidebarItem>
      ))}
    </SidebarList>
  );
};

export default Sidebar;
