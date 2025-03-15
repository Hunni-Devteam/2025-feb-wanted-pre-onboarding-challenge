import { useState } from 'react'
import './App.css'
import SimpleModal from './SimpleModal'
import useModal from './useModal'

function App() {
  const modal = useModal()
  const [showConfirm, setShowConfirm] = useState(false)
  const [showUserSelectorModal, setShowUserSelectorModal] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)

  return (
    <>
      <div className='flex flex-col gap-3 items-center justify-center h-screen'>
        <button onClick={() => modal.open({
          type: 'alert',
          props: {
            title: 'Alert',
            description: 'This is a simple alert modal',
            closeText: 'Close',
            handleClose: () => modal.close(),
          },
        })}>
          Show Alert Modal w/ useModal
        </button>
        <button onClick={() => setShowConfirm(true)}>
          Show Confirm Modal
        </button>
        <button onClick={() => setShowUserSelectorModal(true)}>
          Show User Selector Modal
        </button>
        <button onClick={() => setShowSignUpModal(true)}>
          Sign Up
        </button>
      </div>
      <SimpleModal
        show={showConfirm}
        showOk
        title='Confirm?'
        description='Are you sure you want to delete this item?'
        okText='Yes'
        closeText='No'
        handleClose={() => setShowConfirm(false)}
        handleOk={() => setShowConfirm(false)}
      />
      <SimpleModal
        show={showUserSelectorModal}
        title="Select User"
        Content={
          <select>
            <option value="1">User 1</option>
            <option value="2">User 2</option>
            <option value="3">User 3</option>
          </select>
        }
        Footer={
          <button onClick={() => setShowUserSelectorModal(false)}>Select</button>
        }
        handleClose={() => setShowUserSelectorModal(false)}
      />
      <SimpleModal
        show={showSignUpModal}
        title="Sign Up"
        Content={<div className="flex flex-col">
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
          </form>
        </div>
        }
        Footer={
          <button onClick={() => setShowSignUpModal(false)}>Sign Up</button>
        }
        handleClose={() => setShowSignUpModal(false)}
      />
    </>
  )
}

export default App
