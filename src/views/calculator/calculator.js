import { cilTrash } from "@coreui/icons";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useState } from "react";

export default function Calculator() {
  const currencyDenominations = [500, 200, 100, 50, 20, 10, 5, 2, 1];
  const [initialValues, setInitialValues] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputValues, setInputValues] = useState({}); // To hold each denomination's input

  const handleInputChange = (e, denomination) => {
    const value = e.target.value;
    setInputValues((prev) => ({
      ...prev,
      [denomination]: value,
    }));
  };

  const calculateTotalAmount = () => {
    let newTotalAmount = 0;
    const values = [];

    currencyDenominations.forEach((denomination) => {
      const count = parseInt(inputValues[denomination]) || 0;
      const calculatedAmount = denomination * count;

      if (count > 0) {
        values.push({
          currency: denomination,
          counting: count,
          calculatedAmount,
        });
        newTotalAmount += calculatedAmount;
      }
    });

    setInitialValues(values);
    setTotalAmount(newTotalAmount);
  };

  // Function to delete an item from the initialValues array
  const deleteItem = (index) => {
    const newValues = [...initialValues];
    const deletedValue = newValues.splice(index, 1)[0];
    setInitialValues(newValues);
    setTotalAmount(totalAmount - deletedValue.calculatedAmount);
  };

  return (
    <>
      <CContainer className="mt-5 mb-3">
        <CRow className="justify-content-between">
          <CCol md={8} lg={6}>
            <CCard className="shadow">
              <CCardHeader>
                <h5>Calculator</h5>
              </CCardHeader>
              <CCardBody>
                <CRow className="mb-3">
                  <CCol>
                    {currencyDenominations.map((denomination) => (
                      <div key={denomination} className="mb-3">
                        <div className="d-flex justify-content-between mx-5">
                          <div className="">currency of : {denomination}</div>
                          <div>
                            <CFormInput
                              type="text"
                              placeholder={`Enter count for ${denomination}`}
                              value={inputValues[denomination] || ""}
                              onChange={(e) =>
                                handleInputChange(e, denomination)
                              }
                              onInput={(e) => {
                                // Remove any non-numeric characters
                                e.target.value = e.target.value.replace(
                                  /\D/g,
                                  ""
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter>
                <div className="d-flex justify-content-center">
                  <div className="d-flex justify-content-center">
                    <CButton
                      color="success"
                      className="mx-2 text-white"
                      onClick={calculateTotalAmount}
                    >
                      Calculate Total
                    </CButton>
                  </div>
                  <div className="d-flex justify-content-center">
                    <CButton
                      color="danger"
                      className="mx-2 text-white"
                      onClick={() => setInputValues({})}
                    >
                      Reset
                    </CButton>
                  </div>
                </div>
              </CCardFooter>
            </CCard>
          </CCol>

          <CCol md={4} lg={6}>
            <CCard className="shadow">
              <CCardHeader>
                <h5>Calculated Amount</h5>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol>
                    <div className="d-flex justify-content-between mx-3 fw-bold">
                      <div>currency</div>
                      <div>counting</div>
                      <div>Amount</div>
                      <div
                        className="text-danger pointer-cursor d-flex gap-2"
                        // onClick={() => deleteItem(index)}
                      >
                        Action
                      </div>
                    </div>
                  </CCol>
                </CRow>
                {initialValues.length > 0 &&
                  initialValues.map((item, index) => (
                    <CRow
                      key={index}
                      className="mt-2 border border-gray-300 ms-2 me-2 rounded-border items-center overflow-hidden p-2"
                    >
                      <CCol>
                        <div className="d-flex justify-content-between">
                          <div>{item.currency}</div>
                          <div>{item.counting}</div>
                          <div>{item.calculatedAmount}</div>
                          <div
                            className="text-danger pointer-cursor d-flex gap-2"
                            onClick={() => deleteItem(index)}
                          >
                            <CIcon icon={cilTrash} />
                            {/* <div className="">❌</div> */}
                          </div>
                        </div>
                      </CCol>
                    </CRow>
                  ))}
                {initialValues.length > 0 && (
                  <CRow className="mt-4 ms-5 me-5">
                    <CCol>
                      <h5>Total Amount</h5>
                    </CCol>
                    <CCol>
                      <div className="d-flex justify-content-between">
                        <h5>{totalAmount}</h5>

                        <div>
                          <CButton
                            className="btn btn-danger"
                            onClick={() => {
                              setInitialValues([]);
                              setTotalAmount(0);
                            }}
                          >
                            Reset
                          </CButton>
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
