import { pool } from "../../database/index.js";
import { removePasswordFromUser } from "../../utils/removePassword.js";
import type { CreateIssuePayload, IIussue, IssueType, IssueTypeIncludingReporter, StatusType } from "./issue.interface.js";


export const createIssueIntoDB = async (payload: CreateIssuePayload) => {
    try {
        const response = await pool.query(
            `
            INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3::issue_type, $4) RETURNING *;
            `
        , [payload.title, payload.description, payload.type, payload.reporter_id]);

        if (response.rowCount === 0) {
            return []
        }

        const issues = response.rows;
        return issues;

    } catch (error: any) {
        throw new Error(error);
    }
}

export const fetchAllIssuesFromDB = async (sort: string | null, type: string | null, status: string | null) => {
    try {
        let query = `SELECT * FROM issues`

        const isValidType = type === "bug" || type === "feature_request";
        const isValidStatus = status === "open" || status === "in_progress" || status === "resolved";
        const isNotValidTypeAndValidStatus = type !== "bug" && type !== "feature_request" && status === "open" || status === "in_progress" || status === "resolved";

        if (isValidType) {
            query += ` WHERE type = '${type}'`;
        }

        if (isNotValidTypeAndValidStatus) {
            query += ` WHERE status = '${status}'`;
        } else if (isValidStatus) {
            query += ` AND status = '${status}'`;
        }

        if (sort === "oldest") {
            query += ` ORDER BY created_at ASC`
        } else {
            query += ` ORDER BY created_at DESC`
        }

        query += ';'


        const response = await pool.query(query);
        const issues = response.rows as IIussue[];

        return issues;

    } catch (error: any) {
        throw new Error(error);
    }
}

export const fetchSingleUserFromDBById = async (id: number) => {
    try {
        const response = await pool.query(
            `
            SELECT * FROM issues WHERE id = $1;
            `
        , [id]);

        const issues = response.rows as IIussue[];
        return issues;

    } catch (error: any) {
        throw new Error(error);
    }
}

export const attachReporterDetails = async (issues: IIussue[]) => {
    try {
        const issuesWithReporterDetails: any = [];

        for (const issue of issues) {
            const response = await pool.query(
                `
                SELECT * FROM users WHERE id = $1;
                `
            , [issue.reporter_id]);

            const reporterWithoutPassword = removePasswordFromUser(response.rows[0]);

            const issueWithReporterDetails: any = {
                ...issue,
                reporter: {
                    id: reporterWithoutPassword.id,
                    name: reporterWithoutPassword.name,
                    role: reporterWithoutPassword.role,
                }
            }
            delete issueWithReporterDetails.reporter_id;


            issuesWithReporterDetails.push(issueWithReporterDetails);
        }

        return issuesWithReporterDetails as IssueTypeIncludingReporter[];
        
    } catch (error: any) {
        throw new Error(error);
    }
}

export const updateIssueIntoDB = async (id: number, payload: {
    title: string,
    description: string,
    type: "bug" | "feature_request",
}) => {
    try {
        const response = await pool.query(
            `
            UPDATE issues
            SET title = $1, description = $2, type = $3
            WHERE id = $4 RETURNING *;
            `
        ,[payload.title, payload.description, payload.type, id]);

        const issues = response.rows as IIussue[];
        return issues;
        
    } catch (error: any) {
        throw error;
    }
}

export const deleteIssueFromDB = async (id: number) => {
    try {
        const response = await pool.query(
            `
            DELETE FROM issues WHERE id = $1;
            `
        , [id]);

        return response;
    } catch (error: any) {
        throw new Error(error);
    }
}


export default {
    createIssueIntoDB,
    fetchAllIssuesFromDB,
    attachReporterDetails,
    fetchSingleUserFromDBById,
    updateIssueIntoDB,
    deleteIssueFromDB,
}