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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import SubHeader from "../../../components/custome/SubHeader";
import { cilPencil, cilSpreadsheet, cilTrash } from "@coreui/icons";
import BasicProvider from "../../../constants/BasicProvider";
import { useDispatch } from "react-redux";
import ImagePreview from "../../../components/custome/ImagePreview";
import { submitHalper } from "../../../helpers/submitHalper";
var subHeaderItems = [
  {
    name: "All borrowing",
    link: "/borrowing/all",
    icon: cilSpreadsheet,
  },
  {
    name: "Trash borrowing",
    link: "/borrowing/trash",
    icon: cilTrash,
  },
];

export default function CreateBorrow(params) {
  // const [startDate, setStartDate] = useState(new Date())
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [initialvalues, setInitialvalues] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    work_name: "",
    address: "",
    price: "",
    work_date: "",
    image: "",
  });

  const fetchData = async () => {
    const response = await new BasicProvider(
      `borrowing/show/${id}`,
      dispatch
    ).getRequest();

    if (response.status == "success") setInitialvalues(response?.data);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

  const dispatch = useDispatch();
  const ValidationRules = {
    first_name: { required: true },
    last_name: { required: true },
    mobile: { required: true },
    work_name: { required: true },
    address: { required: true },
    price: { required: true },
    work_date: { required: true },
    // image: { required: true },
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // Handle file input
      setInitialvalues((prevValues) => ({
        ...prevValues,
        [name]: URL.createObjectURL(files[0]), // Store the file object
      }));
    } else {
      setInitialvalues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      setInitialvalues((prevValues) => ({
        ...prevValues,
        work_date: date.toISOString(),
      }));
    } else {
      console.error("Invalid date format");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = submitHalper(initialvalues, ValidationRules, dispatch);

      if (!data) {
        toast.error("Please fill all the required fields");
        return;
      }

      const response = await new BasicProvider(
        `borrowing`,
        dispatch
      ).postRequest(data);

      toast.success("Data created");
      navigate(`/borrowing/${response.data._id}/edit`); // Adjust the URL as needed

      setErrors({});
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SubHeader
        subHeaderItems={subHeaderItems}
        // handleFilter={(search) => handleFilter(search)}
        // setSearchCurrentPage={setSearchCurrentPage}
        // onReset={() => handleFilterReset()}
        // searchInput={search}
        // rowPerPage={rowPerPage}
        isHideAddButton={true}
        // defaultPage={defaultPage}
        moduleName="borrowing"
        deletionType="trash"
      />
      <CContainer className="">
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-between">
            <CCol md={8} lg={6}>
              <CCard className="shadow">
                <CCardHeader className="">
                  <h5>Personal Information</h5>
                </CCardHeader>
                <CCardBody>
                  <div className="mb-3">
                    <CFormLabel htmlFor="first_name">First Name *</CFormLabel>
                    <CFormInput
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={initialvalues?.first_name || ""}
                      className=" input-outline"
                      placeholder="First name"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel htmlFor="last_name">Last Name</CFormLabel>
                    <CFormInput
                      type="last_name"
                      name="last_name"
                      value={initialvalues?.last_name || ""}
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
                      maxLength="10"
                      minLength="10"
                      value={initialvalues?.mobile}
                      placeholder="Enter mobile number"
                      onChange={(e) => {
                        // Allow only numeric input
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          handleChange(e); // Call your original change handler
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="work_name">Work Name *</CFormLabel>
                    <CFormInput
                      type="text"
                      id="work_name"
                      value={initialvalues?.work_name || ""}
                      name="work_name"
                      placeholder="Enter Work"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel htmlFor="address">Address</CFormLabel>
                    <CFormInput
                      type="text"
                      id="address"
                      value={initialvalues?.address || ""}
                      name="address"
                      placeholder="Enter address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="price">Price *</CFormLabel>
                    <CFormInput
                      type="text"
                      id="price"
                      name="price"
                      value={initialvalues?.price || ""}
                      placeholder="Enter price"
                      onChange={(e) => {
                        // Allow only numeric input
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          handleChange(e); // Call your original change handler
                        }
                      }}
                    />
                  </div>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="work_date" className="">
                      Work Date *
                    </CFormLabel>
                    <CCol md="12" className="w-full">
                      {" "}
                      {/* Full width for all screen sizes */}
                      <DatePicker
                        selected={initialvalues?.work_date || null}
                        placeholderText="Select a date"
                        name="work_date"
                        onChange={handleDateChange}
                        className="form-control w-full" // Ensure the DatePicker also takes full width
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md={4} lg={6} className="mt-4 mt-md-0  mb-4 mb-md-0">
              <CCard className="shadow">
                <CCardHeader className="">
                  <h5>Profile</h5>
                </CCardHeader>
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
                  <ImagePreview
                    initialvalues={initialvalues}
                    setInitialvalues={setInitialvalues}
                  />

                  <div className="d-flex justify-content-around mt-5">
                    <CButton
                      type="submit"
                      color="success"
                      className="flex-grow-1 mx-2 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <CSpinner size="sm" /> Saving...{" "}
                        </>
                      ) : id ? (
                        "update"
                      ) : (
                        "save"
                      )}
                    </CButton>
                    <CButton
                      type="reset"
                      color="danger"
                      className="flex-grow-1 mx-2 text-white"
                    >
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
  );
}
