import DashboardLayout from "../layouts/DashboardLayout";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import StatCard from "../components/Statcard";

export default function Dashboard() {
  return (
    <DashboardLayout>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Spent" value="₹550" />
        <StatCard title="This Month" value="₹500" />
        <StatCard title="Categories" value="2" />
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <AddExpenseForm />
        <ExpenseList />
      </div>

    </DashboardLayout>
  );
}
