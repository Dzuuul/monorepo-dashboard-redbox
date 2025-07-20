# 🚀 Dashboard Monorepo Redbox

Sebuah turborepo modern yang dibangun dengan **Next.js 15**, **React 19**, dan **TypeScript** untuk dashboard enterprise yang scalable dan maintainable.

## 📋 Daftar Isi

- [🏗️ Struktur Proyek](#️-struktur-proyek)
- [🚀 Quick Start](#-quick-start)
- [📦 Aplikasi & Package](#-aplikasi--package)
- [🛠️ Scripts](#️-scripts)
- [🔧 Teknologi](#-teknologi)
- [📝 Catatan Penting](#-catatan-penting)
- [🤝 Contributing](#-contributing)

## 🏗️ Struktur Proyek

```
dashboard-monorepo-redbox/
├── apps/
│   ├── api/                 # Backend API (Fastify + GraphQL)
│   └── web/                 # Frontend Dashboard (Next.js 15)
├── packages/
│   ├── eslint-config/       # Shared ESLint configuration
│   ├── typescript-config/   # Shared TypeScript configuration
│   └── ui/                  # Shared UI components
├── turbo.json               # Turborepo configuration
├── pnpm-workspace.yaml      # PNPM workspace configuration
└── package.json             # Root package.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: `>=20.11.0`
- **PNPM**: `>=10.12.4`
- **NPM**: `>=10.0.0`

### Installation

```bash
# Clone repository
git clone <repository-url>
cd dashboard-monorepo-redbox

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

### Development Commands

```bash
# Start all applications in development mode
pnpm dev

# Build all applications
pnpm build

# Lint all applications
pnpm lint

# Check TypeScript types
pnpm check-types

# Format code
pnpm format
```

## 📦 Aplikasi & Package

### 🖥️ Apps

#### **Web Dashboard** (`apps/web`)

- **Framework**: Next.js 15 dengan Turbopack
- **UI Library**: React 19 + Radix UI
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Validation**: Zod
- **Port**: 3000

**Fitur Utama:**

- Dashboard interaktif dengan drag & drop
- Sistem autentikasi
- Manajemen dokumen dan laporan
- Data visualization dengan Recharts
- Theme switching (light/dark mode)
- Responsive design

#### **API Backend** (`apps/api`)

- **Framework**: Fastify
- **GraphQL**: GraphQL Yoga
- **Database**: PostgreSQL + Drizzle ORM, MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **Validation**: Zod

**Fitur Utama:**

- RESTful API endpoints
- GraphQL API
- Database migrations
- User authentication & authorization
- Data validation

### 📚 Packages

#### **UI Components** (`packages/ui`)

- Shared React components
- Reusable UI primitives
- Consistent design system

#### **ESLint Config** (`packages/eslint-config`)

- Shared ESLint rules
- Consistent code quality standards
- Multiple configurations (base, next, react)

#### **TypeScript Config** (`packages/typescript-config`)

- Shared TypeScript configurations
- Strict type checking
- Multiple presets (base, nextjs, react-library)

## 🛠️ Scripts

| Script             | Description                                |
| ------------------ | ------------------------------------------ |
| `pnpm dev`         | Start all applications in development mode |
| `pnpm build`       | Build all applications for production      |
| `pnpm lint`        | Lint all applications and packages         |
| `pnpm check-types` | Check TypeScript types across all packages |
| `pnpm format`      | Format code with Prettier                  |

## 🔧 Teknologi

### Frontend Stack

- **Next.js 15** - React framework dengan App Router
- **React 19** - Latest React dengan concurrent features
- **TypeScript 5.8** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Zustand** - Lightweight state management
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend Stack

- **Fastify** - Fast web framework
- **GraphQL Yoga** - GraphQL server
- **Drizzle ORM** - Type-safe SQL ORM
- **Mongoose** - MongoDB ODM
- **PostgreSQL** - Primary database
- **MongoDB** - Document database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Development Tools

- **Turborepo** - Monorepo build system
- **PNPM** - Fast package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 📝 Catatan Penting

### 🔐 Environment Variables

**Web App** (`apps/web`):

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
JWT_SECRET=your-secret-key
NEXTAUTH_SECRET=your-nextauth-secret

# API
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**API** (`apps/api`):

```env
# Database
DATABASE_URL=postgresql://...
MONGODB_URI=mongodb://...

# Authentication
JWT_SECRET=your-secret-key

# Server
PORT=3001
NODE_ENV=development
```

### 🚨 Penting untuk Diperhatikan

1. **Node Version**: Pastikan menggunakan Node.js `>=20.11.0`
2. **Package Manager**: Gunakan PNPM untuk konsistensi
3. **Database Setup**:
   - PostgreSQL untuk data utama
   - MongoDB untuk dokumen
4. **Environment**: Setup environment variables sebelum menjalankan aplikasi
5. **Ports**:
   - Web: `http://localhost:3000`
   - API: `http://localhost:3001`

### 🔄 Development Workflow

1. **Setup Environment**: Copy `.env.example` ke `.env` dan sesuaikan
2. **Install Dependencies**: `pnpm install`
3. **Database Migration**: Setup database dan jalankan migrations
4. **Start Development**: `pnpm dev`
5. **Code Quality**: Pastikan linting dan type checking pass

### 🏗️ Architecture Patterns

- **Monorepo**: Menggunakan Turborepo untuk build optimization
- **Shared Packages**: UI components dan configs di-share antar apps
- **Type Safety**: TypeScript di semua layer
- **API First**: Backend API terpisah dari frontend
- **Component Driven**: UI components yang reusable

### 🎯 Best Practices

1. **Code Quality**: Selalu jalankan `pnpm lint` sebelum commit
2. **Type Safety**: Gunakan `pnpm check-types` untuk memastikan type safety
3. **Component Reusability**: Gunakan shared UI components dari `packages/ui`
4. **Environment Management**: Jangan commit `.env` files
5. **Database Migrations**: Selalu backup sebelum migration

## 🤝 Contributing

### Development Guidelines

1. **Branch Naming**: `feature/description` atau `fix/description`
2. **Commit Messages**: Gunakan conventional commits
3. **Code Review**: Semua PR harus di-review
4. **Testing**: Pastikan semua tests pass
5. **Documentation**: Update docs jika ada perubahan

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 📊 Analogi

Bayangkan turborepo ini seperti **kompleks apartemen modern**:

- **Root** = Lobby utama dengan sistem keamanan dan fasilitas umum
- **Apps** = Unit-unit apartemen (Web Dashboard & API Backend)
- **Packages** = Fasilitas bersama (UI Components, Configs)
- **Turborepo** = Sistem manajemen yang mengatur semua unit
- **PNPM** = Petugas yang mengatur distribusi kebutuhan ke setiap unit
- **TypeScript** = Standar keamanan yang memastikan semua unit aman
- **ESLint** = Aturan kebersihan yang menjaga kualitas lingkungan

Setiap unit memiliki fungsi spesifik tapi saling terintegrasi untuk menciptakan pengalaman yang seamless bagi penghuni (users).

---

**Built with ❤️ using modern web technologies**
