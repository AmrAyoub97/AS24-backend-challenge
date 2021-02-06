const Pool = require("pg").Pool;
import format from "pg-format";

const pool = new Pool({});
const clearListingsTable = () => {
  pool.query("DELETE FROM listings", (error: any, results: any) => {
    if (error) {
      throw error;
    }
  });
};

const clearContactsTable = () => {
  pool.query("DELETE FROM contacts", (error: any, results: any) => {
    if (error) {
      throw error;
    }
  });
};

const insertListings = (rows: any) => {
  let query = format(
    "INSERT INTO listings (id, make, price, mileage, seller_type) VALUES %L",
    rows
  );
  pool.query(query, (error: any, results: any) => {
    if (error) {
      throw error;
    }
  });
};

const insertContacts = (rows: any) => {
  let query = format(
    "INSERT INTO contacts (listing_id, contact_date) VALUES %L",
    rows
  );

  pool.query(query, (error: any, results: any) => {
    if (error) {
      throw error;
    }
  });
};

const averageListingSellingPricePerSellerTypeReport = async () => {
  const res = await pool.query(
    'Select seller_type as "Seller Type",avg(price) as "Average in Euro" from listings group by seller_type;'
  );
  return res.rows;
};

const percentualDistributionOfAvailableCarsByMakeReport = async () => {
  const res = await pool.query(
    "Select make,(count(make)*100/(select count(*) from listings)) as distribution from listings group by make order by distribution desc;"
  );
  return res.rows;
};

const averagePriceOfTheMostContactedListingsReport = async () => {
  const res = await pool.query(
    "Select avg(price) as Avg from(Select id, price, percent_rank() over ( order by count(listing_id) desc ) as pct_rank from listings, contacts where id = listing_id group by id ) as temp where pct_rank > 0.70;"
  );
  return res.rows;
};

const theTopMostContactedListingsPerMonthReport = () => {};

export {
  clearListingsTable,
  clearContactsTable,
  insertListings,
  insertContacts,
  averageListingSellingPricePerSellerTypeReport,
  percentualDistributionOfAvailableCarsByMakeReport,
  averagePriceOfTheMostContactedListingsReport,
  theTopMostContactedListingsPerMonthReport,
};
