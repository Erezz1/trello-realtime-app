import { Suspense } from "react";
import BoardWrapper from "@/components/BoardWrapper";

import { Header } from "@/components/Header";
import { DashboardContainer } from "@/ui/pages/dashboard";
import SkeletonBoard from "@/components/Skeleton";

const Dashboard = async () => {
  return (
    <DashboardContainer>
      <Header />
      <Suspense fallback={<SkeletonBoard />}>
        <BoardWrapper />
      </Suspense>
    </DashboardContainer>
  );
};

export default Dashboard;
