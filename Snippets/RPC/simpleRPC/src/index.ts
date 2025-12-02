import express from "express";

const app = express();
app.use(express.json());

function sum(a: number, b: number) {
  return a + b;
}

app.post("/rpc", (req, res) => {
  const { jsonrpc, method, params, id } = req.body;

  if (jsonrpc !== 1.0 || !method || !Array.isArray(params)) {
    res.status(400).json({ jsonrpc: 1.0, error: "Error Occured" });
    return;
  }
  let result;
  switch (method) {
    case "add":
      result = sum(params[0], params[1]);
      break;
    default:
      res.status(400).json({ jsonrpc: 1.0, error: "Invalid Method Called" });
      break;
  }
  res.status(200).json({ jsonrpc: 1.0, result, id });
});
app.listen(3000, () => {
  console.log(`Sever is not Live on Port 3000`);
});
