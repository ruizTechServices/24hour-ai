//app\api\openai\responses\route.ts
import { NextResponse } from 'next/server'
import client from '@/libs/openai/client'

export async function POST(request: Request) {
  const { model, input } = await request.json()
  const response = await client.responses.create({ model: model || 'gpt-4.1', input })
  return NextResponse.json(response)
}