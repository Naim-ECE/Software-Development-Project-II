import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, Sun, Moon, User, LogOut, Settings, Package } from 'lucide-react';
import type { RootState } from '@/store';
import { useAuth } from '@/hooks/useAuth';
import { toggleTheme } from '@/store/slices/themeSlice';
import { useDispatch } from 'react-redux';
import { notifications } from '@/data/mockData';

interface TopBarProps {
  title: string;
  onMenuClick: () => void;
}

export default function TopBar({ title, onMenuClick }: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getDashboardLink = () => {
    if (!user) return '/';
    const links: Record<string, string> = {
      vendor: '/vendor/dashboard',
      inventory_manager: '/inventory/dashboard',
      admin: '/admin/dashboard',
    };
    return links[user.role] || '/profile';
  };

  return (
    <header className="h-16 bg-[#0B1220] border-b border-[#1F2937] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-[#1F2937] text-[#9CA3AF] transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-[#F9FAFB] font-[Poppins]">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center bg-[#111827] border border-[#2D3748] rounded-xl px-4 py-2 gap-2 w-64 focus-within:border-[#22C55E] transition-colors">
          <Search className="w-4 h-4 text-[#6B7280]" />
          <input type="text" placeholder="Search..." className="bg-transparent text-sm text-[#F9FAFB] placeholder-[#6B7280] outline-none w-full" />
        </div>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-lg hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-lg hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>
            )}
          </button>
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-12 w-80 bg-[#1F2937] rounded-xl shadow-2xl border border-[#2D3748] z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#2D3748]">
                  <h3 className="text-sm font-semibold text-[#F9FAFB]">Notifications</h3>
                  <button className="text-xs text-[#22C55E] hover:underline">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`px-4 py-3 border-b border-[#2D3748] hover:bg-[rgba(255,255,255,0.05)] cursor-pointer ${!n.read ? 'border-l-[3px] border-l-[#22C55E]' : ''}`}>
                      <p className="text-sm text-[#F9FAFB] font-medium">{n.title}</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{n.message}</p>
                      <p className="text-[10px] text-[#6B7280] mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#1F2937] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-sm font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </button>
          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-12 w-56 bg-[#1F2937] rounded-xl shadow-2xl border border-[#2D3748] py-2 z-50">
                <div className="px-4 py-2 border-b border-[#2D3748]">
                  <p className="text-sm font-medium text-[#F9FAFB]">{user?.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{user?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-[rgba(34,197,94,0.15)] text-[#22C55E] text-[10px] font-medium rounded-full uppercase">{user?.role}</span>
                </div>
                <button onClick={() => { setProfileOpen(false); navigate(getDashboardLink()); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[#9CA3AF] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#F9FAFB]">
                  <Package className="w-4 h-4" /> Dashboard
                </button>
                <button onClick={() => { setProfileOpen(false); navigate('/profile'); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[#9CA3AF] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#F9FAFB]">
                  <User className="w-4 h-4" /> Profile
                </button>
                <button onClick={() => { setProfileOpen(false); navigate('/vendor/settings'); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[#9CA3AF] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#F9FAFB]">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <div className="border-t border-[#2D3748] mt-1">
                  <button onClick={() => { logout(); setProfileOpen(false); navigate('/'); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[#EF4444] hover:bg-[rgba(255,255,255,0.05)]">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
