import { cilPencil, cilSpreadsheet, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCol, CContainer, CRow, CSpinner } from "@coreui/react";
// import moment from 'moment'
import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import SubHeader from "../../../components/custome/SubHeader";
// import { RowsPerPage } from 'src/constants/variables'

import SubHeader from "../../../components/custome/SubHeader";
import { DeleteModal } from "../../../helpers/DeleteModal";
import BasicProvider from "../../../constants/BasicProvider";
// import { handleSelectedRowChange, setSelectedRowForModule } from 'src/helpers/paginationCookie'
// import HelperFunction from '../../../helpers/HelperFunctions'
import { ShimmerTable } from "react-shimmer-effects";
// import CustomTooltip from 'src/components/custom/CustomTooltip'
// import noImage from 'src/assets/images/noImage.png'

import DateTimeHelper from "../../../helpers/DateTimeHepler";
import moment from "moment";
// const URL = process.env.REACT_APP_NODE_URL

var subHeaderItems = [
  {
    name: "All borrowing",
    link: "/borrowing/all",
    icon: cilSpreadsheet,
  },
  {
    name: "Create borrowing",
    link: "/borrowing/create",
    icon: cilPencil,
  },
  {
    name: "Trash borrowing",
    link: "/borrowing/trash",
    icon: cilTrash,
  },
];

