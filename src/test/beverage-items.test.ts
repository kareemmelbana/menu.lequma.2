import { describe, expect, it } from "vitest";

import { beverageItems } from "@/lib/beverage-items";

describe("beverage prices", () => {
  it("uses the listed Saudi-riyal prices", () => {
    expect(beverageItems.map(({ name, price }) => [name, price])).toEqual([
      ["بيبسي", 3],
      ["سفن أب", 3],
      ["قهوة سعودية كوب", 5],
    ]);
  });
});