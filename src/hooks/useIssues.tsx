import { useState, useEffect } from 'react';
import { Issue, State } from "../issues/interfaces";
import { githubApi } from '../apis/githubApi';
import { useQuery } from "@tanstack/react-query";

interface Props{
  state?: State;
  labels: string[],
  page?: number
}

const getIssues = async( { labels, state, page = 1}: Props ):Promise<Issue[]> =>{

  const params = new URLSearchParams();

  if(state) params.append('state', state);

  if( labels.length > 0 ){
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', page.toString() );
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]> ('/issues', {params});
  return data;
}

export const useIssues = ({state, labels}:Props ) => {

  const [ page, setPage ] = useState(1)

  useEffect( ()=>{
    setPage(1)
  },[state, labels ])
  
  const issueQuery = useQuery(
    ['issues', {state, labels, page }],
    () => getIssues({labels, state, page} ),
  );

  const nextPage = ()=>{
    if (issueQuery.data?.length === 0 ) return; 
    setPage( prev => prev + 1 )
  }
  
  const prevPage = ()=>{
    if (issueQuery.data?.length === 0 ) return; 
    
    if (page <= 1) return;

    setPage( prev => prev - 1 )
  }

  return {
    //Properties
    issueQuery,

    //Getter
    page,

    //Methods
    nextPage,
    prevPage

  }
}
