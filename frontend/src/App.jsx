import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Grid3x3, 
  Settings, 
  LogOut, 
  User, 
  Mail, 
  Lock,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  X,
  Edit2,
  Trash2,
  Calendar,
  DollarSign,
  FileText,
  Baby,
  Car,
  Zap,
  ShoppingCart,
  Heart,
  GraduationCap,
  Coffee,
  Briefcase,
  Shield,
  BarChart3,
  ChevronDown,
  Building
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const API_BASE = 'http://localhost:5000/api';

// Predefined categories with icons and colors
const PREDEFINED_CATEGORIES = [
  { name: 'Food', icon: Coffee, color: 'bg-red-100 text-red-600' },
  { name: 'Transport', icon: Car, color: 'bg-blue-100 text-blue-600' },
  { name: 'Shopping', icon: ShoppingCart, color: 'bg-purple-100 text-purple-600' },
  { name: 'Entertainment', icon: FileText, color: 'bg-pink-100 text-pink-600' },
  { name: 'Health', icon: Heart, color: 'bg-green-100 text-green-600' },
  { name: 'Education', icon: GraduationCap, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Bills', icon: Zap, color: 'bg-orange-100 text-orange-600' },
  { name: 'Home', icon: Building, color: 'bg-indigo-100 text-indigo-600' },
  { name: 'Baby', icon: Baby, color: 'bg-pink-200 text-pink-700' },
  { name: 'Insurance', icon: Shield, color: 'bg-cyan-100 text-cyan-600' }
];

// Hero Section Component (moved outside App)
const HeroSection = ({ onGetStarted }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Track Your Expenses<br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Take Control of Your Finances
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Easily record and categorize your daily spending. Get insights with beautiful charts and reports.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGetStarted}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
        >
          Get Started Free
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <img 
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop" 
          alt="Expense tracking" 
          className="w-full h-64 md:h-96 object-cover"
        />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {[
          { icon: BarChart3, title: 'Visual Insights', desc: 'Beautiful charts showing your spending patterns' },
          { icon: Grid3x3, title: 'Easy Categories', desc: 'Organize expenses with customizable categories' },
          { icon: Shield, title: 'Secure & Private', desc: 'Your financial data is encrypted and safe' }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
          >
            <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// Auth Component (moved outside App)
const AuthView = ({ 
  authMode, 
  setAuthMode, 
  authForm, 
  setAuthForm, 
  onSubmit, 
  loading, 
  onBackToHero 
}) => {
  const handleInputChange = (field, value) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={authForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={authMode === 'register'}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={authForm.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Please wait...' : authMode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            className="text-blue-600 font-semibold hover:underline"
          >
            {authMode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>

        <button
          onClick={onBackToHero}
          className="mt-4 text-gray-500 hover:text-gray-700 text-sm w-full"
        >
          ← Back to Home
        </button>
      </motion.div>
    </div>
  );
};

// Custom Category Modal
const CustomCategoryModal = ({ show, onClose, categoryName, setCategoryName, onSubmit }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Create Custom Category</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="e.g., Gaming, Pets, Charity"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                autoFocus
              />
            </div>

            <p className="text-sm text-gray-500">A random color will be assigned to your category</p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!categoryName.trim()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                Create Category
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Income Modal
const IncomeModal = ({ show, onClose, incomeValue, setIncomeValue, onSubmit }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Set Monthly Income</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
              <input
                type="number"
                step="0.01"
                value={incomeValue}
                onChange={(e) => setIncomeValue(e.target.value)}
                placeholder="Enter your monthly income"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                autoFocus
              />
            </div>

            <p className="text-sm text-gray-500">This will be used to calculate your monthly savings</p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!incomeValue || parseFloat(incomeValue) <= 0}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                Save Income
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Home Dashboard Component (moved outside App)
const HomeView = ({ 
  user, 
  expenses,
  userIncome,
  onEditExpense, 
  onDeleteExpense, 
  onGoToCategories,
  onSetIncome
}) => {
  const getTotalExpenses = () => {
    return expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  };

  const getMonthlyData = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = expenses.filter(exp => {
      const date = new Date(exp.expense_date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    
    return {
      expenses: monthlyExpenses,
      savings: userIncome - monthlyExpenses
    };
  };

  const getChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      let month = currentMonth - i;
      let year = currentYear;
      
      if (month < 0) {
        month += 12;
        year -= 1;
      }
      
      const monthExpenses = expenses.filter(exp => {
        const date = new Date(exp.expense_date);
        return date.getMonth() === month && date.getFullYear() === year;
      }).reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      
      last6Months.push({
        name: months[month],
        expenses: monthExpenses,
        savings: userIncome - monthExpenses,
        income: userIncome
      });
    }
    
    return last6Months;
  };

  const total = getTotalExpenses();
  const monthlyData = getMonthlyData();
  const chartData = getChartData();

  return (
    <div className="p-4 md:p-8 pb-24 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.email}!</p>
          </div>
          <button
            onClick={onSetIncome}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Set Monthly Income
          </button>
        </div>
        {userIncome > 0 && (
          <div className="mt-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 p-4 rounded-xl">
            <p className="text-sm text-green-700 font-medium">Monthly Income</p>
            <p className="text-3xl font-bold text-green-800">₹{userIncome.toFixed(2)}</p>
          </div>
        )}
      </motion.div>

      {expenses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <PiggyBank className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Expenses Yet</h2>
          <p className="text-gray-500 mb-6">Start tracking by adding your first expense</p>
          <button
            onClick={onGoToCategories}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Go to Categories
          </button>
        </motion.div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg"
            >
              <TrendingDown className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-sm opacity-80">This Month Expenses</p>
              <p className="text-3xl font-bold">₹{monthlyData.expenses.toFixed(2)}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg"
            >
              <PiggyBank className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-sm opacity-80">This Month Savings</p>
              <p className="text-3xl font-bold">₹{monthlyData.savings.toFixed(2)}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
            >
              <BarChart3 className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-sm opacity-80">Total Transactions</p>
              <p className="text-3xl font-bold">{expenses.length}</p>
            </motion.div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Monthly Overview (Last 6 Months)</h2>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expenses" fill="#3B82F6" name="Expenses" radius={[8, 8, 0, 0]} />
                <Bar dataKey="savings" fill="#10B981" name="Savings" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {expenses.slice(0, 10).map((expense) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{expense.title}</p>
                      <p className="text-sm text-gray-500">{expense.category} • {new Date(expense.expense_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">₹{parseFloat(expense.amount).toFixed(2)}</span>
                    <button
                      onClick={() => onEditExpense(expense)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Categories View Component (moved outside App)
const CategoriesView = ({ categories, userIncome, onCategoryClick, onAddCustomCategory }) => (
  <div className="p-4 md:p-8 pb-24 md:pb-8">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600">Manage your expense categories</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddCustomCategory}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden md:inline">Custom Category</span>
      </motion.button>
    </div>

    {userIncome > 0 && (
      <div className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 p-4 rounded-xl">
        <p className="text-sm text-green-700 font-medium">Monthly Income</p>
        <p className="text-3xl font-bold text-green-800">₹{userIncome.toFixed(2)}</p>
      </div>
    )}

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category, index) => {
        const Icon = category.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onCategoryClick(category.name)}
            className={`${category.color} p-6 rounded-2xl cursor-pointer shadow-md hover:shadow-lg transition relative`}
          >
            <Icon className="w-8 h-8 mb-3" />
            <p className="font-semibold text-lg mb-1">{category.name}</p>
            <p className="text-2xl font-bold">₹{category.total.toFixed(2)}</p>
            {category.total > 0 && (
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  </div>
);

// Settings View Component (moved outside App)
const SettingsView = ({ user, expenses, userIncome, onLogout, onDeleteAllExpenses }) => {
  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  
  return (
    <div className="p-4 md:p-8 pb-24 md:pb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="space-y-4 max-w-2xl">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Email</span>
              </div>
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Password</span>
              </div>
              <span className="font-medium">••••••••</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Name</span>
              </div>
              <span className="font-medium">{user?.email?.split('@')[0]}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Monthly Income</span>
              </div>
              <span className="font-medium text-green-600">₹{userIncome.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <span className="text-gray-700">Total Expenses</span>
              </div>
              <span className="font-medium text-red-600">₹{totalExpenses.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
          <div className="space-y-3">
            <button 
              onClick={onDeleteAllExpenses}
              className="w-full text-left p-3 hover:bg-red-50 rounded-lg transition text-red-600 font-medium border-2 border-red-200"
            >
              🗑️ Delete All Expenses
            </button>
            <p className="text-sm text-gray-500">This action cannot be undone. All your expense data will be permanently deleted.</p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full bg-red-600 text-white p-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>
      </div>
    </div>
  );
};

// Transaction Modal Component (moved outside App)
const TransactionModal = ({ 
  show, 
  onClose, 
  editingExpense, 
  transactionForm, 
  setTransactionForm, 
  onSubmit, 
  loading,
  allCategories
}) => {
  const handleInputChange = (field, value) => {
    setTransactionForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingExpense ? 'Edit Expense' : 'Add Expense'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={transactionForm.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Grocery shopping"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={transactionForm.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={transactionForm.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {allCategories && allCategories.length > 0 ? (
                    allCategories.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))
                  ) : (
                    PREDEFINED_CATEGORIES.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={transactionForm.expense_date}
                  onChange={(e) => handleInputChange('expense_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingExpense ? 'Update' : 'Add Expense'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Navigation Component (moved outside App)
const Navigation = ({ currentView, setCurrentView, onLogout }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Categories', icon: Grid3x3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Expense Tracker
              </span>
            </div>

            <div className="flex gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
                    currentView === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </motion.button>
              ))}
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition ${
                currentView === item.id ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('hero');
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState('monthly');

  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [transactionForm, setTransactionForm] = useState({
    title: '',
    amount: '',
    category: '',
    expense_date: new Date().toISOString().split('T')[0]
  });

  const [showCustomCategoryModal, setShowCustomCategoryModal] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [userIncome, setUserIncome] = useState(0);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [incomeInput, setIncomeInput] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedIncome = localStorage.getItem('userIncome');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setUserIncome(parseFloat(savedIncome) || 0);
      fetchExpenses(savedToken);
      setCurrentView('home');
    }
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      calculateCategories();
    }
  }, [expenses]);

  const fetchExpenses = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE}/expenses`, {
        headers: {
          'Authorization': `Bearer ${authToken || token}`
        }
      });
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const calculateCategories = () => {
    const categoryTotals = {};
    
    expenses.forEach(expense => {
      const cat = expense.category || 'Uncategorized';
      if (!categoryTotals[cat]) {
        categoryTotals[cat] = 0;
      }
      categoryTotals[cat] += parseFloat(expense.amount);
    });

    const categoriesData = PREDEFINED_CATEGORIES.map(predefCat => ({
      ...predefCat,
      total: categoryTotals[predefCat.name] || 0
    }));

    Object.keys(categoryTotals).forEach(catName => {
      if (!PREDEFINED_CATEGORIES.find(pc => pc.name === catName)) {
        categoriesData.push({
          name: catName,
          icon: Briefcase,
          color: 'bg-gray-100 text-gray-600',
          total: categoryTotals[catName]
        });
      }
    });

    setCategories(categoriesData);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register';
      const body = authMode === 'login' 
        ? { email: authForm.email, password: authForm.password }
        : authForm;

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        if (authMode === 'login') {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          await fetchExpenses(data.token);
          setCurrentView('home');
        } else {
          setAuthMode('login');
          alert('Registration successful! Please login.');
        }
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingExpense ? 'PUT' : 'POST';
      const url = editingExpense 
        ? `${API_BASE}/expenses/${editingExpense.id}`
        : `${API_BASE}/expenses`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(transactionForm)
      });

      if (response.ok) {
        await fetchExpenses();
        setShowTransactionModal(false);
        setEditingExpense(null);
        setTransactionForm({
          title: '',
          amount: '',
          category: '',
          expense_date: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
      const response = await fetch(`${API_BASE}/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchExpenses();
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setExpenses([]);
    setCategories([]);
    setUserIncome(0);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userIncome');
    setCurrentView('hero');
  };

  const handleAddCustomCategory = () => {
    if (!customCategoryName.trim()) return;
    
    const colors = [
      'bg-red-100 text-red-600',
      'bg-blue-100 text-blue-600',
      'bg-purple-100 text-purple-600',
      'bg-pink-100 text-pink-600',
      'bg-green-100 text-green-600',
      'bg-yellow-100 text-yellow-600',
      'bg-orange-100 text-orange-600',
      'bg-indigo-100 text-indigo-600',
      'bg-cyan-100 text-cyan-600',
      'bg-teal-100 text-teal-600'
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newCategory = {
      name: customCategoryName,
      icon: Briefcase,
      color: randomColor,
      total: 0
    };
    
    setCategories(prev => [...prev, newCategory]);
    setCustomCategoryName('');
    setShowCustomCategoryModal(false);
  };

  const handleSaveIncome = () => {
    const income = parseFloat(incomeInput);
    if (!isNaN(income) && income >= 0) {
      setUserIncome(income);
      localStorage.setItem('userIncome', income.toString());
      setShowIncomeModal(false);
      setIncomeInput('');
    }
  };

  const handleDeleteAllExpenses = async () => {
    if (!confirm('Are you sure you want to delete ALL expenses? This action cannot be undone.')) return;
    
    try {
      const expenseIds = expenses.map(exp => exp.id);
      await Promise.all(expenseIds.map(id => 
        fetch(`${API_BASE}/expenses/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ));
      await fetchExpenses();
      alert('All expenses deleted successfully!');
    } catch (error) {
      console.error('Error deleting expenses:', error);
      alert('Failed to delete expenses');
    }
  };

  const handleCategoryClick = (categoryName) => {
    setTransactionForm({ 
      ...transactionForm, 
      category: categoryName 
    });
    setShowTransactionModal(true);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setTransactionForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      expense_date: expense.expense_date.split('T')[0]
    });
    setShowTransactionModal(true);
  };

  const handleCloseModal = () => {
    setShowTransactionModal(false);
    setEditingExpense(null);
    setTransactionForm({
      title: '',
      amount: '',
      category: '',
      expense_date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'hero' && (
        <HeroSection onGetStarted={() => setCurrentView('auth')} />
      )}
      
      {currentView === 'auth' && (
        <AuthView
          authMode={authMode}
          setAuthMode={setAuthMode}
          authForm={authForm}
          setAuthForm={setAuthForm}
          onSubmit={handleAuth}
          loading={loading}
          onBackToHero={() => setCurrentView('hero')}
        />
      )}
      
      {user && currentView !== 'hero' && currentView !== 'auth' && (
        <>
          <Navigation
            currentView={currentView}
            setCurrentView={setCurrentView}
            onLogout={handleLogout}
          />
          <div className="max-w-7xl mx-auto">
            {currentView === 'home' && (
              <HomeView
                user={user}
                expenses={expenses}
                userIncome={userIncome}
                onEditExpense={handleEditExpense}
                onDeleteExpense={handleDeleteExpense}
                onGoToCategories={() => setCurrentView('categories')}
                onSetIncome={() => setShowIncomeModal(true)}
              />
            )}
            {currentView === 'categories' && (
              <CategoriesView
                categories={categories}
                userIncome={userIncome}
                onCategoryClick={handleCategoryClick}
                onAddCustomCategory={() => setShowCustomCategoryModal(true)}
              />
            )}
            {currentView === 'settings' && (
              <SettingsView
                user={user}
                expenses={expenses}
                userIncome={userIncome}
                onLogout={handleLogout}
                onDeleteAllExpenses={handleDeleteAllExpenses}
              />
            )}
          </div>
        </>
      )}

      <TransactionModal
        show={showTransactionModal}
        onClose={handleCloseModal}
        editingExpense={editingExpense}
        transactionForm={transactionForm}
        setTransactionForm={setTransactionForm}
        onSubmit={handleAddExpense}
        loading={loading}
        allCategories={categories}
      />

      <CustomCategoryModal
        show={showCustomCategoryModal}
        onClose={() => setShowCustomCategoryModal(false)}
        categoryName={customCategoryName}
        setCategoryName={setCustomCategoryName}
        onSubmit={handleAddCustomCategory}
      />

      <IncomeModal
        show={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
        incomeValue={incomeInput}
        setIncomeValue={setIncomeInput}
        onSubmit={handleSaveIncome}
      />
    </div>
  );
};

export default App;