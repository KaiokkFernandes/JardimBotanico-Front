# 🌿 Jardim Botânico da UFSM - Frontend

Uma aplicação web moderna e interativa para explorar e gerenciar o acervo digital do Jardim Botânico da Universidade Federal de Santa Maria (UFSM). Este projeto oferece uma experiência rica em informações sobre flora e fauna, com funcionalidades avançadas de visualização, pesquisa e administração.

![Next.js](https://img.shields.io/badge/Next.js-13.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.10-06B6D4?style=flat-square&logo=tailwindcss)
![Styled Components](https://img.shields.io/badge/Styled%20Components-6.1.19-DB7093?style=flat-square&logo=styled-components)

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [API](#-api)

## ✨ Características

- 🎨 **Interface Moderna**: Design responsivo e atraente com Tailwind CSS e Styled Components
- 📱 **Scanner QR**: Funcionalidade de leitura de códigos QR para acesso rápido a informações
- 📊 **Dashboards Interativos**: Visualização de dados com gráficos dinâmicos usando Recharts
- 🔍 **Busca Avançada**: Sistema de pesquisa por espécies, tipos e características
- 🌐 **Mapas Integrados**: Localização geográfica com Google Maps API
- 📄 **Geração de PDF**: Relatórios e documentos em PDF com jsPDF
- 🎯 **Área Administrativa**: Painel completo para gestão do acervo
- 🌍 **PWA Ready**: Otimizado para dispositivos móveis

  Link do site em produção: https://data-tab-self.vercel.app

## 🛠 Tecnologias

### Frontend
- **Next.js 13.1.6** - Framework React para produção
- **React 18.2.0** - Biblioteca para interfaces de usuário
- **TailwindCSS 4.1.10** - Framework CSS utilitário
- **Styled Components 6.1.19** - CSS-in-JS para estilização

### Bibliotecas Principais
- **Recharts 3.0.2** - Gráficos e visualizações
- **Framer Motion 12.19.2** - Animações fluidas
- **React Google Maps API 2.20.6** - Integração com mapas
- **html5-qrcode 2.3.8** - Scanner de QR Code
- **React Icons 5.5.0** - Biblioteca de ícones
- **Day.js 1.11.13** - Manipulação de datas

### Ferramentas de Desenvolvimento
- **Jest** - Framework de testes
- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Compatibilidade CSS

## 🚀 Instalação

### Pré-requisitos
- Node.js 16.0 ou superior
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
```bash
git clone https://github.com/KaiokkFernandes/JardimBotanico-Front.git
cd JardimBotanico-Front
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_BASE_URL=https://sua-api-backend.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_do_google_maps
```

4. **Execute o projeto em desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📖 Uso

### Usuário Final
- **Exploração**: Navegue pelo acervo de flora e fauna
- **Scanner QR**: Use a câmera para escanear códigos QR e acessar informações específicas
- **Pesquisa**: Busque espécies por nome, categoria ou características
- **Visualização**: Veja informações detalhadas, imagens e localização
- **Formulários**: Registre visitas e interações

### Administrador
- **Gestão do Acervo**: Adicione, edite e remova espécies
- **Dashboards**: Visualize estatísticas e relatórios
- **Análise de Dados**: Acesse gráficos sobre distribuição, categorias e tendências

## 📁 Estrutura do Projeto

```
├── components/                 # Componentes React reutilizáveis
│   ├── AboutSection/          # Seção sobre o jardim
│   ├── API/                   # Serviços de API
│   ├── BotaoScanner/          # Botão do scanner QR
│   ├── Charts/                # Componentes de gráficos
│   ├── Forms/                 # Formulários diversos
│   ├── Header/                # Cabeçalho da aplicação
│   ├── HeroSection/           # Seção principal
│   ├── Layout/                # Layout base
│   ├── ModalEspecie/          # Modal de detalhes da espécie
│   ├── Navbar/                # Barra de navegação
│   ├── QrScanner/             # Scanner de QR Code
│   └── Utils/                 # Utilitários e helpers
├── pages/                     # Páginas do Next.js
│   ├── admin/                 # Área administrativa
│   ├── comochegar/            # Informações de localização
│   ├── contato/               # Página de contato
│   ├── especie/               # Detalhes de espécies
│   ├── planta/                # Detalhes de plantas
│   └── regras/                # Regras e políticas
├── public/                    # Arquivos públicos
│   ├── Data/                  # Dados JSON
│   └── Imagens/               # Imagens do acervo
└── styles/                    # Estilos globais
```

## 🔧 Funcionalidades

### 🌱 Exploração do Acervo
- Catálogo completo de flora e fauna
- Informações científicas detalhadas
- Galeria de imagens de alta qualidade
- Sistema de categorização

### 📱 Scanner QR
- Leitura de códigos QR em tempo real
- Acesso direto a informações específicas
- Interface intuitiva para dispositivos móveis

### 📊 Visualização de Dados
- Gráficos interativos de distribuição
- Estatísticas por categorias
- Análise temporal de dados
- Dashboards administrativos

### 🗺 Localização
- Integração com Google Maps
- Rotas e direções para o jardim

### 📝 Formulários
- Registro de visitas
- Cadastro de novas espécies
- Formulários de contato
- Sistema de autenticação

## 🔌 API

### Endpoints Principais

```javascript
// Buscar todas as espécies
GET /especimes

// Buscar por tipo de espécime
GET /especimes/tipo/{specimen_type}

// Buscar espécime específico
GET /especimes/{id}

// Criar nova espécie
POST /especimes

// Atualizar espécie
PUT /especimes/{id}

// Remover espécie
DELETE /especimes/{id}
```

### Exemplo de Uso
```javascript
import { fetchEspecimes, createEspecime } from '@/components/API/api';

// Buscar todas as espécies
const especies = await fetchEspecimes();

// Criar nova espécie
const novaEspecie = await createEspecime({
  nome_comum: "Exemplo",
  nome_cientifico: "Exemplum scientificus",
  categoria: "Flora",
  // ... outros campos
});
```

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar aplicação em produção
npm run start

# Executar testes
npm run test

# Executar testes em modo watch
npm run test:watch
```

---

<div align="center">
  <p>Feito com 💚 para o Jardim Botânico da UFSM</p>
  <p>Universidade Federal de Santa Maria</p>
</div>
