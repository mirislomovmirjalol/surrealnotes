import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotesPage from './pages/NotesPage'
import NotePage from './pages/NotePage'
import RootLayout from './layouts/RootLayout'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <NotesPage />,
      },
      {
        path: '/:ulid',
        element: <NotePage />,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
