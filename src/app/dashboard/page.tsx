import AuthGateWrapper from "@/src/components/auth/AuthGateWrapper";
import Dashboard from "../../components/dashboard/home/Dashboard";
export default function DashboardPage() {
    return (<AuthGateWrapper> 
        <Dashboard />
        </AuthGateWrapper>);
}