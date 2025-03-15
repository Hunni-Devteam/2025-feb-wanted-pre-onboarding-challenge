import { useState } from 'react'
import './App.css'
import SimpleModal from './SimpleModal'

function App() {
  const [showAlert, setShowAlert] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showUserSelectorModal, setShowUserSelectorModal] = useState(false)

  return (
    <>
      <div className='flex flex-col gap-3 items-center justify-center h-screen'>
        <button onClick={() => setShowAlert(true)}>
          Show Alert Modal
        </button>
        <button onClick={() => setShowConfirm(true)}>
          Show Confirm Modal
        </button>
        <button onClick={() => setShowUserSelectorModal(true)}>
          Show User Selector Modal
        </button>
      </div>
      <SimpleModal
        show={showAlert}
        handleClose={() => setShowAlert(false)}
        handleOk={() => setShowAlert(false)}
      />
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
    </>
  )
}

export default App
