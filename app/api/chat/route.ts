// app/api/chat/route.ts
import { NextResponse } from 'next/server'
import { getProvider } from '@/libs/llm/providers'

export async function POST(request: Request) {
  const { provider, model, messages, max_tokens } = await request.json() as {
    provider: string
    model: string
    messages: { role: 'user' | 'assistant', content: string }[]
    max_tokens?: number
  }

  try {
    const llm = getProvider(provider)
    const result = await llm.send({ model, messages, max_tokens })
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
