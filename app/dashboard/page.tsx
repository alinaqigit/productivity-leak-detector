import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </nav>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-semibold mb-4">Welcome to your Productivity Dashboard</h2>
        <p className="text-slate-600">
          This area is protected. You can only see this if you are signed in.
        </p>
        <div className="mt-8 border-t pt-8">
           <p className="text-sm text-slate-500">Analysis tools coming soon...</p>
        </div>
      </div>
    </div>
  );
}
