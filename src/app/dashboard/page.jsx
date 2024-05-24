"use client";
import FilterBar from "@/components/FilterComponent/FilterBar";

export default function DashboardPage() {
  return (
    <div>
      <FilterBar sortBy="filterByOwner" spec="earlanjoshqs@gmail.com" />
    </div>
  );
}
