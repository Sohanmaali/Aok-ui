import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CHeader,
  CRow,
} from '@coreui/react'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
// import { DeleteModal } from 'src/helpers/deleteModalHelper'
// import { CContainer } from '@coreui/react'

function SubHeader(props) {
  const location = useLocation()

  const {
    searchInput,
    onReset,
    handleFilter,
    moduleName,
    deletionType,
    subHeaderItems,
    setSearchCurrentPage,
    rowPerPage,
    defaultPage,
    isHideAddButton,
    isDirectDelete,
  } = props

  const [activeLink, setActiveLink] = useState('')

  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState(searchInput || '')
  const selectedRow = useSelector((state) => state.selectedrows)

  const dispatch = useDispatch()
  const toggleCleared = useSelector((state) => state.toggleCleared)
  const navigate = useNavigate()
  //// active current page when page render

  useEffect(() => {
    if (subHeaderItems != null && subHeaderItems.length > 0) {
      dispatch({ type: 'set', selectedrows: [] })
      const currentLink = location.pathname
      const activeItem = props.subHeaderItems.find((item) => item.link === currentLink)
      setActiveLink(activeItem ? activeItem.name : props.subHeaderItems[0].name)
    }
    setSearch(searchInput)
  }, [location])

  const indexofCreate = subHeaderItems?.find((item) => item.link.includes('create'))
  const handleItemClick = (item, index) => {
    navigate(item.link)
  }

  const handleAddNew = () => {
    if (indexofCreate != undefined) {
      navigate(indexofCreate.link)
    }
  }

  return (
    <>
      <div className=" mb-4 bg-white max-w-screen-xl ">
        <CRow xs={{ cols: 1 }} lg={{ cols: 2 }} className=" w-100 ">
          <CCol className="d-flex align-items-center">
            <div className="my-3 d-flex align-items-center justify-center ms-3">
              {props.subHeaderItems && (
                <div>
                  <CDropdown>
                    <CDropdownToggle
                      id="cdropdown-toggle"
                      className="dropdownmenu btn"
                    >
                      {activeLink}
                    </CDropdownToggle>
                    <CDropdownMenu>
                      {props.subHeaderItems.map((item, index) => (
                        <CDropdownItem
                          key={index}
                          className=" btn"
                          onClick={() => {
                            handleItemClick(item, index)
                          }}
                        >
                          <CIcon icon={item.icon} className="mx-2 " />
                          {item.name}
                        </CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                  {!props.isHideAddButton && <span className="border-left"></span>}
                  {/* <span className="border-left"></span> */}
                </div>
              )}

              {Array.isArray(selectedRow) && selectedRow.length > 0 ? (
                <>
                  <span className="selected_row">{selectedRow.length} selected:</span>
                  {console.log('SELECTEDS ROW', selectedRow)}

                  <CButton
                    className="delete_btn ml-3"
                    onClick={() => {
                      setVisible(true)
                    }}
                  >
                    Delete Selected
                  </CButton>
                </>
              ) : (
                <>
                  {
                    <CButton className="btn btn-success" onClick={handleAddNew}>
                      Add New
                    </CButton>
                  }
                </>
              )}
            </div>
          </CCol>
          {handleFilter && (
            <CCol className="d-flex justify-content-end align-items-center">
              <div className="text-end  position-relative d-flex align-items-center ">
                {/* <CIcon icon={cilSearch} className="me-2" /> */}
                <CFormInput
                  className=""
                  placeholder="Search......"
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div className="d-flex ms-3">
                <CButton
                  className="btn btn-success"
                  onClick={() => {
                    setSearchCurrentPage(search)
                    handleFilter(search)
                  }}
                >
                  Search
                </CButton>
                <CButton
                  className="btn btn-danger ms-2"
                  onClick={() => {
                    onReset()
                    setSearch('')
                  }}
                >
                  Reset
                </CButton>
              </div>
            </CCol>
          )}
        </CRow>

        {/* <DeleteModal
          visible={visible}
          setVisible={setVisible}
          userId={selectedRow}
          deletionType={deletionType}
          handleClose={() => setVisible(false)}
          moduleName={moduleName}
          currentPage={defaultPage}
          rowPerPage={rowPerPage}
          isDirectDelete={isDirectDelete}
        /> */}
      </div>
    </>
  )
}
export default SubHeader
