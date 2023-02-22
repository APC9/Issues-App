import { Issue } from "../issues/interfaces"
import { githubApi } from '../apis/githubApi';
import { useQuery } from "@tanstack/react-query";


const getIssues = async():Promise<Issue[]> =>{
  const { data } = await githubApi.get<Issue[]> ('/issues');
  return data;
}

export const useIssues = () => {
  
  const issueQuery = useQuery(
    ['issues'],
    getIssues,
  );

  return {
    issueQuery
  }
}
