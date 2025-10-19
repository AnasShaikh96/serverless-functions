import { createFileRoute } from '@tanstack/react-router'
import App from '../App'
import ProtectedRoute from '../components/ProtectedRoute'
import DashboardLayout from '../layouts/DashboardLayout'

export const Route = createFileRoute('/')({
  component: () => (
    <DashboardLayout>
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    </DashboardLayout>
  ),
})
