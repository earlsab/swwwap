"use client";
import FilterBar from "@/components/FilterComponent/FilterBar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import HeaderBar from "@/components/utilities/header/HeaderBar";

export default withPageAuthRequired(function DashboardPage() {
  const { user, error, isLoading } = useUser();
  return (
    <div className="dashContainer">
      <HeaderBar texts={"My Dashboard"} imageSrc={"owned"} />
      <FilterBar sortBy="filterByOwner" spec={user.email} />
    </div>
  );
});
