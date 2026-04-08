import { Teammate } from "../types";

const API_URL = process.env.EXPO_PUBLIC_API_URL!;

export async function fetchTeammates(): Promise<Teammate[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  const data = await response.json();

  return data
    .filter((person: any) => person.headshot?.url) // filter out missing headshots
    .map((person: any) => ({
      id: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      fullName: `${person.firstName} ${person.lastName}`,
      jobTitle: person.jobTitle ?? "",
      headshotUrl: person.headshot.url,
    }));
}

export function pickRandom<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
}
