import { useEffect, useRef, useState } from 'react'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'

import * as db from '../../js/db.js'

import './signin.css'

function Signin() {
  const fnameInput = useRef(null)
  const lnameInput = useRef(null)
  const fileInput = useRef(null)
  const [profilePicImg, setProfilePicImg] = useState('')

  useEffect(() => {
    fileInput.current.value = ''
  }, [profilePicImg])

  function checkInputs() {
    const inputs = [fnameInput.current]

    for (let i = 0; i < inputs.length; i++) {
      const value = inputs[i].value.trim()

      if (!value) {
        inputs[i].classList.add('error')
        inputs[i].focus()
        return
      }
    }

    if (!profilePicImg) {
      fileInput.current.closest('.profile_pic').classList.add('error')
      fileInput.current.focus()
      return
    }
    createAccount()
  }

  function fileUploaded() {
    const file = fileInput.current.files[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setProfilePicImg(url)

    fileInput.current.closest('.profile_pic').classList.remove('error')
  }

  function getImgData(imgUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const base64String = canvas.toDataURL('image/jpeg')
        resolve(base64String)
      }
      img.onerror = reject
      img.src = imgUrl
    })
  }

  async function createAccount() {
    const account = {
      fname: fnameInput.current.value.trim(),
      lname: lnameInput.current.value.trim(),
      profilePic: await getImgData(profilePicImg),
    }

    const userId = Date.now()

    await db.save(`accounts/${userId}`, account)
    localStorage.setItem('webAI', JSON.stringify({ webAI: { userId } }))

    window.location.href = '/chat'
  }

  return (
    <div className="h_100 df_ce">
      <div className="login_area list_v">
        <div className="title list_h">
          <span className="material-symbols-outlined">id_card</span>
          <span>Account</span>
        </div>
        <div className="df_fd_cl list_v_small">
          <div className="list_v df_ai_ce">
            <div className="profile_pic_area df_ce">
              <div
                className="profile_pic df_ce"
                style={{ '--profile-pic-size': '100px' }}
                onClick={() => fileInput.current.click()}
              >
                {!profilePicImg && (
                  <span className="material-symbols-outlined">add_a_photo</span>
                )}
                {profilePicImg && (
                  <img className="profile_pic_img" src={profilePicImg} alt="" />
                )}
                <Input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  onChange={fileUploaded}
                />
              </div>
              {profilePicImg && (
                <div className="btns df_jc_sb">
                  <Button
                    className="profile_btn df_ce"
                    onClick={() => fileInput.current.click()}
                  >
                    <span className="material-symbols-outlined">
                      change_circle
                    </span>
                  </Button>
                  <Button
                    className="profile_btn df_ce btn_red"
                    onClick={() => setProfilePicImg('')}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="list_h">
            <span className="material-symbols-outlined icon_big">person</span>
            <Input
              ref={fnameInput}
              placeholder="First name"
              name="name"
              autoComplete="on"
            />
          </div>
          <div className="list_h">
            <span className="material-symbols-outlined icon_big">person</span>
            <Input
              ref={lnameInput}
              placeholder="Last name"
              name="lastname"
              autoComplete="on"
            />
          </div>
        </div>
        <div className="df_jc_fe">
          <Button onClick={checkInputs}>Create</Button>
        </div>
      </div>
    </div>
  )
}

export default Signin
