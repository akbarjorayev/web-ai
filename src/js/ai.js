import { GoogleGenerativeAI } from '@google/generative-ai'
import API from '../api/api.js'

const AI = new GoogleGenerativeAI(API.ai)

async function getText(msg, history) {
  const model = AI.getGenerativeModel({ model: 'gemini-pro' })
  const chat = model.startChat(history)

  const result = await chat.sendMessage(msg)
  const { response } = await result

  return response ? response : false
}

export { getText }
