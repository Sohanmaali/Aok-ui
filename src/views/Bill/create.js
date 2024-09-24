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
} from "@coreui/react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { submitHalper } from "../../helpers/submitHalper";
import SubHeader from "../../components/custome/SubHeader";
import { cilPencil, cilSpreadsheet, cilTrash } from "@coreui/icons";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import BasicProvider from "../../constants/BasicProvider";

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

export default function CreateBill() {
  const [startDate, setStartDate] = useState(new Date());

  const { id } = useParams();

  const dispatch = useDispatch();
  const [initialvalues, setInitialvalues] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    address: "",
    works: [{ work_name: "", price: "" }], // Array of work objects
    image: "",
    total: 0, // Initialize total as a number
  });
  const [errors, setErrors] = useState({});

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
    try {
      const data = submitHalper(initialvalues, ValidationRules, dispatch);

      if (data) {
        const response = await new BasicProvider(`bill`, dispatch).postRequest(
          initialvalues
        );
        setErrors({});
      } else {
        // Display error messages using toast notifications
        Object.values(errors).forEach((error) => toast.error(error));
      }
    } catch (error) {
      console.log("SUBMIT ERROR", error);
    }
  };

  const ValidationRules = {
    first_name: { required: true },
    last_name: { required: true },
    mobile: { required: true },
    address: { required: true },
    // works: { required: true },
  };

  return (
    <>
      <SubHeader
        subHeaderItems={subHeaderItems}
        moduleName="customers"
        deletionType="trash"
        // isHideAddButton={true}
      />
      <CContainer fluid>
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-between">
            <CCol md={8} lg={6}>
              <CCard className="shadow mb-4">
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
                        value={initialvalues[id]}
                      />
                    </div>
                  ))}
                </CCardBody>
              </CCard>
              <CCard className="shadow">
                <CCardHeader>
                  <h5>Profile</h5>
                </CCardHeader>
                <CCardBody>
                  <div className="mb-3">
                    <CFormLabel htmlFor="image">Select Image</CFormLabel>
                    <CFormInput
                      type="file"
                      id="image"
                      placeholder="Choose an image"
                      name="image"
                      accept="image/*" // Accepts only image files
                      onChange={handleChange}
                    />
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md={4} lg={6}>
              <CCard className="shadow">
                <CCardHeader>
                  <h5>Add Work's</h5>
                </CCardHeader>
                <CCardBody>
                  {initialvalues.works.map((work, index) => (
                    <div key={index} className="mb-3">
                      <CFormLabel htmlFor={`work_name_${index}`}>
                        Work Name
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id={`work_name_${index}`}
                        name="work_name"
                        placeholder="Enter work name"
                        value={work.work_name}
                        onChange={(e) => handleChange(e, index)}
                      />
                      <CFormLabel htmlFor={`price_${index}`}>Price</CFormLabel>
                      <CFormInput
                        type="text"
                        id={`price_${index}`}
                        name="price"
                        placeholder="Enter price"
                        value={work.price}
                        onChange={(e) => handleChange(e, index)}
                      />
                      <CButton
                        color="danger"
                        onClick={() => removeWork(index)}
                        className="mt-2"
                      >
                        Remove Work
                      </CButton>
                    </div>
                  ))}
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
                      Total: {initialvalues.total.toFixed(2)}
                    </div>
                  </div>

                  <div className="d-flex justify-content-around mt-5 ">
                    <CButton
                      type="submit"
                      color="success"
                      className="flex-grow-1 mx-2 text-white"
                    >
                      Save
                    </CButton>
                    <CButton
                      type="reset"
                      color="danger"
                      className="flex-grow-1 mx-2 text-white"
                    >
                      Cancel
                    </CButton>
                    <CButton
                      color="info"
                      className="flex-grow-1 mx-2 text-white"
                      disabled={!id}
                    >
                      Print Bill
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
