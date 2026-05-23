import type { Request, Response } from "express";
import { errorResponse } from "../../utils/response.js";
import issueService from "./issue.service.js";
import type { IssueType, StatusType } from "./issue.interface.js";


const createIssue = async (req: Request, res: Response) => {
    try {
        const {title, description, type} = req.body;

        const createIssuePayload = {
            title,
            description,
            type,
            reporter_id: req?.user?.id,
        };
        const issues = await issueService.createIssueIntoDB(createIssuePayload);
        if (issues.length === 0) {
            return res.status(400).json({
                success: false,
                message: "issue can not be created",
                errors: {},
            })
        }

        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: issues[0],
        })
    } catch (error: any) {
        res.status(500).json(errorResponse(error));
    }
}

const getAllIssues = async (req: Request, res: Response) => {
    try {
        let {sort = "newest", type = null, status = null} = req.query;

        const issues = await issueService.fetchAllIssuesFromDB(
            sort as ("newest" | "oldest" | string),
            type as (string | null),
            status as (string | null)
        );
        if (issues.length === 0) {
            return res.status(404).json({
                success: false,
                message: "no issue found",
                errors: {},
            })
        }

        const issuesWithReporterDetails = await issueService.attachReporterDetails(issues);

        res.json({
            success: true,
            data: issuesWithReporterDetails,
        })
        
    } catch (error: any) {
        res.status(500).json(errorResponse(error));
    }
}

const getSingleIssue = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const issues = await issueService.fetchSingleUserFromDBById(id);
        if (issues.length === 0) {
            res.status(404).json({
                success: false,
                message: "issue not found",
                errors: {}
            })
        }

        const issueWithReporterDetails = await issueService.attachReporterDetails(issues);

        res.json({
            success: true,
            data: issueWithReporterDetails[0],
        })
        
    } catch (error: any) {
        res.status(500).json(errorResponse(error));
    }
}

const updateIssue = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        let {title = null, description = null, type = null} = req.body;

        const issues = await issueService.fetchSingleUserFromDBById(id);
        if (issues.length === 0) return res.status(404).json({
            success: false,
            message: "Issue not found",
            errors: {},
        })

        title = title ?? issues[0]?.title;
        description = description ?? issues[0]?.description;
        type = type !== "bug" && type !== "feature_request" ? issues[0]?.type : type;

        const updatedIssues = await issueService.updateIssueIntoDB(id, {title, description, type});
        if (updatedIssues.length === 0) {
            return res.status(500).json({
                success: false,
                message: "update issue failed",
                errors: {},
            })
        }


        res.json({
            success: true,
            message: "Issue updated successfully",
            data: updatedIssues[0],
        })
    } catch (error: any) {
        res.status(500).json(errorResponse(error));
    }
}

const deleteIssue = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const response = await issueService.deleteIssueFromDB(id);

        if (response.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "issue not found",
                errors: {}
            })
        }

        res.status(200).json({
            success: true,
            message: "Issue deleted successfully",
        })
        
    } catch (error: any) {
        res.status(500).json(errorResponse(error));
    }
}


export default {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue,
}