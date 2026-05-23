import { pool } from "../database/index.js";


export const isOwnOpenIssue = async (issue_id: number, user_id: number) => {
    try {
        const response = await pool.query(
            `
            SELECT reporter_id, status FROM issues
            WHERE id = $1;
            `
        , [issue_id]);

        if (response.rowCount === 0) {
            throw new Error("something went wrong!");
        }

        const issue = response.rows[0];
        if (issue.reporter_id === user_id && issue.status === "open") {
            return true;
        }        

        return false;

    } catch (error: any) {
        throw error;
    }
}

export default isOwnOpenIssue;