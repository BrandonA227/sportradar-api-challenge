const { getRequest, convertJsonToCsv } = require("./utils");

describe("getRequest", () => {
  const fakeAPI = "thisIsAFakeApi";
  // highlight-start

  beforeEach(() => {
    fetch.resetMocks();
  });

  it("returns data when successful", async () => {
    fetch.mockResponseOnce(JSON.stringify({ body: "data", status: 200 }));
    const data = await getRequest(fakeAPI);
    expect(fetch).toHaveBeenCalledWith(fakeAPI, { mode: "cors" });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual({ body: "data", status: 200 });
  });

  it("returns error status when fail", async () => {
    fetch.mockReject(() => ({
      body: "error",
      status: 404,
      statusText: "Not Found",
    }));
    const data = await getRequest(fakeAPI);
    expect(fetch).toHaveBeenCalledWith(fakeAPI, { mode: "cors" });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual("Not Found");
  });
});

describe("convertJsonToCsv", () => {
  const testObj = {
    test1: "Test1",
    test2: "Test2",
    test3: "Test3",
  };

  it("returns csv from object", () => {
    expect(convertJsonToCsv(testObj)).toBe(
      'test1,test2,test3\r\n"Test1","Test2","Test3"'
    );
  });
});
