'use client'

import Providers from '../../providers'
import AdminLayoutComponent from '../../../src/layouts/AdminLayout'
import ProtectedRoute from '../../../src/components/ProtectedRoute'

export default function AdminTemplate({ children }) {
  return (
    <Providers>
      <ProtectedRoute>
        <AdminLayoutComponent>
          {children}
        </AdminLayoutComponent>
      </ProtectedRoute>
    </Providers>
  )
}
