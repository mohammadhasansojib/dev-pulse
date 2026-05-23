

export interface CreateIssuePayload {
    title: string,
    description: string,
    type: "bug" | "feature_request",
    reporter_id: number,
}

export type IssueType = "bug" | "feature_request";
export type StatusType = "open" | "in_progress" | "resolved";

export interface IIussue extends CreateIssuePayload {
    id: number,
    status: "open" | "in_progress" | "resolved",
    created_at: Date,
    updated_at: Date,
}

export type IssueTypeIncludingReporter = Omit<IIussue, "reporter_id"> & {
    reporter: {
        id: number,
        name: string,
        role: "maintainer" | "contributor"
    }
}