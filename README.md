<div align="center">
  <h1>🔥 FogoZero MG - App</h1>

  <p>
    <strong>Interface Web da Plataforma de Monitoramento e Combate a Incêndios Florestais em Minas Gerais</strong>
  </p>

  <p>
    <a href="#-sobre-o-projeto">Sobre</a> •
    <a href="#-funcionalidades">Funcionalidades</a> •
    <a href="#-arquitetura">Arquitetura</a> •
    <a href="#-tecnologias-utilizadas">Tecnologias</a> •
    <a href="#-instala%C3%A7%C3%A3o-e-execu%C3%A7%C3%A3o">Instalação</a> •
    <a href="#-rotas-da-aplica%C3%A7%C3%A3o">Rotas</a> •
    <a href="#-deploy">Deploy</a>
  </p>

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Rotas da Aplicação](#-rotas-da-aplicação)
- [Integração com a API](#-integração-com-a-api)
- [Padrões de Estilo](#-padrões-de-estilo)
- [Deploy](#-deploy)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O **FogoZero MG - App** é a interface web da plataforma FogoZero MG, desenvolvida como parte do Desafio III - ZettaLab 2025/2. A aplicação consome a [API FogoZero](https://github.com/JoaoLucasPereiraRamalho/FogoZero_Backend) e oferece ao usuário ferramentas para acompanhar dados de queimadas em Minas Gerais, reportar focos de incêndio e consumir conteúdo educativo sobre prevenção ambiental.

### Objetivos

- ✅ Apresentar de forma visual o panorama de queimadas em MG (focos, IMRI, biomas).
- ✅ Permitir que cidadãos enviem reportes de incêndio com geolocalização e imagem.
- ✅ Disponibilizar dashboard analítico com gráficos interativos e mapas de calor.
- ✅ Centralizar conteúdo educativo (notícias e glossário ambiental).
- ✅ Oferecer área administrativa para gestão de notícias e usuários.
- ✅ Garantir experiência responsiva, acessível e fiel ao protótipo do Figma.

---

## ✨ Funcionalidades

### 🏠 **Portal Informativo (`/`)**
- Carrossel com chamadas educativas sobre queimadas.
- Seção sobre o projeto e o cenário atual de incêndios em MG.
- Grid de notícias aprovadas, importadas e mantidas pelo backend.

### 📊 **Dashboard (`/dashboard`)**
- Seletor unificado de município (853 cidades de MG).
- Cards estatísticos: número de focos, IMRI, classificação de risco, bioma e mês mais afetados.
- Mapa interativo com pontos georreferenciados.
- Mapa de calor (heatmap) por município.
- Gráficos de evolução histórica, taxa anual e comparativo mensal (Recharts).
- Análise por bioma: distribuição, evolução mensal e estatísticas de tendência (crescimento/queda/estável) com seletor de ano dinâmico (anos disponíveis carregados via API).

### 📍 **Reporte (`/reporte`)**
- Formulário em duas seções (`<fieldset>`): dados do usuário (somente para visitantes) e dados da ocorrência.
- Suporte a usuários **logados** e **não logados** (cadastra automaticamente quem ainda não tem conta).
- Upload de imagem via dropzone ou URL direta.
- Geolocalização com captura via dispositivo.
- Hero CTA com botões de emergência (193) e atalho para o formulário.

### 🔐 **Autenticação**
- Cadastro (`/cadastro`) com seleção de região de monitoramento (9 áreas cobrindo Cerrado, Mata Atlântica e Caatinga).
- Login (`/login`) com persistência de sessão em `localStorage`.
- Recuperação de senha: envio de e-mail (`/forgot-password`) e redefinição via token (`/reset-password`).

### 👤 **Perfil do Usuário (`/perfilusuario`)**
- Edição de dados pessoais.
- Tabela com histórico de reportes enviados e seus status (análise IA + revisão admin).
- Gerenciamento de cidades monitoradas para alertas.

### 🛠️ **Painel Administrativo (`/admin`)**
- Lista de usuários cadastrados e gerenciamento de papéis.
- Aprovação/rejeição de notícias importadas pelo crawler.
- Acesso restrito aos usuários com papel `administrador`.

---

## 🏢 Arquitetura

```
┌────────────────┐         ┌──────────────────┐         ┌────────────────┐
│   Navegador    │────────▶│  Frontend React  │────────▶│   API Node.js  │
│   (Cliente)    │  HTTP   │     (Vercel)     │  HTTP   │    (Render)    │
└────────────────┘         └──────────────────┘         └────────┬───────┘
                                    │                            │
                                    │ Axios + JWT                │
                                    │ (interceptors)             ▼
                                    │                   ┌────────────────┐
                                    │                   │   PostgreSQL   │
                                    │                   │    (Render)    │
                                    │                   └────────────────┘
                                    ▼
                          ┌──────────────────┐
                          │  localStorage    │
                          │  (token + user)  │
                          └──────────────────┘
```

A aplicação segue arquitetura em camadas baseada em **componentes**:

```
pages → componentes de seção → componentes de UI → services (axios) → API
```

- **`pages/`**: containers de rota (uma página por rota do React Router).
- **`components/`**: agrupados por domínio (`Dashboard`, `Report`, `Biomas`, `Header`, `Footer` etc.).
- **`services/`**: módulos Axios (um por recurso da API), com instância compartilhada e interceptors de autenticação.
- **`utils/`** e **`types/`**: helpers e contratos TypeScript.

---

## 🔧 Tecnologias Utilizadas

### **Core**
- **[React 19](https://react.dev/)** - Biblioteca de interface reativa.
- **[TypeScript 6](https://www.typescriptlang.org/)** - Tipagem estática.
- **[Vite 8](https://vitejs.dev/)** - Bundler com Rolldown e HMR.
- **[React Router DOM 7](https://reactrouter.com/)** - Roteamento client-side.

### **UI e Estilo**
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework utility-first (via plugin `@tailwindcss/vite`).
- **[Lucide React](https://lucide.dev/)** - Ícones SVG.
- Design system inspirado em fontes **Lexend** e **Inter** com paleta institucional (`#bd1522`, `#6a0a18`, `#a8121f`, `#d12a3d`).

### **Dados e Visualização**
- **[Axios](https://axios-http.com/)** - Cliente HTTP com interceptors.
- **[Recharts 3](https://recharts.org/)** - Gráficos (Area, Bar, Line, Pie).

### **Qualidade**
- **[ESLint 9](https://eslint.org/)** + **typescript-eslint** + **eslint-plugin-react-hooks**.
- **`tsc -b`** no script de build para validação estrita de tipos.

### **Infraestrutura**
- **[Vercel](https://vercel.com/)** - Hospedagem e CI/CD do frontend.
- **API Backend**: [https://fogozero-backend.onrender.com](https://fogozero-backend.onrender.com).

---

## 📦 Pré-requisitos

- **Node.js 22+** ([download](https://nodejs.org/))
- **npm 10+**
- **Git**
- API **FogoZero Backend** rodando localmente (porta 3000) ou apontamento para a versão em produção.

---

## 📥 Instalação e Execução

### **1. Clone o repositório**

```bash
git clone https://github.com/JoaoLucasPereiraRamalho/FogoZero_Frontend.git
cd FogoZero_Frontend
```

### **2. Instale as dependências**

```bash
npm install
```

### **3. Execute em modo desenvolvimento**

```bash
npm run dev
```

A aplicação estará disponível em **`http://localhost:5173`**.

### **4. Build de produção**

```bash
npm run build
```

Os arquivos otimizados são gerados em `dist/`. Para servir localmente:

```bash
npm run preview
```

### **5. Lint**

```bash
npm run lint
```

---

## 🔑 Variáveis de Ambiente

O frontend utiliza variáveis prefixadas com `VITE_` (expostas no client). Crie um `.env` na raiz com:

```env
# URL base da API (sem barra final)
VITE_API_URL=http://localhost:3000/api
```

Para apontar para a API em produção:

```env
VITE_API_URL=https://fogozero-backend.onrender.com/api
```

> Caso a variável não seja definida, o cliente Axios em [`src/services/api.ts`](src/services/api.ts) cai automaticamente em `http://localhost:3000/api`.

### Chaves usadas no `localStorage`

| Chave | Conteúdo |
|---|---|
| `@FogoZero:token` | JWT retornado no login |
| `@FogoZero:user` | Objeto do usuário autenticado (id, nome, email, papel) |

---

## 📂 Estrutura do Projeto

```
FogoZero_Frontend/
│
├── public/                     # Assets estáticos servidos como /
│   ├── fz1.svg                 # Favicon
│   ├── logo_completa_w.svg     # Logo branca (header)
│   ├── imagem.png              # Hero do Reporte
│   ├── carrossel.png           # Carrossel do Portal
│   └── ...
│
├── src/
│   ├── assets/                 # Imagens importadas via bundler
│   ├── components/
│   │   ├── Admin/              # Dashboard administrativo
│   │   ├── Biomas/             # DistribuicaoBiomas, EvolucaoMensalBioma, EstatisticasBioma
│   │   ├── Cadastro/           # RegisterForm, InputGroup
│   │   ├── Dashboard/          # CitySelector, MapaInterativo, HeatMapSection, gráficos
│   │   ├── EsqueciSenha/       # ForgotPassword, ResetPassword
│   │   ├── Footer/             # Footer global
│   │   ├── Header/             # Header + BotaoPerfil (3 estados de auth)
│   │   ├── Informativo/        # Hero, About, Carrossel, Notícias
│   │   ├── Login/              # LoginForm
│   │   ├── Report/             # HeroCTA, ReportForm, EmergencyGuidelines, HeatMap
│   │   └── Usuario/            # ProfileDataForm, ReportsTable, CityAlertsManager
│   │
│   ├── pages/                  # Containers de rota (1 por path)
│   │   ├── Admin.tsx
│   │   ├── Cadastro.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── InformativoPage.tsx
│   │   ├── Login.tsx
│   │   ├── PerfilUsuario.tsx
│   │   ├── ResetPassword.tsx
│   │   └── ReportePage/index.tsx
│   │
│   ├── services/               # Camada de acesso à API (axios)
│   │   ├── api.ts              # Instância compartilhada + interceptors JWT
│   │   ├── auth.ts             # login, registro, recuperação de senha
│   │   ├── bioma.ts            # distribuição, evolução, estatísticas, anos disponíveis
│   │   ├── crud_usuario.ts     # CRUD de usuário
│   │   ├── educativo.ts        # Glossário e notícias educativas
│   │   ├── historico_reportes.ts
│   │   ├── monitoramento.ts    # Cidades monitoradas
│   │   ├── municipio.ts        # 853 municípios de MG
│   │   ├── noticia.ts          # Notícias e crawler
│   │   └── reporte.ts          # Reportes + análise IA
│   │
│   ├── types/                  # Contratos TypeScript
│   │   ├── auth.ts
│   │   └── noticia.ts
│   │
│   ├── utils/                  # Helpers
│   │   ├── auth.ts             # Leitura de token/user no localStorage
│   │   └── geo.ts              # Geolocalização (browser)
│   │
│   ├── App.tsx                 # Definição das rotas
│   ├── main.tsx                # Entry point
│   ├── index.css               # @import "tailwindcss" + tema
│   └── App.css
│
├── index.html
├── vite.config.ts              # Plugins react + tailwindcss
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.json
├── eslint.config.js
└── package.json
```

---

## 🌐 Rotas da Aplicação

Definidas em [`src/App.tsx`](src/App.tsx):

| Rota | Página | Acesso |
|---|---|---|
| `/` | `InformativoPage` (portal público) | Público |
| `/dashboard` | `DashboardPage` (mapas, gráficos, biomas) | Público |
| `/reporte` | `ReportePage` (formulário de ocorrências) | Público (cadastra automaticamente) |
| `/cadastro` | `Cadastro` | Visitantes |
| `/login` | `LoginPage` | Visitantes |
| `/forgot-password` | `ForgotPasswordPage` | Visitantes |
| `/reset-password` | `ResetPasswordPage` | Via token de e-mail |
| `/perfilusuario` | `PerfilUsuario` | Autenticado |
| `/admin` | `AdminPage` | Administrador |

> O componente [`BotaoPerfil`](src/components/Header/BotaoPerfil.tsx) renderiza condicionalmente os botões do header em **3 estados** (visitante, usuário comum, administrador) com base nas chaves `@FogoZero:token` e `@FogoZero:user` do `localStorage`.

---

## 🔌 Integração com a API

Todas as chamadas HTTP usam a instância compartilhada em [`src/services/api.ts`](src/services/api.ts):

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Adiciona JWT em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@FogoZero:token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Limpa sessão em 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@FogoZero:token");
    }
    return Promise.reject(error);
  },
);
```

### Recursos consumidos

| Service | Endpoints da API consumidos |
|---|---|
| [`auth.ts`](src/services/auth.ts) | `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `POST /auth/forgot-password`, `POST /auth/reset-password` |
| [`bioma.ts`](src/services/bioma.ts) | `GET /biomas/distribuicao`, `GET /biomas/:id/evolucao-mensal`, `GET /biomas/:id/estatisticas`, `GET /biomas/anos-disponiveis` |
| [`municipio.ts`](src/services/municipio.ts) | `GET /municipios`, rankings de focos e IMRI |
| [`reporte.ts`](src/services/reporte.ts) | `POST /reportes`, `GET /reportes`, atualização de status |
| [`monitoramento.ts`](src/services/monitoramento.ts) | `GET/POST/DELETE /monitoramentos` |
| [`noticia.ts`](src/services/noticia.ts) / [`educativo.ts`](src/services/educativo.ts) | `GET /noticias`, `GET /educativo/glossario`, fluxo de aprovação |
| [`crud_usuario.ts`](src/services/crud_usuario.ts) | `GET/PUT/DELETE /usuarios` |
| [`historico_reportes.ts`](src/services/historico_reportes.ts) | `GET /usuarios/me/reportes` |

A documentação completa dos endpoints fica no Swagger do backend: [https://fogozero-backend.onrender.com/api-docs](https://fogozero-backend.onrender.com/api-docs).

---

## 🎨 Padrões de Estilo

- **Tailwind CSS v4** com classes canônicas: `grow` (não `flex-grow`), `shrink-0` (não `flex-shrink-0`), `bg-linear-to-r` (não `bg-gradient-to-r`), tamanhos em escala fixa (`h-100`, `h-125` no lugar de `h-[400px]`/`h-[500px]`).
- **Paleta institucional**:
  - Vermelho marca: `#bd1522`
  - Gradiente do header/footer: `from-[#6a0a18] via-[#a8121f] to-[#d12a3d]`
- **Tipografia**: títulos em `font-black`/`font-extrabold` com `tracking-tight`; uso de `italic uppercase` para destaques institucionais.
- **TypeScript estrito**: `verbatimModuleSyntax` ativo — utilize `import type { X }` para tipos.
- **Convenções**: componentes em PascalCase, services em camelCase, módulos por domínio.

---

## 🚀 Deploy

A aplicação está hospedada em produção:

| Serviço | URL |
|---|---|
| **Frontend** | [https://fogo-zero-mg.vercel.app](https://fogo-zero-mg.vercel.app) |
| **API Backend** | [https://fogozero-backend.onrender.com](https://fogozero-backend.onrender.com) |
| **Swagger** | [https://fogozero-backend.onrender.com/api-docs](https://fogozero-backend.onrender.com/api-docs) |

### Configuração na Vercel

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Variáveis de Ambiente**:
  - `VITE_API_URL=https://fogozero-backend.onrender.com/api`

Cada push na branch `main` dispara um novo deploy automático.

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>Projeto desenvolvido para o <strong>Desafio III - ZettaLab 2025/2</strong></p>
</div>
