import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { loginUser, registerUser, logout } from '@/store/slices/authSlice';
import type { UserRole } from '@/types';

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: (email: string, password: string, role: UserRole) => dispatch(loginUser({ email, password, role })),
    register: (name: string, email: string, password: string, role: UserRole) => dispatch(registerUser({ name, email, password, role })),
    logout: () => dispatch(logout()),
  };
}
