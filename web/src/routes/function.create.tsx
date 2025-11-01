import CreateFunction from '@/pages/CreateFunction'
import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from '@/layouts/DashboardLayout'
import ProtectedRoute from '@/components/ProtectedRoute'


export const Route = createFileRoute('/function/create')({
  component:
    () => (
      <DashboardLayout>
        <ProtectedRoute>
          <CreateFunction />
        </ProtectedRoute>
      </DashboardLayout>
    ),
})

// function RouteComponent() {
//   return <div>Hello "/function/create"!</div>
// }
