import DashboardLayout from '@/layouts/DashboardLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import GetAllFunctions from '@/pages/GetAllFunctions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/function/')({
  component: () => (
    <DashboardLayout>
      <ProtectedRoute>
        <GetAllFunctions />
      </ProtectedRoute>
    </DashboardLayout>
  ),
})


