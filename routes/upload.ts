import express from "express";
import fs from "fs";
import * as csv from "fast-csv";
import upload from "../middleware/upload";
import * as path from "path";
import * as SqlQueries from "../db/queries";

const router = express.Router();
type fileType = "listings" | "contacts";

router.post("/listings", upload.single("file"), function (req, res) {
  try {
    SqlQueries.clearListingsTable();
    readUploadedFile(req, "listings");
    return res.json({ message: "Valid Listing csv Successfully Uploaded" });
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
});

router.post("/contacts", upload.single("file"), function (req, res) {
  try {
    SqlQueries.clearContactsTable();
    readUploadedFile(req, "contacts");
    return res.json({ message: "Valid Listing csv Successfully Uploaded" });
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
});

function readUploadedFile(req: any, type: fileType) {
  let fileRows: any[] = [];
  fs.createReadStream(
    path.resolve(__dirname, "./../assets/", req.file.originalname)
  )
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => {
      throw error.message;
    })
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      fileRows = fileRows.map(function (obj: any) {
        return Object.keys(obj).map(function (key: any) {
          return obj[key];
        });
      });
      //validate csv
      const validationError = validateCsvData(fileRows, type);
      if (validationError) {
        throw validationError;
      }
      // save csv file to postgres realted tables
      switch (type) {
        case "listings":
          SqlQueries.insertListings(fileRows);
          break;
        case "contacts":
          SqlQueries.insertContacts(fileRows);
          break;
        default:
          break;
      }
      fs.unlinkSync(req.file.path); // remove temp cvs file
    });
}

function validateCsvData(rows: any, type: fileType) {
  for (let i = 0; i < rows.length; i++) {
    const rowError = validateCsvRow(rows[i], type);
    if (rowError) {
      return `${rowError} on row ${i + 1}`;
    }
  }
  return;
}

function validateCsvRow(row: string[], type: fileType): any {
  switch (type) {
    case "listings":
      if (row.length != 5) return "invalid lisitings fields"; // 5 is the number of listing table columns
      break;
    case "contacts":
      if (row.length != 2) return "invalid contacts fields"; // 2 is the number of contacts table columns
      break;
    default:
      break;
  }
  return null;
}
module.exports = router;
