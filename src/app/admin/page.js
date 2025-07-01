"use client";
import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Eye,
  Filter,
  Calendar,
  BarChart3,
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

const stats = [
  { 
    label: "Total Revenue", 
    value: "$58,400", 
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "bg-green-500"
  },
  { 
    label: "Total Orders", 
    value: "1,240", 
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "bg-blue-500"
  },
  { 
    label: "Total Customers", 
    value: "890", 
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "bg-purple-500"
  },
  { 
    label: "Products", 
    value: "320", 
    change: "-2.1%",
    trend: "down",
    icon: Package,
    color: "bg-orange-500"
  },
];

const recentOrders = [
  { id: 101, customer: "John Doe", email: "john@example.com", total: "$120", status: "Shipped", date: "2024-01-15" },
  { id: 102, customer: "Jane Smith", email: "jane@example.com", total: "$80", status: "Pending", date: "2024-01-14" },
  { id: 103, customer: "Mike Brown", email: "mike@example.com", total: "$200", status: "Delivered", date: "2024-01-13" },
  { id: 104, customer: "Sarah Wilson", email: "sarah@example.com", total: "$150", status: "Processing", date: "2024-01-12" },
  { id: 105, customer: "Tom Davis", email: "tom@example.com", total: "$90", status: "Shipped", date: "2024-01-11" },
];

const topProducts = [
  { name: "Wireless Headphones", sales: 245, revenue: "$12,250", percentage: 28.5, growth: "+15%" },
  { name: "Smart Watch", sales: 189, revenue: "$9,450", percentage: 22.1, growth: "+8%" },
  { name: "Laptop Stand", sales: 156, revenue: "$7,800", percentage: 18.2, growth: "+12%" },
  { name: "USB-C Cable", sales: 134, revenue: "$2,680", percentage: 15.6, growth: "-3%" },
  { name: "Phone Case", sales: 98, revenue: "$1,960", percentage: 11.4, growth: "+5%" },
  { name: "Bluetooth Speaker", sales: 67, revenue: "$3,350", percentage: 7.8, growth: "+22%" },
];

const salesData = [
  { month: "Jan", sales: 4200, orders: 120 },
  { month: "Feb", sales: 5100, orders: 150 },
  { month: "Mar", sales: 4800, orders: 140 },
  { month: "Apr", sales: 6200, orders: 180 },
  { month: "May", sales: 7500, orders: 220 },
  { month: "Jun", sales: 8100, orders: 240 },
];



export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [orderFilter, setOrderFilter] = useState("all");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orderFilter === "all" 
    ? recentOrders 
    : recentOrders.filter(order => order.status.toLowerCase() === orderFilter);

  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Original Dashboard Header - Updated */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-sm text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {salesData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${(data.sales / 8500) * 200}px` }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-600 font-medium">{data.month}</div>
                  <div className="text-xs text-gray-500">${(data.sales / 1000).toFixed(1)}k</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Products</h2>
            <div className="space-y-4">
              {topProducts.slice(0, 5).map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${product.percentage}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-600">{product.percentage}%</span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                    <p className={`text-xs font-medium ${
                      product.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <div className="mt-4 sm:mt-0 flex items-center gap-3">
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="processing">Processing</option>
                </select>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">#{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{order.total}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}