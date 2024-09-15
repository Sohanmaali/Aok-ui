import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
// import { Value } from 'sass'
// import BasicProvider from '../../../helpers/basicProvider'
import { useDispatch } from "react-redux";
import AuthHelpers from "../../../helpers/AuthHelper";

const Login = () => {
  const [initialValues, setInitialValues] = useState({});
  const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => state);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      try {
        AuthHelpers.login(initialValues, navigate, dispatch);
      } catch (error) {
        console.log("error of Auth ", error);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(initialValues)

  return (
    <div className=" min-vh-100 d-flex flex-row align-items-center bg-black">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Welcome To AOK</h1>
                    <p className="text-body-secondary">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Enter Email"
                        autoComplete="email"
                        name="email"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="success" type="submit" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
