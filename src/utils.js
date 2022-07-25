async function getRequest(url) {
  try {
    const res = await fetch(url, { mode: "cors" }).catch((err) => {
      return err;
    });
    if (res.status >= 200 && res.status <= 299) {
      return res.json();
    } else {
      throw res;
    }
  } catch (error) {
    return error.statusText;
  }
}

function convertJsonToCsv(obj) {
  const header = Object.keys(obj);
  const csv = [
    header.join(","),
    header.map((fieldName) => JSON.stringify(obj[fieldName])).join(","),
  ].join("\r\n");
  return csv;
}

module.exports = {
  getRequest,
  convertJsonToCsv,
};
