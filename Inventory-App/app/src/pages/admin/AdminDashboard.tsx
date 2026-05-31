import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Store, Package, AlertTriangle, CheckCircle, Plus, Info } from 'lucide-react';
import { products, orders, lowStockAlerts, notifications, chartData } from '@/data/mockData';
import DashboardCard from '@/components/ui/DashboardCard';
import LineChartComponent from '@/components/charts/LineChart';
import DoughnutChartComponent from '@/components/charts/DoughnutChart';

export default function AdminDashboard() {
  const pendingVendors = 3;
  const pendingProducts = 5;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-[#111827] to-[#1F2937] rounded-xl p-6 border border-[#2D3748]">
        <h3 className="text-lg font-semibold text-[#F9FAFB] font-[Poppins]">Platform Overview</h3>
        <p className="text-sm text-[#9CA3AF] mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <DashboardCard icon={DollarSign} iconColor="text-[#22C55E]" iconBg="bg-[rgba(34,197,94,0.15)]" label="Total Revenue" value="$245K" change="+18.2%" changeType="up" index={0} />
        <DashboardCard icon={ShoppingCart} iconColor="text-[#3B82F6]" iconBg="bg-[rgba(59,130,246,0.15)]" label="Total Orders" value="3,420" change="+24.1%" changeType="up" index={1} />
        <DashboardCard icon={Store} iconColor="text-[#8B5CF6]" iconBg="bg-[rgba(139,92,246,0.15)]" label="Active Vendors" value="156" change="+5 new" changeType="neutral" index={2} />
        <DashboardCard icon={Package} iconColor="text-[#F59E0B]" iconBg="bg-[rgba(245,158,11,0.15)]" label="Total Products" value={`${products.length * 12}`} change="+312" changeType="up" index={3} />
        <DashboardCard icon={AlertTriangle} iconColor="text-[#EF4444]" iconBg="bg-[rgba(239,68,68,0.15)]" label="Low Stock" value={`${lowStockAlerts.length * 8}`} change="-5" changeType="down" index={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#111827] border border-[#2D3748] rounded-xl p-5">
          <h4 className="text-sm font-semibold text-[#F9FAFB] mb-4">Platform Revenue Trend</h4>
          <div className="h-64"><LineChartComponent labels={chartData.monthlySales.labels} data={chartData.monthlySales.data.map((v) => v * 10)} /></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-[#111827] border border-[#2D3748] rounded-xl p-5">
          <h4 className="text-sm font-semibold text-[#F9FAFB] mb-4">Orders by Status</h4>
          <div className="h-64"><DoughnutChartComponent labels={['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']} data={[18, 32, 45, 280, 12]} /></div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-[#111827] border border-[#2D3748] rounded-xl p-5">
          <h4 className="text-sm font-semibold text-[#F9FAFB] mb-4">Recent Orders</h4>
          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-[#1F2937] last:border-0">
                <div>
                  <p className="text-sm text-[#F9FAFB]">{order.orderNumber}</p>
                  <p className="text-xs text-[#9CA3AF]">{order.customer}</p>
                </div>
                <span className="text-sm font-medium text-[#F9FAFB]">${order.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-[#111827] border border-[#2D3748] rounded-xl p-5">
          <h4 className="text-sm font-semibold text-[#F9FAFB] mb-4">Pending Approvals</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#0B1220] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[rgba(245,158,11,0.15)] flex items-center justify-center"><Store className="w-4 h-4 text-[#F59E0B]" /></div>
                <span className="text-sm text-[#F9FAFB]">Vendor Approvals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[rgba(245,158,11,0.15)] text-[#F59E0B] text-xs font-bold rounded-full">{pendingVendors}</span>
                <button className="text-xs text-[#22C55E] hover:underline">Review</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0B1220] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[rgba(59,130,246,0.15)] flex items-center justify-center"><Package className="w-4 h-4 text-[#3B82F6]" /></div>
                <span className="text-sm text-[#F9FAFB]">Product Approvals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[rgba(59,130,246,0.15)] text-[#3B82F6] text-xs font-bold rounded-full">{pendingProducts}</span>
                <button className="text-xs text-[#22C55E] hover:underline">Review</button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-[#111827] border border-[#2D3748] rounded-xl p-5">
          <h4 className="text-sm font-semibold text-[#F9FAFB] mb-4">Activity Feed</h4>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((n) => {
              const icons: Record<string, { icon: typeof Plus; color: string }> = {
                order: { icon: Plus, color: '#3B82F6' },
                stock: { icon: AlertTriangle, color: '#F59E0B' },
                approval: { icon: CheckCircle, color: '#8B5CF6' },
                system: { icon: Info, color: '#6B7280' },
                success: { icon: CheckCircle, color: '#22C55E' },
              };
              const ic = icons[n.type] || icons.system;
              const Icon = ic.icon;
              return (
                <div key={n.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${ic.color}20` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: ic.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-[#F9FAFB] truncate">{n.title}</p>
                    <p className="text-xs text-[#9CA3AF]">{n.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
