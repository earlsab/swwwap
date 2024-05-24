"use client";
import FilterBar from "@/components/FilterComponent/FilterBar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useUser } from "@auth0/nextjs-auth0/client";
export default withPageAuthRequired(function DashboardPage() {
  const { user, error, isLoading } = useUser();
  return (
    <div>
      <FilterBar sortBy="filterByOwner" spec={user.email} />
    </div>
  );
});
