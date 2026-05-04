import type { DummyDataResponse } from "@/lib/types";

export async function fetchDummyData() {
  const response = await fetch("/api/dummy-data", {
    method: "GET",
    cache: "no-store",
  });

  const data = (await response.json()) as DummyDataResponse;

  if (!response.ok || !data.ok) {
    throw new Error(data.ok ? "Failed to load dummy data." : data.error);
  }

  return data;
}
