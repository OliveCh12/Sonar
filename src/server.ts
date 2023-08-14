import express from "express";
import Router from "express";

import { fetchMultipleUrls } from "./utils/fetch.ts";
import {
  getAllSlidingDayCombinations,
  groupAllCombinationsByMonth,
} from "./utils/dates.ts";
import { getResult } from "./apis/sixt/index.ts";

const app = express();
const router = Router();

app.use(router);

router.get("/", async (req, res) => {
  try {
    const array = [
      "https://jsonplaceholder.typicode.com/todos/1",
      "https://jsonplaceholder.typicode.com/todos/2",
      "https://jsonplaceholder.typicode.com/todos/3",
      "https://jsonplaceholder.typicode.com/todos/4",
      "https://jsonplaceholder.typicode.com/todos/5",
      "https://jsonplaceholder.typicode.com/todos/6",
      "https://jsonplaceholder.typicode.com/todos/7",
      "https://jsonplaceholder.typicode.com/todos/8",
    ];

    const result = await fetchMultipleUrls(array);

    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/sixt", async (req, res) => {
  const result = await getResult();
  // Return the result in JSON format response
  res.json({
    url: result,
  });
});

// Create route for date group and pass a number as a parameter
router.get("/dates/:number", (req, res) => {
  const { number } = req.params;
  const result = getAllSlidingDayCombinations(parseInt(number));
  const endResult = groupAllCombinationsByMonth(parseInt(number))(result);
  res.send(Object.values(endResult)[2]);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
