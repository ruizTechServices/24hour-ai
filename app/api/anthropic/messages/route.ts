//app\api\anthropic\messages\route.ts
import { NextResponse } from 'next/server'
import client from '@/libs/anthropic/client'

export async function POST(request: Request) {
  const body = await request.json()
  const { model, messages, max_tokens } = body
  
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }
    
    const message = await client.messages.create({
      max_tokens: max_tokens || 1024,
      messages: messages,
      model: model || 'claude-3-5-sonnet-latest',
    });
    
    return NextResponse.json(message)
}