import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    const roleRedirects: Record<UserRole, string> = {
      customer: '/shop',
      vendor: '/vendor/dashboard',
      inventory_manager: '/inventory/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={roleRedirects[user.role]} replace />;
  }

  return <Outlet />;
}
