import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, AlertTriangle } from 'lucide-react';
import { products, orders, chartData } from '@/data/mockData';
import DashboardCard from '@/components/ui/DashboardCard';
import LineChartComponent from '@/components/charts/LineChart';
import DoughnutChartComponent from '@/components/charts/DoughnutChart';

export default function VendorDashboard() {
  const lowStockCount = products.filter((p) => p.stock <= (p.lowStockThreshold || 10)).length;

  const recentOrders = orders.slice(0, 5);
  const topProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-[#111827] to-[#1F2937] rounded-xl p-6 border border-[#2D3748]">
        <h3 className="text-lg font-semibold text-[#F9FAFB] font-[Poppins]">Welcome back, Vendor!</h3>
        <p className="text-sm text-[#9CA3AF] mt-1">Here's what's happening with your store today.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={DollarSign} iconColor="text-[#22C55E]" iconBg="bg-[rgba(34,197,94,0.15)]" label="Total Revenue" value="$12,450" change="+12.5%" changeType="up" index={0} />
        <DashboardCard icon={ShoppingCart} iconColor="text-[#3B82F6]" iconBg="bg-[rgba(59,130,246,0.15)]" label="Total Orders" value="156" change="+8.2%" changeType="up" index={1} />
        <DashboardCard icon={Package} iconColor="text-[#F59E0B]" iconBg="bg-[rgba(245,158,11,0.15)]" label="Products" value={`${products.length}`} change="+3 new" changeType="neutral" index={2} />
        <DashboardCard icon={AlertTriangle} iconColor="text-[#EF4444]" iconBg="bg-[rgba(239,68,68,0.15)]" label="Low Stock" value={`${lowStockCount} items`} change="-2" changeType="down" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#111827] border border-[#2D3748] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-[#F9FAFB]">Sales Trend</h4>
            <div className="flex gap-1">
              {['7D', '30D', '90D'].map((p) => <button key={p} className={`px-2.5 py-1 text-xs rounded-md ${p === '30D' ? 'bg-[#22C55E] text-white' : 'text-[#9CA3AF] hover:bg-[#1F2937]'}`}>{p}</button>)}
            </div>
          </div>
          <div className="h-64">
            <LineChartComponent labels={chartData.salesTrend.labels} data={chartData.salesTrend.data} previous={chartData.salesTrend.previous} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#111827] border border-[#2D3748] rounded-xl p-5">
          <h4 className="text-sm font-semibold text-[#F9FAFB] mb-4">Revenue Breakdown</h4>
          <div className="h-64">
            <DoughnutChartComponent labels={chartData.revenueByCategory.labels} data={chartData.revenueByCategory.data} centerText="$12.4K" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-[#111827] border border-[#2D3748] rounded-xl p-5">
          <h4 className="text-sm font-semibold text-[#F9FAFB] mb-4">Recent Orders</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#9CA3AF] text-xs uppercase tracking-wider border-b border-[#1F2937]">
                  <th className="text-left py-3 px-2">Order</th>
                  <th className="text-left py-3 px-2">Customer</th>
                  <th className="text-left py-3 px-2">Total</th>
                  <th className="text-left py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#1F2937] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="py-3 px-2 text-[#F9FAFB]">#{order.orderNumber}</td>
                    <td className="py-3 px-2 text-[#9CA3AF]">{order.customer}</td>
                    <td className="py-3 px-2 text-[#F9FAFB]">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-[rgba(34,197,94,0.15)] text-[#22C55E]' : order.status === 'processing' ? 'bg-[rgba(245,158,11,0.15)] text-[#F59E0B]' : 'bg-[rgba(59,130,246,0.15)] text-[#3B82F6]'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-[#111827] border border-[#2D3748] rounded-xl p-5">
          <h4 className="text-sm font-semibold text-[#F9FAFB] mb-4">Top Products</h4>
          <div className="space-y-3">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#F9FAFB] truncate">{product.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{product.reviewCount} reviews</p>
                </div>
                <span className="text-sm font-medium text-[#22C55E]">${product.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
