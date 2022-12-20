import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  level: string | undefined,
  status: string | undefined,
  project: string | undefined,
  options?: { signal?: AbortSignal }
) {
  const params = { page, level, status, project };
  const paramKeys = Object.keys(params) as (keyof typeof params)[];
  paramKeys.forEach((key) => {
    if (params[key] === undefined) {
      delete params[key];
    }
  });
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: params,
    signal: options?.signal,
  });
  return data;
}

export async function resolveIssue(issueId: string) {
  const { data } = await axios.patch(`${ENDPOINT}/${issueId}`, {
    status: "resolved",
  });
  return data;
}
