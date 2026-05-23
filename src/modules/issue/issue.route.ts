import { Router } from "express";
import type {Router as IssueRouter} from 'express'
import issueController from "./issue.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.js";

const router: IssueRouter = Router();

const USER_ROLES = {
    maintainer: "maintainer",
    contributor: "contributor",
} as const;

router.get('/', issueController.getAllIssues);
router.get('/:id', issueController.getSingleIssue);

router.use(authenticate);

router.post('/', authorize(USER_ROLES.maintainer, USER_ROLES.contributor), issueController.createIssue);

router.patch('/:id', authorize(USER_ROLES.maintainer), issueController.updateIssue);
router.delete('/:id', authorize(USER_ROLES.maintainer), issueController.deleteIssue);


export default router;