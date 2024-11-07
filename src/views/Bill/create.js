import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
} from "@coreui/react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { submitHalper } from "../../helpers/submitHalper";
import SubHeader from "../../components/custome/SubHeader";
import { cilPencil, cilSpreadsheet, cilTrash } from "@coreui/icons";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import BasicProvider from "../../constants/BasicProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import api from "js-cookie";

var subHeaderItems = [
  {
    name: "All Bill",
    link: "/bill/all",
    icon: cilSpreadsheet,
  },
  // {
  //   name: "Create Bill",
  //   link: "/bill/create",
  //   icon: cilPencil,
  // },
  {
    name: "Trash Bill",
    link: "/bill/trash",
    icon: cilTrash,
  },
];

const formFields = [
  { id: "first_name", label: "Enter First Name", placeholder: "First name" },
  { id: "last_name", label: "Enter Last Name", placeholder: "Last name" },
  { id: "mobile", label: "Mobile Number", placeholder: "Enter mobile number" },
  { id: "address", label: "Address", placeholder: "Enter address" },
];
const ValidationRules = {
  first_name: { required: true },
  last_name: { required: true },
  mobile: { required: true },
  address: { required: true },
  // works: { required: true },
};

export default function CreateBill() {
  const [startDate, setStartDate] = useState(new Date());

  const { id, customer } = useParams();
  const isEditMode = Boolean(id);

  const dispatch = useDispatch();
  const [initialvalues, setInitialvalues] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    address: "",
    works: [{ work_name: "", price: "" }],
    image: "",
    total: 0,
  });
  console.log("initialvalues", initialvalues);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [pdfloading, setPdfLoading] = useState(false);

  const handleChange = (e, index) => {
    const { name, value, type, files } = e.target;

    if (name === "work_name" || name === "price") {
      const updatedWorks = [...initialvalues.works];
      updatedWorks[index][name] = value;
      setInitialvalues((prevValues) => {
        const newTotal = updatedWorks.reduce(
          (sum, work) => sum + (parseFloat(work.price) || 0),
          0
        );
        return {
          ...prevValues,
          works: updatedWorks,
          total: newTotal, // Update total
        };
      });
    } else if (type === "file") {
      setInitialvalues((prevValues) => ({
        ...prevValues,
        [name]: files[0],
      }));
    } else {
      setInitialvalues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const addWork = () => {
    setInitialvalues((prevValues) => {
      const updatedWorks = [...prevValues.works, { work_name: "", price: "" }];
      const newTotal = updatedWorks.reduce(
        (sum, work) => sum + (parseFloat(work.price) || 0),
        0
      );
      return {
        ...prevValues,
        works: updatedWorks,
        total: newTotal, // Update total
      };
    });
  };

  const removeWork = (index) => {
    setInitialvalues((prevValues) => {
      const updatedWorks = prevValues.works.filter((_, i) => i !== index);
      const newTotal = updatedWorks.reduce(
        (sum, work) => sum + (parseFloat(work.price) || 0),
        0
      );
      return {
        ...prevValues,
        works: updatedWorks,
        total: newTotal, // Update total
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = submitHalper(initialvalues, ValidationRules, dispatch);

      if (data) {
        const response = await new BasicProvider(`bill`, dispatch).postRequest(
          initialvalues
        );
        setErrors({});
      } else {
        toast.error("Please fill all the required fields");
        Object.values(errors).forEach((error) => toast.error(error));
      }
    } catch (error) {
      console.log("SUBMIT ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      const response = await new BasicProvider(
        `customer/show/${customer}`,
        dispatch
      ).getRequest();
      if (response.status == "success") {
        console.log("response", response?.data);

        setInitialvalues((prev) => ({
          ...prev,
          first_name: response?.data?.first_name,
          last_name: response?.data?.last_name,
          mobile: response?.data?.mobile,
          address: response?.data?.address,
        }));
      }
    };
    if (customer) {
      fetchCustomerData();
    }

    if (id) {
      const fetchData = async () => {
        const response = await new BasicProvider(
          `bill/show/${id}`,
          dispatch
        ).getRequest();
        if (response.status == "success") {
          setInitialvalues(response?.data);
        }
      };
      fetchData();
    } else {
      setInitialvalues({
        first_name: "",
        last_name: "",
        mobile: "",
        address: "",
        works: [{ work_name: "", price: "" }], // Array of work objects
        image: "",
        total: 0, // Initialize total as a number
      });
    }
  }, [id]);

  const printBill = async () => {
    setPdfLoading(true);
    try {
      // console.log("calling");

      // Making the request to get the PDF response
      const response = await new BasicProvider(
        `bill/pdf/${id}`,
        dispatch
      ).getPdf();
      console.log("response", response);

      // response.data is already a Blob, so no need to call blob()
      const blob = response?.data;

      // Create a URL for the Blob and open it in a new tab
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <>
      <SubHeader
        subHeaderItems={subHeaderItems}
        moduleName="bill"
        deletionType="trash"
        // isHideAddButton={true}
      />
      <CContainer fluid>
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-between">
            <CCol md={8} lg={6}>
              <CCard className="shadow mb-4 dark:bg-gray-800">
                <CCardHeader>
                  <h5>Personal Information</h5>
                </CCardHeader>
                <CCardBody>
                  {formFields.map(({ id, label, placeholder }) => (
                    <div className="mb-3" key={id}>
                      <CFormLabel htmlFor={id}>{label}</CFormLabel>
                      <CFormInput
                        type="text"
                        id={id}
                        name={id}
                        placeholder={placeholder}
                        onChange={handleChange}
                        disabled={isEditMode || customer}
                        value={initialvalues[id]}
                        // disabled={customer ? true : false}
                      />
                    </div>
                  ))}
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="work_date" className="">
                      Work Date *
                    </CFormLabel>
                    <CCol md="12" className="w-full">
                      <DatePicker
                        selected={initialvalues?.work_date || null}
                        placeholderText="Select a date"
                        name="work_date"
                        disabled={isEditMode}
                        // onChange={handleDateChange}
                        onChange={(date) => {
                          setInitialvalues({
                            ...initialvalues,
                            work_date: date,
                          });
                        }}
                        className="form-control w-full"
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              {/* <CCard className="shadow">
                <CCardHeader>
                  <h5>Profile</h5>
                </CCardHeader>
                <CCardBody>
                  <div className="mb-3">
                    <CFormLabel htmlFor="image">Select Image</CFormLabel>
                    <CFormInput
                      type="file"
                      id="image"
                      disabled={isEditMode}
                      placeholder="Choose an image"
                      name="image"
                      accept="image/*" // Accepts only image files
                      onChange={handleChange}
                    />
                  </div>
                </CCardBody>
              </CCard> */}
            </CCol>

            <CCol md={4} lg={6}>
              <CCard className="shadow mt-4 mt-md-0">
                <CCardHeader>
                  <h5>Add Work's</h5>
                </CCardHeader>
                <CCardBody>
                  {initialvalues.works &&
                    initialvalues.works.length > 0 &&
                    initialvalues.works.map((work, index) => (
                      <div key={index} className="mb-3">
                        <CFormLabel htmlFor={`work_name_${index}`}>
                          Work Name
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          disabled={isEditMode}
                          id={`work_name_${index}`}
                          name="work_name"
                          placeholder="Enter work name"
                          value={work.work_name}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <div className="mt-3">
                          <CFormLabel htmlFor={`price_${index}`}>
                            Price
                          </CFormLabel>
                          <CFormInput
                            type="text"
                            disabled={isEditMode}
                            id={`price_${index}`}
                            name="price"
                            placeholder="Enter price"
                            value={work.price}
                            onChange={(e) => {
                              // Allow only numeric input
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                handleChange(e, index);
                              }
                            }}
                          />
                        </div>
                        {!isEditMode && (
                          <CButton
                            color="danger"
                            onClick={() => removeWork(index)}
                            className="mt-2"
                          >
                            Remove Work
                          </CButton>
                        )}
                      </div>
                    ))}
                  {!isEditMode && (
                    <div className="d-flex justify-content-between align-items-center">
                      <CButton
                        type="button"
                        color="primary"
                        onClick={addWork}
                        className="me-5"
                      >
                        Add Work
                      </CButton>
                      <div className="font-bold">
                        Total: {initialvalues?.total?.toFixed(2)}
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-around mt-5 ">
                    <CButton
                      type="submit"
                      color="success"
                      className="flex-grow-1 mx-2 text-white"
                      disabled={isLoading || isEditMode}
                    >
                      {isLoading ? (
                        <>
                          <CSpinner size="sm" /> Saving...{" "}
                        </>
                      ) : id ? (
                        "Update"
                      ) : (
                        "save"
                      )}
                    </CButton>
                    <CButton
                      type="reset"
                      color="danger"
                      className="flex-grow-1 mx-2 text-white"
                      disabled={isEditMode}
                    >
                      Cancel
                    </CButton>
                    <CButton
                      // type="submit"
                      color="info"
                      className="flex-grow-1 mx-2 text-white"
                      disabled={pdfloading}
                      onClick={printBill}
                    >
                      {pdfloading ? (
                        <>
                          <CSpinner size="sm" /> Generating...{" "}
                        </>
                      ) : (
                        "Print Bill"
                      )}
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
    </>
  );
}
