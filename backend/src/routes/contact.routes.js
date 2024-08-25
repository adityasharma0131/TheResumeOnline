import { Router } from "express";

import { ContactEnquiryController } from "../controllers/contact.controllers.js";

// Router
const router = new Router();

// Routes
router.route("/").post(ContactEnquiryController);

export default router;
