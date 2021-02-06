import express from "express";
import * as SqlQueries from "../db/queries";

const router = express.Router();

// define a route handler for the default home page
router.get("/average-listing-selling-price-per-seller-type", async (_, res) => {
  // render the index template
  const results = await SqlQueries.averageListingSellingPricePerSellerTypeReport();
  return res.json(results);
});
router.get(
  "/percentual-distribution-of-available-cars-by-make",
  async (_, res) => {
    // render the index template
    const results = SqlQueries.percentualDistributionOfAvailableCarsByMakeReport();
    return res.json(results);
  }
);
router.get(
  "/average-price-of-the-30%-most-contacted-listings",
  async (_, res) => {
    // render the index template
    const results = SqlQueries.averagePriceOfTheMostContactedListingsReport();
    return res.json(results);
  }
);
router.get("/the-top-5-most-contacted-listings-per-month", (_, res) => {
  // render the index template
  const results = SqlQueries.theTopMostContactedListingsPerMonthReport();
  return res.json(results);
});
module.exports = router;
