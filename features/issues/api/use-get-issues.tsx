import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(
  page?: number,
  level?: string | undefined,
  status?: string | undefined,
  project?: string | undefined
) {
  return [QUERY_KEY, page, level, status, project];
}

export function useGetIssues(
  page: number,
  level: string | undefined,
  status: string | undefined,
  project: string | undefined
) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, level, status, project),
    ({ signal }) => getIssues(page, level, status, project, { signal }),
    { keepPreviousData: true }
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(getQueryKey(page + 1), ({ signal }) =>
        getIssues(page + 1, level, status, project, { signal })
      );
    }
  }, [query.data, page, level, status, project, queryClient]);
  return query;
}