export default function Customers() {
  const navigate = useNavigate();
  const [rowPerPage, setRowPerPage] = useState(10);
  const location = useLocation();

  const [userId, setuserId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [visible, setVisible] = useState(false);
  const [searchcurrentPage, setSearchCurrentPage] = useState(null);
  const query = new URLSearchParams(location.search);
  var count = query.get("count") || rowPerPage;
  var currentPage = parseInt(query.get("page") || 1);
  var search = query.get("search") || "";
  let [defaultPage, setDefaultPage] = useState(currentPage);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data?.borrowing);
  const toggleCleared = useSelector((state) => state.toggleCleared);
  const totalCount = useSelector((state) => state.totalCount);

  const updatePageQueryParam = (paramName, page) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(paramName, page);
    navigate({ search: searchParams.toString() });
  };

  // console.log("data=========>", data);

  useEffect(() => {
    if (rowPerPage) {
      fetchData();
    }
  }, [currentPage, rowPerPage, searchcurrentPage, search]);

  const fetchData = async () => {
    try {
      // setDefaultPage(currentPage)
      let performSearch = false;
      var queryData = {};
      for (const [key, value] of query.entries()) {
        if (key !== "page" && key !== "count") {
          queryData[key] = value;
          if (value !== "" && value !== null) {
            performSearch = true;
          }
        }
      }
      var response;
      // console.log(performSearch);
      if (performSearch) {
        queryData["page"] = currentPage;
        queryData["count"] = count;
        // response = await new BasicProvider(`
        //   customers/onlycustomer?${HelperFunction.convertToQueryString(
        //     queryData
        //   )}`).getRequest();
        // console.log(response);
      } else {
        response = await new BasicProvider(
          `borrowing?page=${currentPage}&count=${count}`,
          dispatch
        ).getRequest();
      }
      console.log("response", response);

      dispatch({ type: "set", data: { borrowing: response?.data?.data } });
      dispatch({ type: "set", totalCount: response.data.total });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSelectedRows = async () => {
      const savedSelectedRows = 10; //await handleSelectedRowChange('customers')
      if (savedSelectedRows && !count) {
        setRowPerPage(savedSelectedRows);
      } else {
        setRowPerPage(count);
      }
    };
    fetchSelectedRows();
  }, [count]);

  const handleRowChange = useCallback((state) => {
    const rows = state.selectedRows;
    const rowsId = rows.map((item) => item._id);
    dispatch({ type: "set", selectedrows: rowsId });
  }, []);

  const handleFilter = async (search) => {
    try {
      const searchParams = new URLSearchParams(location.search);
      if (search) searchParams.set("search", search);
      navigate({ search: searchParams.toString() });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterReset = async () => {
    setSearchCurrentPage(1);
    currentPage = 1;
    setDefaultPage(1);
    navigate({ search: "" });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div
          className="pointer_cursor data_Table_title d-flex py-1"

          // onClick={() => navigate(/customers/${row._id}/info)}
        >
          <div>
            <div className="product_name">
              {row?.first_name} {row?.last_name}
            </div>
            {/* <div className="product_slug"> /{row.slug}</div> */}
          </div>
        </div>
      ),
      // width: "20%",
    },

    {
      name: "Mobile",
      selector: (row) => <div className="data_table_colum">{row.mobile}</div>,
    },
    {
      name: "Work Date",
      selector: (row) => (
        <div className="data_table_colum">
          {DateTimeHelper.formatDate(row.work_date)}
        </div>
      ),
    },
    {
      name: "Price",
      selector: (row) => (
        <div className="data_table_colum">
          {row.price}
          {process.env.REACT_APP_CURRENCY}
        </div>
      ),
    },
    {
      name: "Create At",
      selector: (row) => (
        <div className="data_table_colum">
          {moment(row?.create_at).fromNow()}
        </div>
      ),
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="action-btn d-flex gap-3">
          <div className="edit-btn">
            <CIcon
              className="pointer_cursor"
              icon={cilPencil}
              onClick={() => navigate(`/borrowing/${row._id}/edit`)}
            />
          </div>

          <div className="delet-btn">
            <CIcon
              className="pointer_cursor"
              icon={cilTrash}
              onClick={() => {
                setVisible(true);
                setuserId([row._id]);
              }}
            />
          </div>
        </div>
      ),
      ignoreRowClick: true,
      allowoverflow: true,
      button: "true",
    },
  ];

  const [selectedRowsPerModule, setSelectedRowsPerModule] = useState({});

  // Function to set selected rows for a specific module
  const setSelectedRowForModule = (moduleName, selectedRows) => {
    setSelectedRowsPerModule((prevState) => ({
      ...prevState,
      [moduleName]: selectedRows, // Save selected rows for the module
    }));

    console.log(`Selected rows for ${moduleName}:`, selectedRows);
  };
  return (
    <>
      <SubHeader
        subHeaderItems={subHeaderItems}
        handleFilter={(search) => handleFilter(search)}
        setSearchCurrentPage={setSearchCurrentPage}
        onReset={() => handleFilterReset()}
        searchInput={search}
        rowPerPage={rowPerPage}
        defaultPage={defaultPage}
        moduleName="borrowing"
        deletionType="trash"
      />

      <CContainer fluid>
        {isLoading ? (
          <div className="custom-table-shimmer">
            <CRow className="justify-content-center">
              <CCol xs="12">
                {/* CoreUI Shimmer/Spinner */}
                <CSpinner color="primary" size="lg" />
                {/* You can add custom shimmer animation below */}
                <div className="shimmer-loader">
                  <div className="shimmer-row shimmer-row-header"></div>
                  {[...Array(10)].map((_, index) => (
                    <div
                      key={index}
                      className="shimmer-row shimmer-row-body"
                    ></div>
                  ))}
                </div>
              </CCol>
            </CRow>
          </div>
        ) : (
          <div className="datatable">
            <DataTable
              responsive="true"
              columns={columns}
              data={data}
              paginationServer
              paginationTotalRows={totalCount}
              paginationDefaultPage={defaultPage}
              onChangePage={(page) => {
                currentPage = page;
                setDefaultPage(parseInt(page));
                updatePageQueryParam("page", currentPage);
              }}
              pagination
              selectableRows
              selectableRowsHighlight
              highlightOnHover
              paginationPerPage={rowPerPage}
              onChangeRowsPerPage={(value) => {
                count = value;
                setRowPerPage(value);
                updatePageQueryParam("count", value);
                setSelectedRowForModule("borrowing", value);
              }}
              onSelectedRowsChange={(state) => handleRowChange(state)}
              clearSelectedRows={toggleCleared}
            />
          </div>
        )}

        <DeleteModal
          visible={visible}
          userId={userId}
          moduleName="borrowing"
          currentPage={currentPage}
          rowPerPage={rowPerPage}
          setVisible={setVisible}
          deletionType="trash"
          handleClose={() => setVisible(false)}
        />
      </CContainer>
    </>
  );
}
