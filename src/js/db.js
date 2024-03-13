import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, child, get } from 'firebase/database'

import API from '../api/api'

const app = initializeApp(API.firebase)
const db = getDatabase()

async function save(path, data) {
  const refPath = ref(db, path)
  await set(refPath, data)
}

async function load(path) {
  const dbRef = ref(db)
  try {
    const snapshot = await get(child(dbRef, path))

    if (snapshot.exists()) return snapshot.val()
    return false
  } catch (err) {
    return err
  }
}

export { save, load }
