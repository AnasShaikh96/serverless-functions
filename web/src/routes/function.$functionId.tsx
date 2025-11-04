import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardLayout from '@/layouts/DashboardLayout';
import FunctionById from '@/pages/FunctionById'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/function/$functionId')({
  component: () => (
    <DashboardLayout>
      <ProtectedRoute>
        <FunctionById />
      </ProtectedRoute>
    </DashboardLayout>
  ),
})
