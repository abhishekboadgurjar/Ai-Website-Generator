# AI Website Generator

> A production-ready platform for generating, customizing, and deploying websites through AI-powered automation and natural language processing

<div align="center">
  
![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%204-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-Postgres-00e599?style=for-the-badge)
![Drizzle](https://img.shields.io/badge/Drizzle-ORM-c5f74f?style=for-the-badge)

[Live Demo](#) · [Report Bug](https://github.com/abhishekgurjarin/ai-website-generator/issues) · [Request Feature](https://github.com/abhishekgurjarin/ai-website-generator/issues)

</div>

---

## 🎯 Project Overview

AI Website Generator empowers users to create sophisticated websites through an intuitive AI-powered interface. Built with modern full-stack architecture, it demonstrates enterprise-level patterns for real-time generation, database management, and intelligent workflow automation. Simply describe your vision in natural language, and watch as the AI transforms your ideas into fully functional, responsive web designs.

**Author:** Abhishek Gurjar — [GitHub Profile](https://github.com/abhishekgurjarin) | [Portfolio](https://abhishekgurjar.vercel.app/)

---

## ✨ Core Features

### Intelligent Generation Engine

* **AI-Powered Design** - Leverages OpenRouter (GPT-4o-mini) for natural language to code transformation
* **Interactive Chat Interface** - Real-time conversation with the AI to refine and iterate on designs
* **Dynamic Preview** - Instant visual feedback of generated code within the workspace
* **Context-Aware Generation** - AI understands project context and maintains consistency across iterations

### Project & Workflow Management

* **Workspace Organization** - Manage multiple projects with dedicated workspaces
* **History & Versioning** - Track chat history and design iterations for every project
* **Export Capabilities** - Export generated code for external use and deployment
* **Project Dashboard** - Centralized view of all your projects with quick access

### Production Infrastructure

* **Secure Authentication** - Via Clerk with robust user management and SSO support
* **Serverless Database** - Powered by Neon for automatic scaling and zero-downtime
* **Type-Safe ORM** - Drizzle ORM for reliable database interactions with full TypeScript support
* **Modern Styling** - Tailwind CSS v4 for utility-first, responsive design
* **Real-time Updates** - Instant synchronization across devices and sessions

### Developer Experience

* **Hot Reload Preview** - See changes instantly as you interact with the AI
* **Code Syntax Highlighting** - Clear, readable code display with proper formatting
* **Responsive Interface** - Optimized for desktop and tablet workflows
* **Error Handling** - Graceful error messages and recovery suggestions

---

## 🛠️ Technical Architecture

### Frontend Stack

```
Next.js 16 (App Router)     → SSR/SSG hybrid rendering
React 19                    → Modern concurrent features
TypeScript 5                → Type safety across codebase
Tailwind CSS 4              → Utility-first styling
Lucide React                → Consistent icon system
Recharts                    → Data visualization
```

### Backend & Services

```
Next.js API Routes          → Serverless functions
Neon Database               → Serverless Postgres
Drizzle ORM                 → TypeScript-first ORM
Clerk                       → Authentication & user management
OpenRouter                  → LLM-powered intelligence (GPT-4o-mini)
```

### Key Architectural Decisions

**Why Next.js App Router?**
Leverages React Server Components for optimal performance, streaming SSR for faster Time to First Byte (TTFB), and simplified data fetching patterns that reduce client-side JavaScript bundle size.

**Why Neon & Drizzle?**
Neon provides a serverless Postgres experience that scales to zero with automatic connection pooling, while Drizzle offers best-in-class type safety and developer experience without the overhead of traditional ORMs like Prisma or TypeORM.

**Why Clerk?**
Production-ready authentication with zero backend code required, built-in UI components for sign-in/sign-up flows, and seamless JWT integration with our serverless architecture.

**Why OpenRouter?**
Provides access to cutting-edge AI models with a unified API, allowing easy model switching and cost optimization without vendor lock-in.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Workspace   │  │ Dashboard UI │  │  Auth Pages  │      │
│  │ (Playground) │  │   (Projects) │  │   (Clerk)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/JSON
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js API Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   AI Chat    │  │  Projects    │  │    Users     │      │
│  │    Route     │  │    Route     │  │    Route     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌──────────────────────┐    ┌──────────────────────┐
│    Neon Database     │    │   External APIs      │
│  ┌────────────────┐  │    │  ┌────────────────┐  │
│  │  Users Table   │  │    │  │ OpenRouter API │  │
│  │ Projects Table │  │    │  │  (GPT-4o-mini) │  │
│  │  Chats Table   │  │    │  └────────────────┘  │
│  └────────────────┘  │    └──────────────────────┘
└──────────────────────┘
```

---

## 🚀 Full-Stack Skills Demonstrated

### Frontend Engineering

* **Modern React Patterns** - Server components, client components, and streaming
* **Advanced State Management** - React Context, custom hooks, and optimistic updates
* **Performance Optimization** - Code splitting, lazy loading, and bundle optimization
* **Responsive Design** - Mobile-first approach with Tailwind's responsive utilities

### Backend Development

* **Serverless API Design** - RESTful endpoints with Next.js API routes
* **Database Schema Design** - Normalized tables with proper relationships
* **ORM Integration** - Drizzle for type-safe database queries
* **Third-party API Integration** - OpenRouter for AI capabilities

### DevOps & Infrastructure

* **Environment Management** - Proper configuration for dev, staging, and production
* **Database Migrations** - Version-controlled schema changes with Drizzle Kit
* **Security Best Practices** - Environment variable handling, API key protection
* **Deployment Automation** - CI/CD with Vercel for zero-downtime deployments

### Software Engineering Practices

* **Type Safety** - End-to-end TypeScript coverage for reliability
* **Clean Code** - Modular architecture with separation of concerns
* **Documentation** - Comprehensive inline comments and README
* **Version Control** - Semantic commits and feature branching

---

## 📂 Project Structure

```
ai-website-generator/
├── app/
│   ├── (auth)/              # Authentication routes (sign-in, sign-up)
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── api/                 # Backend API routes
│   │   ├── chat/            # AI chat endpoint
│   │   ├── projects/        # Project CRUD operations
│   │   └── users/           # User management
│   ├── dashboard/           # User dashboard with project list
│   ├── workspace/           # Main editing interface
│   │   └── [projectId]/     # Dynamic project workspace
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/              # Reusable UI components
│   ├── ui/                  # Base UI components
│   ├── workspace/           # Workspace-specific components
│   └── dashboard/           # Dashboard components
├── config/                  # Configuration files
│   └── schema.ts            # Drizzle schema definitions
├── drizzle/                 # Database migrations
│   └── migrations/
├── lib/                     # Utility functions
│   ├── db.ts                # Database connection
│   ├── auth.ts              # Authentication helpers
│   └── utils.ts             # General utilities
├── public/                  # Static assets
│   ├── images/
│   └── icons/
├── types/                   # TypeScript type definitions
├── .env.example             # Environment variable template
├── drizzle.config.ts        # Drizzle configuration
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

---

## 🔧 Local Development Setup

### Prerequisites

* Node.js 18.17 or later
* npm, yarn, or pnpm
* Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhishekgurjarin/ai-website-generator.git
   cd ai-website-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Setup environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Database (Neon)
   DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

   # OpenRouter AI
   OPENROUTER_API_KEY=sk-or-...
   NEXT_PUBLIC_OPENROUTER_MODEL=openai/gpt-4o-mini
   ```

4. **Run database migrations**
   ```bash
   npm run db:push
   # or
   npx drizzle-kit push:pg
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Additional Commands

```bash
# Generate database migrations
npm run db:generate

# Open Drizzle Studio (database GUI)
npm run db:studio

# Build for production
npm run build

# Start production server
npm run start

# Run TypeScript type checking
npm run type-check

# Lint code
npm run lint
```

---

## 🌐 Deployment Guide

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   * Go to [vercel.com](https://vercel.com)
   * Click "New Project"
   * Import your GitHub repository
   * Vercel will auto-detect Next.js

3. **Configure environment variables**
   * Add all variables from your `.env.local` file
   * Ensure `DATABASE_URL` points to your production Neon database

4. **Deploy**
   * Click "Deploy"
   * Vercel will build and deploy your application
   * Future commits to `main` will trigger automatic deployments

### Neon Database Setup

1. Create a Neon account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add it to your environment variables as `DATABASE_URL`
5. Run migrations: `npm run db:push`

### Environment Configuration

Ensure these environment variables are set in production:
* All Clerk keys for authentication
* `DATABASE_URL` for Neon connection
* `OPENROUTER_API_KEY` for AI functionality

---

## 🎨 Usage Guide

### Creating Your First Website

1. **Sign In** - Authenticate using Clerk (supports email, Google, GitHub)
2. **Create Project** - Click "New Project" on the dashboard
3. **Describe Your Vision** - Use natural language to describe your website
   * Example: "Create a modern portfolio website with a hero section, project gallery, and contact form"
4. **Refine & Iterate** - Continue chatting with the AI to make adjustments
   * "Make the hero section full-screen"
   * "Add a dark mode toggle"
   * "Use a blue and white color scheme"
5. **Preview & Export** - View your website in real-time and export the code

### Best Practices

* **Be Specific** - Provide clear details about layout, colors, and functionality
* **Iterate Gradually** - Make one change at a time for better results
* **Use Examples** - Reference existing websites or design patterns
* **Test Responsiveness** - Check how your design looks on different screen sizes

---

## 🤝 Contributing

Contributions are welcome! This project follows standard open-source contribution guidelines.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with clear messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

* Follow existing code style and conventions
* Write meaningful commit messages
* Add tests for new features when applicable
* Update documentation for significant changes
* Ensure TypeScript types are properly defined

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

Permission is granted to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to including the copyright notice and permission notice in all copies.

---

## 📬 Contact & Support

**Abhishek Gurjar**
* GitHub: [@abhishekgurjarin](https://github.com/abhishekgurjarin)
* Portfolio: [https://abhishekgurjar.vercel.app/](https://abhishekgurjar.vercel.app/)

### Get Help

* 🐛 **Report Bugs**: [GitHub Issues](https://github.com/abhishekgurjarin/ai-website-generator/issues)
* 💡 **Request Features**: [GitHub Issues](https://github.com/abhishekgurjarin/ai-website-generator/issues)
* 💬 **Discussions**: [GitHub Discussions](https://github.com/aabhishekgurjarin/ai-website-generator/discussions)

---

## 🙏 Acknowledgments

* **OpenRouter** - For providing access to cutting-edge AI models
* **Vercel** - For seamless deployment and hosting
* **Neon** - For serverless Postgres infrastructure
* **Clerk** - For authentication infrastructure
* **Next.js Team** - For an incredible framework

---

<div align="center">

**[⬆ Back to Top](#ai-website-generator)**

Made with ❤️ by [Abhishek Gurjar](https://github.com/abhishekgurjarin)

If you find this project helpful, please consider giving it a ⭐️

</div>
