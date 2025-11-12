import expres from "express";
import {addFile, getAllFiles, getFilesById} from "../controller/files.controller.js";
import {protectRoute, isTeacher} from "../middleware/auth.middleware.js";
import {upload} from "../middleware/upload.middleware.js";

const router = expres.Router();

router.post("/File", protectRoute, isTeacher, upload.single("file"), addFile)
router.get("/files", getAllFiles)
router.get("/files/:id", getFilesById)

export default router;