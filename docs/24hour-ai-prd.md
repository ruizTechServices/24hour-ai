# 24Hour-AI PRD for Windsurf Agent
**Version:** 3.0  
**Date:** April 17, 2025  
**Owner:** Gio (Luis Giovanni Ruiz)

---

## 1. Overview
**24Hour-AI** is a pay‑per‑use and subscription‑based AI chatbot platform. It leverages **PocketFlow** for orchestrating RAG and multi‑model pipelines, and is built on a **TypeScript/Next.js 15** stack. This PRD serves as the single source of truth for a solo developer using **Windsurf Agent** to execute from setup through launch.

### 1.1 Goals
- **MVP Launch:** 8 weeks
- **Users:** 500 paying by Month 3
- **MRR:** ≥ $1,500 by Month 3
- **Profitability:** by Month 6

### 1.2 Scope
- User auth & sessions
- Chat UI with RAG + multi‑model support
- Canvas drawing and file upload/parse
- JSONL chat export
- Token and subscription billing
- Admin dashboard & automated cleanup

## 2. User Personas
| Persona      | Needs                                       | Example                             |
|--------------|---------------------------------------------|-------------------------------------|
| Occasional   | Quick, one‑off AI queries                   | \$1 chat pass (20K tokens)          |
| Professional | Deep reasoning with persistent memory       | \$5 reasoning pass (5K tokens)      |
| SMB Owner    | Unlimited access + storage                   | \$50/mo subscription                |

## 3. Functional Requirements
1. **Auth & Access**  
   - Clerk sign‑in; Supabase RLS per user
2. **Chat + RAG**  
   - Streaming responses, typing indicator
   - **PocketFlow** nodes:  
     - RAG (Pinecone)  
     - LLM (OpenAI/Mistral/Gemini/Claude/Groq/HF)
   - Model selector + token enforcement
3. **Canvas**  
   - `CanvasModal.tsx`; POST `/api/canvas` → Supabase Storage
4. **File Upload**  
   - Support PDF/DOCX/images; OCR via pdfplumber/Tesseract
   - Chunk text → embeddings → Pinecone
5. **Export**  
   - GET `/api/export?format=jsonl` → stream JSONL
6. **Billing**  
   - \$1 pass → session; \$5 pass → reasoning; \$50/mo sub
   - Square Node SDK (2025) checkout + webhooks
   - Optional: Stripe integration for advanced billing
7. **Admin & Cleanup**  
   - Dashboard metrics; manual + cron cleanup (cleanupFlow)

## 4. Non‑Functional Requirements
- **Performance:** API < 500 ms (excl. LLM)  
- **Scalability:** ≥100 concurrent users  
- **Security:** TLS, secrets in GitHub, RLS enforced  
- **Reliability:** 99.5% uptime  
- **Maintainability:** Modular code; Jest tests

## 5. Architecture & Tech Stack
- **IDE:** Windsurf Editor (Flows & live preview)  
- **Language:** TypeScript  
- **Node:** v22 LTS (`.nvmrc`)  
- **Frontend:** Next.js 15 (App Dir), Tailwind CSS 4, Shadcn UI, TanStack Query v5
- **Backend:** Next.js API Routes; Express 5/Fastify for webhooks
- **Orchestration:** PocketFlow.js (`libs/pocketflow`)
- **DB:** Supabase (Postgres + pgvector) + Prisma >=v6.5
- **Vector DB:** Pinecone (or pgvector for small scale)
- **Storage:** Supabase Storage
- **Auth:** Clerk + Supabase RLS
- **Billing:** Square SDK 2025 (or Stripe)
- **CI/CD:** GitHub Actions, Codespaces  
- **Deploy:** Vercel (Edge + Cron), Render/Fly.io for webhooks
- **Monitor:** Sentry, LogRocket

## 6. Data Model (Prisma)
```prisma
model User { id String @id @default(uuid()); email String @unique; clerkId String @unique; subscription Subscription?; sessions Session[] }
model Session { id String @id @default(uuid()); userId String; modelType String; tokenLimit Int; tokenUsage Int @default(0); createdAt DateTime @default(now()); markedForDeletion DateTime?; messages Message[] }
model Message { id String @id @default(uuid()); sessionId String; role String; content String @db.Text; tokens Int @default(0); createdAt DateTime @default(now()) }
```  
*Additional models: Subscription, File as needed.*

## 7. API & Flow Mapping
| Endpoint           | PocketFlow Flow | Description                          |
|--------------------|-----------------|--------------------------------------|
| POST `/api/chat`   | chatFlow        | RAG + LLM chat                       |
| POST `/api/canvas` | canvasFlow      | Save canvas image                    |
| POST `/api/upload` | uploadFlow      | Parse & embed file                   |
| GET `/api/export`  | exportFlow      | JSONL session export                 |
| POST `/api/payment`| paymentFlow     | Checkout + webhook handling          |
| CRON `/cleanup`    | cleanupFlow     | Expired session cleanup              |

## 8. Timeline
| Phase                      | Weeks | Deliverables                           |
|----------------------------|------:|----------------------------------------|
| 1. Setup                   | 1–2   | Repo, Wind surf rules, PocketFlow clone |
| 2. Chat MVP                | 3–4   | chatFlow, `/api/chat`, ChatUI          |
| 3. Canvas & File           | 5–6   | canvasFlow, uploadFlow, UI components  |
| 4. Export & RAG            | 7     | exportFlow, Pinecone integration       |
| 5. Billing & Sessions      | 8–9   | paymentFlow, checkout, webhooks        |
| 6. Admin & Cleanup         | 10    | Admin dashboard, cleanupFlow           |
| 7. Test & Launch           | 11–12 | E2E tests, CI/CD, deploy               |

## 9. Risk Mitigation
- **Adoption:** Early access + referrals
- **Costs:** Token caps + pgvector offload
- **Bugs:** Staging + automated tests
- **Scope:** Lock features to this PRD

## 10. Build Checklist
- [ ] Clone the repository and install dependencies
- [ ] Add and initialize the PocketFlow submodule
- [ ] Configure environment variables (`.env`) and Node version (`.nvmrc`)
- [ ] Commit Windsurf rules to version control
- [ ] Launch local Supabase emulator and Pinecone local
- [ ] Scaffold `chatFlow.ts` using Windsurf Agent
- [ ] Implement the `/api/chat` endpoint and ChatUI component
- [ ] Write Jest unit tests for `chatFlow` and ChatUI
- [ ] Scaffold and implement `canvasFlow` along with UI and API endpoints
- [ ] Scaffold and implement `uploadFlow` along with UI and API endpoints
- [ ] Scaffold and implement `exportFlow` and its API endpoint
- [ ] Scaffold and implement `paymentFlow` and webhook handlers
- [ ] Build the Admin dashboard with manual cleanup controls
- [ ] Scaffold and schedule the `cleanupFlow` cron job
- [ ] Configure GitHub Actions and Codespaces for CI/CD
- [ ] Create end‑to‑end tests with Cypress or Playwright
- [ ] Conduct performance and load testing
- [ ] Deploy the frontend to Vercel and backend/webhooks to the chosen host
- [ ] Configure Sentry and LogRocket monitoring
- [ ] Monitor production, gather feedback, and plan v4 enhancements

---
*End of PRD v3.0 for Windsurf Agent*

