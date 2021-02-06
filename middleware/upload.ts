import multer from "multer";

const csvFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../assets/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({ storage: storage, fileFilter: csvFilter });
export default uploadFile;
