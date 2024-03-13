import { useRef, useState, useEffect } from 'react'

import Textarea from '../../components/Textarea/Textarea'
import Button from '../../components/Button/Button'
import ChatConversation from './ChatConversation.jsx'

import { getAccount } from '../../js/data/account.js'
import * as AI from '../../js/ai.js'

import './chat.css'

function Chat() {
  const textareaRef = useRef(null)
  const conversation = useRef(null)
  const [chatHistory, setChatHistory] = useState([])
  const [textareaH, setTextareaH] = useState(0)
  const [account, setAccount] = useState({})

  useEffect(() => {
    setTextareaH(`${textareaRef.current.clientHeight}px`)
  }, [textareaRef])

  useEffect(() => {
    textareaRef.current.style.height = textareaH
  }, [textareaH])

  useEffect(() => {
    async function fetchAccount() {
      setAccount(await getAccount())
    }
    fetchAccount()
  }, [])

  useEffect(() => {
    conversation.current?.scrollTo({
      top: conversation.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [chatHistory])

  async function sendMsg() {
    const msg = textareaRef.current.value.trim()

    textareaRef.current.focus()
    textareaRef.current.value = ''
    if (!msg) return

    const userMsg = {
      role: 'user',
      parts: msg,
    }
    setChatHistory((prevHistory) => [...prevHistory, userMsg])

    const aiRes = (await AI.getText(msg, chatHistory)).text()
    const aiMsg = {
      role: 'model',
      parts: aiRes,
    }
    setChatHistory((prevHistory) => [...prevHistory, aiMsg])
  }

  function textareaHeight() {
    if (textareaRef.current.value === '') return setTextareaH('100%')
    setTextareaH(`${textareaRef.current.scrollHeight}px`)
  }

  return (
    <div className="df_fd_cl h_100">
      <div className="header df_jc_sb df_ai_ce">
        <span></span>
        <h1>Chat</h1>
        <Button className="profile_btn" style={{ '--btn-size': '30px' }}>
          <div className="profile_pic">
            <img src={account.profilePic} alt="" />
          </div>
        </Button>
      </div>
      <div className="df_fd_cl chat_area">
        <div className="chat_conversation">
          {chatHistory.length === 0 && (
            <div className="chat_begin">
              <h1>
                Hello{' '}
                <span className="txt_colorful">
                  {account.fname} {account.lname}
                </span>
              </h1>
              <p className="txt_opa">
                Hey there! Ready to start an awesome conversation? Let's make
                magic happen together! 💬✨
              </p>
            </div>
          )}
          {chatHistory.length > 0 && (
            <ChatConversation
              className="h_100 list_v scroll_v"
              ref={conversation}
              chatHistory={chatHistory}
            />
          )}
        </div>
        <div className="chat_input list_h df_ai_ce">
          <Textarea
            ref={textareaRef}
            placeholder="I'm waiting for you..."
            className="scroll_v"
            style={{ height: '40px' }}
            onInput={textareaHeight}
          />
          <Button style={{ '--btn-size': '40px' }} onClick={sendMsg}>
            <span className="material-symbols-outlined">send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Chat
