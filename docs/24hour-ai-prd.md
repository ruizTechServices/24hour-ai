# 24Hour‑AI PRD for Windsurf Agent  
**Version:** 4.1  
**Date:** April 21, 2025  
**Owner:** Gio (Luis Giovanni Ruiz)

---

## 1. Overview  
**24Hour-AI** is a **pay-per-use and subscription-based AI chatbot platform**. It is built on a modern technology stack that includes **Next.js (App Router), React, and TypeScript**.

Here are some key characteristics of 24Hour-AI based on the sources:

*   **Access Model**: Users can access the AI chatbot through one-off “**chat passes**” for **24-hour access** or by subscribing for persistent storage. Different tiers include a $1 chat pass for occasional use and a $5 reasoning pass with a higher token limit—both providing 24-hour access without persistent storage. A $50/month subscription is available for SMB owners, offering unlimited use and persistent storage.
*   **Authentication**: User authentication is handled by **Clerk**.
*   **Database/State Management**: The platform utilizes **Supabase** for its database and state management needs, enabling persistent storage for subscribers. Non-subscribers (stateless users) can temporarily store chat history in the browser with a “Download” option in the UI.
*   **Payments**: Payments are processed using **Square**. Square webhooks should point to the application’s Vercel URL (`/api/square/webhook`).
*   **Optional RAG (Retrieval-Augmented Generation)**: An optional enhancement using **Pinecone** and **LangChain** can augment LLM interactions. This involves embedding text via OpenAI, upserting into a Pinecone index, then performing similarity searches at query time to provide context for the LLM.
*   **Deployment and Monitoring**: Deploy on **Vercel** (automatic Next.js deployments). Set environment variables for Supabase, Square, Pinecone, and Clerk in the Vercel dashboard. Use tools like Sentry or Logflare to monitor errors, payment failures, and expired sessions.
*   **Modularity**: Architecture is modular—authentication, payments, and LLM integration are decoupled components that can be developed and tested independently.
*   **Focus on User Integration**: Prioritize a conversational yet direct user experience, integrating all discussed features in a cohesive UI and UX flow.

### 1.1 Goals  
- **MVP Launch:** 8 weeks  
- **500 paying users** by end of Month 3  
- **MRR ≥ \$1,500** by end of Month 3  
- **Break‑even** by Month 6  

### 1.2 Scope  
- **User Authentication & Sessions**  
  - Clerk sign‑up/sign‑in  
  - Protected routes via middleware  
- **One‑Off Passes ($1 / $5)**  
  - Square payment form (PaymentForm component)  
  - Server Action to create payment & set 24‑hr expiration in Supabase  
  - Client‑side countdown timer UI  
- **Subscription ($50/mo)**  
  - Square Subscriptions API + webhook handling  
  - Supabase subscriptions table & status checks  
- **Chat UI**  
  - Stateless for one‑off users (localStorage)  
  - Persistent for subscribers (chat_logs in Supabase)  
  - JSONL export button for non‑subscribers  
- **RAG & Multi‑Model Pipelines**  
  - Pinecone index setup & upsert  
  - Similarity search at query time  
  - LangChain integration for contextual prompts  
- **Admin Dashboard**  
  - View active passes & subscriptions  
  - Automated cleanup of expired sessions  
  - Usage logs & revenue reporting  

---

## 2. User Personas

| Persona       | Access Model                 | Storage       | Example Offer              |
|---------------|------------------------------|---------------|----------------------------|
| **Occasional**   | \$1 chat pass (24 hr)         | Stateless (localStorage)     | Quick one‑off queries     |
| **Professional** | \$5 reasoning pass (24 hr, higher token limit) | Stateless (localStorage)     | Deep analysis sessions    |
| **SMB Owner**    | \$50/mo subscription (unlimited) | Persistent (Supabase DB) | Ongoing project support   |

---

*End of PRD v4.1 for Windsurf Agent*  
