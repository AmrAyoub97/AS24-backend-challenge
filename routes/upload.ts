import express from "express";
import fs from "fs";
import * as csv from "fast-csv";
import upload from "../middleware/upload";
import * as path from "path";
import ListingsInterface from "../interfaces/Listings";
import ContactsInterface from "../interfaces/Contacts";
import * as SqlQueries from "../db/queries";

const router = express.Router();

router.post("/listings", upload.single("file"), function (req, res) {
  console.log(
    "req.file",
    path.resolve(__dirname + "/../assets/", req.file.originalname)
  );
  SqlQueries.clearListingsTable();
  const fileRows: ListingsInterface[] = [];
  fs.createReadStream(
    path.resolve(__dirname, "/assets/", req.file.originalname)
  )
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => {
      throw error.message;
    })
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      const data = fileRows.map(function (obj: any) {
        return Object.keys(obj)
          .map(function (key: any) {
            return obj[key];
          });
      });
      SqlQueries.insertListings(data);
      fs.unlinkSync(req.file.path); // remove temp file
      //process "fileRows" and respond
    });

  const validationError = validateCsvData(fileRows);
  if (validationError) {
    return res.status(403).json({ error: validationError });
  }
  //else process "fileRows" and respond
  return res.json({ message: "Valid Listing csv Successfully Uploaded" });
});

router.post("/contacts", upload.single("file"), function (req, res) {
  console.log(
    "req.file",
    path.resolve(__dirname + "/../assets/", req.file.originalname)
  );
  SqlQueries.clearContactsTable();
  const fileRows: any[] = [];
  fs.createReadStream(
    path.resolve(__dirname, "/assets/", req.file.originalname)
  )
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => {
      console.log(fileRows);
      throw error.message;
    })
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      const data = fileRows.map(function (obj) {
        return Object.keys(obj)
          .map(function (key) {
            return obj[key];
          });
      });
      SqlQueries.insertContacts(data);
      fs.unlinkSync(req.file.path); // remove temp file
      //process "fileRows" and respond
    });

  const validationError = validateCsvData(fileRows);
  if (validationError) {
    return res.status(403).json({ error: validationError });
  }
  //else process "fileRows" and respond
  return res.json({ message: "Valid Contacts csv Successfully Uploaded" });
});

function validateCsvData(rows: any) {
  const dataRows = rows.slice(1, rows.length); //ignore header at 0 and get rest of the rows
  for (let i = 0; i < dataRows.length; i++) {
    const rowError = validateCsvRow(dataRows[i]);
    if (rowError) {
      return `${rowError} on row ${i + 1}`;
    }
  }
  return;
}

function validateCsvRow(row: any): any {
  // if (!row[0]) {
  //   return "invalid name";
  // } else if (!Number.isInteger(Number(row[1]))) {
  //   return "invalid roll number";
  // }
  return null;
}
module.exports = router;
