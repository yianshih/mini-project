import { getEnumValues, Debouncer } from "./index";

enum MockEnum {
  Beer = "Beer",
  Wine = "Wine",
}

const mockCallBack = jest.fn();

const wait = (millisecond: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve("resolved");
    }, millisecond)
  );

describe("getEnumValues", () => {
  it("getEnumValues", () => {
    expect(getEnumValues(MockEnum)).toEqual(["Beer", "Wine"]);
  });
});

describe("Debouncer", () => {
  it("debounce", async () => {
    const debouncer = new Debouncer(1000);
    debouncer.debouce(mockCallBack);
    expect(mockCallBack).toHaveBeenCalledTimes(0);
    await wait(1000);
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  it("cancel", async () => {
    const debouncer = new Debouncer(1000);
    debouncer.debouce(mockCallBack);
    debouncer.cancel();
    expect(mockCallBack).toHaveBeenCalledTimes(0);
    await wait(1000);
    expect(mockCallBack).toHaveBeenCalledTimes(0);
  });
});
