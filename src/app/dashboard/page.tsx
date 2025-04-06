import { Board } from "@/components/Board";
import { Header } from "@/components/Header";
import { DashboardContainer } from "@/ui/pages/dashboard";

const Dashboard = async () => {
  return (
    <DashboardContainer>
      <Header />
      <Board />
    </DashboardContainer>
  );
};

export default Dashboard;
