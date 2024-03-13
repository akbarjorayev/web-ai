import React, { useRef, useEffect, useState } from 'react'
import Markdown from 'react-markdown'

import { getAccount } from '../../js/data/account.js'

import Button from '../../components/Button/Button'

import './chatConversation.css'

const ChatConversation = React.forwardRef(({ chatHistory, ...props }, ref) => {
  const msgRef = useRef(null)
  const [account, setAccount] = useState({})

  useEffect(() => {
    async function fetchAccount() {
      setAccount(await getAccount())
    }
    fetchAccount()
  }, [])

  function getPic(role) {
    if (role === 'user') return account.profilePic
    if (role === 'model')
      return 'https://www.gstatic.com/lamda/images/gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg'
  }

  function copyMsg() {
    navigator.clipboard.writeText(msgRef.current.innerText)
  }

  return (
    <div ref={ref} {...props}>
      {chatHistory.map((chat, i) => {
        return (
          <div className="chat list_h" key={i}>
            <div className="list_h df_ai_st">
              <div
                className="profile_pic"
                style={{ '--profile-pic-size': '30px' }}
              >
                <img src={getPic(chat.role)} alt="" />
              </div>
            </div>
            <div className="chat_txt list_h">
              <div ref={msgRef} className="chat_conversation_text">
                <Markdown>{chat.parts}</Markdown>
              </div>
              <Button>
                <span className="material-symbols-outlined" onClick={copyMsg}>
                  content_copy
                </span>
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
})

export default ChatConversation
