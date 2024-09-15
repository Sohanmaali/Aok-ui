import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  // CFormCheck,
  CButton,
  CCard,
  CCardBody,
  // CCardHeader,
  // CLink,
} from '@coreui/react'
import { useState } from 'react'
// import DatePicker from 'react-datepicker'

// import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
// import BasicProvider from '../../../helpers/basicProvider'
import { submitHalper } from '../../../helpers/submitHalper'

export default function CreateBill(params) {
  // const [startDate, setStartDate] = useState(new Date())

  const [initialvalues, setInitialvalues] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    work: '',
    address: '',
    price: '',
    // work_date: new Date(),
    image: '',
  })

  // const dispatch = useDispatch()
  const ValidationRules = {
    first_name: { required: true },
    last_name: { required: true },
    mobile: { required: true },
    work: { required: true },
    address: { required: true },
    price: { required: true },
    work_date: { required: true },
    // image: { required: true },
  }

  const [errors, setErrors] = useState({})

  const dispatch = (action) => {
    switch (action.type) {
      case 'SET_ERRORS':
        setErrors(action.payload)
        break
      // Add other actions as needed
      default:
        break
    }
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    if (type === 'file') {
      // Handle file input
      setInitialvalues((prevValues) => ({
        ...prevValues,
        [name]: files[0], // Store the file object
      }))
    } else {
      // Handle text input
      setInitialvalues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (submitHalper(initialvalues, ValidationRules, dispatch)) {
      // const responce = await new BasicProvider(``).postRequest(initialvalues)
      setErrors({})
    } else {
      // Display error messages using toast notifications
      Object.values(errors).forEach((error) => toast.error(error))
    }
  }

  return (
    <>
      <CContainer>
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-between">
            <CCol md={8} lg={6}>
              <CCard className="shadow">
                {/* <CCardHeader>
                  <h1 className="h3 text-center">Create an account</h1>
                </CCardHeader> */}
                <CCardBody>
                  <div className="mb-3">
                    <CFormLabel htmlFor="first_name">Enter First Name</CFormLabel>
                    <CFormInput
                      type="first_name"
                      id="first_name"
                      name="first_name"
                      placeholder="First name"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel htmlFor="last_name">Enter Last Name</CFormLabel>
                    <CFormInput
                      type="last_name"
                      name="last_name"
                      id="last_name"
                      placeholder="Last name"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel htmlFor="mobile">Mobile Number</CFormLabel>
                    <CFormInput
                      type="text"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter mobile number"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="email">Email</CFormLabel>
                    <CFormInput
                      type="Email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel htmlFor="password">Password</CFormLabel>
                    <CFormInput
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="con_password">Confirm password</CFormLabel>
                    <CFormInput
                      type="password"
                      id="con_password"
                      name="con_password"
                      placeholder="Enter confirm Password"
                      onChange={handleChange}
                    />
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md={4} lg={6}>
              <CCard className="shadow">
                <CCardBody>
                  <div className="mb-3">
                    <CFormLabel htmlFor="image">Select Image</CFormLabel>
                    <CFormInput
                      type="file"
                      id="imageUpload"
                      placeholder="Choose an image"
                      name="image"
                      accept="image/*" // Accepts only image files
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="mb-3">
                      <CFormLabel htmlFor="password">Password</CFormLabel>
                      <CFormInput type="password" id="password" placeholder="••••••••"  />
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="confirm-password">Confirm password</CFormLabel>
                      <CFormInput
                        type="password"
                        id="confirm-password"
                        placeholder="••••••••"
                        
                      />
                    </div> */}

                  <div className="d-flex justify-content-around">
                    <CButton type="submit" color="success" className="flex-grow-1 mx-2 text-white">
                      Save
                    </CButton>
                    <CButton type="reset" color="danger" className="flex-grow-1 mx-2 text-white">
                      Cancel
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
    </>
  )
}
