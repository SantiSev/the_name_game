import { fetchTeammates, pickRandom } from "../api";

const MOCK_API_URL = "https://api.example.com/teammates";

beforeEach(() => {
  process.env.EXPO_PUBLIC_API_URL = MOCK_API_URL;
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

// ─── fetchTeammates ───────────────────────────────────────────────────────────

describe("fetchTeammates", () => {
  const rawTeammates = [
    {
      id: "1",
      firstName: "Alice",
      lastName: "Smith",
      jobTitle: "Engineer",
      headshot: { url: "https://example.com/alice.jpg" },
    },
    {
      id: "2",
      firstName: "Bob",
      lastName: "Jones",
      jobTitle: "Designer",
      headshot: { url: "https://example.com/bob.jpg" },
    },
    {
      id: "3",
      firstName: "Carol",
      lastName: "White",
      jobTitle: null,
      headshot: { url: "https://example.com/carol.jpg" },
    },
    {
      id: "4",
      firstName: "Dave",
      lastName: "Brown",
      jobTitle: "Manager",
      headshot: null, // no headshot — should be filtered out
    },
    {
      id: "5",
      firstName: "Eve",
      lastName: "Green",
      jobTitle: "QA",
      headshot: { url: null }, // headshot exists but no url — should be filtered out
    },
  ];

  it("maps API response to Teammate shape", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => rawTeammates,
    });

    const result = await fetchTeammates();

    expect(result[0]).toEqual({
      id: "1",
      firstName: "Alice",
      lastName: "Smith",
      fullName: "Alice Smith",
      jobTitle: "Engineer",
      headshotUrl: "https://example.com/alice.jpg",
    });
  });

  it("filters out teammates without a headshot url", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => rawTeammates,
    });

    const result = await fetchTeammates();

    const ids = result.map((t) => t.id);
    expect(ids).not.toContain("4"); // null headshot
    expect(ids).not.toContain("5"); // null headshot url
  });

  it("returns all teammates that have a headshot url", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => rawTeammates,
    });

    const result = await fetchTeammates();

    expect(result).toHaveLength(3);
  });

  it("defaults jobTitle to empty string when null", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => rawTeammates,
    });

    const result = await fetchTeammates();
    const carol = result.find((t) => t.id === "3");

    expect(carol?.jobTitle).toBe("");
  });

  it("constructs fullName from firstName and lastName", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => rawTeammates,
    });

    const result = await fetchTeammates();

    expect(result[0].fullName).toBe("Alice Smith");
    expect(result[1].fullName).toBe("Bob Jones");
  });

  it("throws when the API response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchTeammates()).rejects.toThrow("API error: 500");
  });

  it("throws when fetch itself fails (network error)", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error"),
    );

    await expect(fetchTeammates()).rejects.toThrow("Network error");
  });

  it("calls the correct API URL", async () => {
    process.env.EXPO_PUBLIC_API_URL = MOCK_API_URL;

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    // Re-load the module so API_URL captures the env var set above
    let isolatedFetch!: typeof fetchTeammates;
    jest.isolateModules(() => {
      isolatedFetch = require("../api").fetchTeammates;
    });

    await isolatedFetch();

    expect(global.fetch).toHaveBeenCalledWith(MOCK_API_URL);
  });

  it("returns an empty array when all teammates lack headshots", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: "1", firstName: "A", lastName: "B", headshot: null },
      ],
    });

    const result = await fetchTeammates();

    expect(result).toEqual([]);
  });
});

// ─── pickRandom ───────────────────────────────────────────────────────────────

describe("pickRandom", () => {
  const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it("returns exactly the requested count", () => {
    expect(pickRandom(pool, 6)).toHaveLength(6);
  });

  it("returns only items from the source array", () => {
    const result = pickRandom(pool, 6);
    result.forEach((item) => expect(pool).toContain(item));
  });

  it("returns no duplicates", () => {
    const result = pickRandom(pool, 6);
    const unique = new Set(result);
    expect(unique.size).toBe(6);
  });

  it("does not mutate the original array", () => {
    const original = [...pool];
    pickRandom(pool, 6);
    expect(pool).toEqual(original);
  });

  it("returns the full array when count equals array length", () => {
    const result = pickRandom(pool, pool.length);
    expect(result).toHaveLength(pool.length);
    expect(result.sort()).toEqual([...pool].sort());
  });

  it("returns an empty array when count is 0", () => {
    expect(pickRandom(pool, 0)).toEqual([]);
  });
});
