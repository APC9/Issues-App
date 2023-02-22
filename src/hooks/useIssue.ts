import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../apis/githubApi";
import { Issue } from "../issues/interfaces";

export const getIssueInfo = async( issueNumber: number ): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data; 
}

export const getIssueComments = async( issueNumber: number ): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
  return data; 
}

export const useIssue =( issueNumber: number )=>{

  const issueQuery = useQuery(
    ['issue', issueNumber],
    () => getIssueInfo( issueNumber )
  );

  const commentsQuery = useQuery(
    ['issue', issueNumber, 'comments'],
    () => getIssueComments( issueNumber ),
    {
      enabled: issueQuery.data !== undefined, // espera el resultado de la funcion getIssueInfo
    }
  );

  return {
    issueQuery,
    commentsQuery
  }
}