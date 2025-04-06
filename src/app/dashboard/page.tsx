import { Suspense } from "react";
import BoardWrapper from "@/components/BoardWrapper";

import { Header } from "@/components/Header";
import { DashboardContainer } from "@/ui/pages/dashboard";

const Dashboard = async () => {
  return (
    <DashboardContainer>
      <Header />
      <Suspense fallback={<p>Cargando...</p>}>
        <BoardWrapper />
      </Suspense>
    </DashboardContainer>
  );
};

export default Dashboard;
