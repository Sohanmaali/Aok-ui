import { cilTrash } from "@coreui/icons";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CFormSelect,
  CFormInput,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useState } from "react";

export default function Calculator() {
  const [initialvalues, setInitialvalues] = useState([]); // Store calculated values
  const [calculatingValue, setCalculatingValue] = useState({
    currency: "",
    currency_counting: "",
  });
  const [totalAmount, setTotalAmount] = useState(0); // Store total amount
  const [errors, setErrors] = useState({});

  const handleSelectChange = (e) => {
    setCalculatingValue({
      ...calculatingValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    setCalculatingValue({
      ...calculatingValue,
      [e.target.name]: e.target.value,
    });
  };

  const checkValues = () => {
    const error = {};
    let isValid = true;

    if (!calculatingValue.currency) {
      error.currency = "Select a currency";
      isValid = false;
    }

    if (
      !calculatingValue.currency_counting ||
      calculatingValue.currency_counting <= 0
    ) {
      error.currency_counting = "Enter a valid currency count";
      isValid = false;
    }

    setErrors(error);
    return isValid;
  };

  const Calculat = (e) => {
    e.preventDefault();
    if (!checkValues()) return;

    const calculatedAmount =
      calculatingValue.currency * calculatingValue.currency_counting;

    // Update the list of calculated values
    setInitialvalues([
      ...initialvalues,
      {
        currency: calculatingValue.currency,
        counting: calculatingValue.currency_counting,
        calculatedAmount: calculatedAmount,
      },
    ]);

    // Update total amount
    setTotalAmount(totalAmount + calculatedAmount);

    // Clear input fields after calculation
    setCalculatingValue({
      currency: "",
      currency_counting: "",
    });
  };

  // Function to delete an item from the initialvalues array
  const deleteItem = (index) => {
    const newValues = [...initialvalues];
    const deletedValue = newValues.splice(index, 1)[0]; // Remove the selected item and get the removed item
    setInitialvalues(newValues);
    setTotalAmount(totalAmount - deletedValue.calculatedAmount); // Update total amount after removal
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
                    <CFormSelect
                      label="Select Currency *"
                      name="currency"
                      value={calculatingValue.currency}
                      onChange={handleSelectChange}
                    >
                      <option value="">Select Currency</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
                      <option value="2000">2000</option>
                    </CFormSelect>
                    {errors.currency && (
                      <p className="text-danger">{errors.currency}</p>
                    )}
                  </CCol>
                  <CCol>
                    <CFormInput
                      label="Currency Counting *"
                      placeholder="Enter Currency Counting"
                      name="currency_counting"
                      value={calculatingValue.currency_counting}
                      onChange={handleInputChange}
                      type="text"
                    />
                    {errors.currency_counting && (
                      <p className="text-danger">{errors.currency_counting}</p>
                    )}
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter>
                <div className="d-flex justify-content-center">
                  <CButton
                    color="success"
                    className="mx-2 text-white"
                    onClick={Calculat}
                  >
                    Calculate Amount
                  </CButton>
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
                <CRow className="mt-2 border border-gray-300 ms-5 me-5 rounded-border items-center overflow-hidden p-2">
                  <CCol className="font-semibold">
                    <div className="d-flex justify-content-between gap-4">
                      <div>Currency</div>
                      <div>Counting</div>
                      <div>Action</div>
                    </div>
                  </CCol>
                </CRow>

                {initialvalues.length > 0 &&
                  initialvalues.map((item, index) => (
                    <CRow
                      key={index}
                      className="mt-2 border border-gray-300 ms-5 me-5 rounded-border items-center overflow-hidden p-2"
                    >
                      <CCol className="">
                        <div className="d-flex justify-content-between">
                          <div className="font-medium text-gray-700 text-center">
                            {item.currency}
                          </div>
                          <div className="font-medium text-gray-700 me-3">
                            {item.counting}
                          </div>
                          <div
                            className="text-red-500 pointer-cursor d-flex gap-2"
                            onClick={() => deleteItem(index)}
                          >
                            <div className="">{"✏️"}</div>
                            {/* Delete Todo div */}
                            <div className="">❌</div>
                          </div>
                        </div>
                      </CCol>
                    </CRow>
                  ))}

                <CRow className="mt-2 ms-5 me-5">
                  <CCol>
                    <h5>Total Amount</h5>
                  </CCol>
                  <CCol>
                    <h5>{totalAmount}</h5>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
