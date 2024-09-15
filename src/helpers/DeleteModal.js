import React from 'react'
import { CModal, CButton, CModalBody, CModalFooter } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const DeleteModal = ({ visible, onClose }) => {
  return (
    <>
      <CModal visible={visible} onClose={() => onClose(false)} alignment="center">
        <CModalBody className="text-center">
          <div className="flex items-center justify-center mb-4">
            {/* Outer circle */}
            <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center">
              {/* Icon circle */}
              <div className="w-12 h-12 rounded-full border-2 border-gray-500 flex items-center justify-center">
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </div>
            </div>
          </div>

          <div>Are you sure you want to delete this product?</div>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center">
          <CButton
            color="danger"
            onClick={() => {
              // Handle the "Yes" action here
              onClose(false)
            }}
          >
            Yes
          </CButton>
          <CButton color="secondary" onClick={() => onClose(false)}>
            No
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DeleteModal
