import { vi, test, expect } from "vitest";
import axios from "axios";
import * as aviation from "./aviation";

vi.mock("axios");

test("fetches flight data successfully", async () => {
  // getFlightByNumber returns `response.data.data` so the mock should
  // include a `data` property that itself contains `data`.
  axios.get.mockResolvedValueOnce({ data: { data: { flight: "AI302" } } });

  const result = await aviation.getFlightByNumber("AI302");

  // use the standard matcher for call count
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(result.flight).toBe("AI302");
});
