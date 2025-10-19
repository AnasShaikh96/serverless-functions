import { createFileRoute } from '@tanstack/react-router'
import SignUp from '../pages/SignUp'
import AuthLayout from '../layouts/AuthLayout'

export const Route = createFileRoute('/sign-up')({
  component: () => (
      <SignUp />
  ),
})
