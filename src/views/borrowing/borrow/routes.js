import React from 'react'

const AddBorrow = React.lazy(() => import('./create'))
const AllBorrow = React.lazy(() => import('./all'))
const TrashBorrow = React.lazy(() => import('./trash'))

const routes = [
  { path: '/borrowing/create', name: 'AddBorrow', element: AddBorrow },
  { path: '/borrowing/all', name: 'AllBorrow', element: AllBorrow },
  { path: '/borrowing/trash', name: 'TrashBorrow', element: TrashBorrow },
  { path: '/borrowing/:id/edit', name: 'TrashBorrow', element: AddBorrow },
  
]
export default routes
