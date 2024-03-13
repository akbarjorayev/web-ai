import * as db from '../db.js'
let account = false

async function getAccount() {
  if (account) return account
  if (!localStorage.getItem('webAI')) return false

  const { userId } = JSON.parse(localStorage.getItem('webAI')).webAI

  try {
    const acc = (await db.load(`accounts/${userId}`)) || false
    account = acc

    return account
  } catch (err) {
    return err
  }
}

export { getAccount }
