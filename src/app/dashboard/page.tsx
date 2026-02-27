import AuthGateWrapper from "@/src/modules/auth/components/AuthGateWrapper";
import Dashboard from "../../components/dashboard/home/Dashboard";
export default function DashboardPage() {
    return (<AuthGateWrapper> 
        <Dashboard />
        </AuthGateWrapper>);
}