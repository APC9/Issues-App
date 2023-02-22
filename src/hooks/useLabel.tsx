import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../apis/githubApi";
import { Labels } from "../issues/interfaces/label";


const getLabels =async(): Promise<Labels[]> =>{
  const { data }= await githubApi.get<Labels[]>('/labels');  
  return data;
}

export const useLabel = () =>{

  const labelsQuery = useQuery(
    ["labels"],
    getLabels,
    {
      //staleTime: 1000 * 60 * 60   // la data se refresca en cada cierto tiempo
      //refetchOnWindowFocus: false // no se refresca la data
      // initialData: []
        placeholderData: [
        {
          "id": 1249821345,
          "node_id": "MDU6TGFiZWwxMjQ5ODIxMzQ1",
          "url": "https://api.github.com/repos/facebook/react/labels/Component:%20ESLint%20Rules",
          "name": "Component: ESLint Rules",
          "color": "f7afdb",
          "default": false
      },
        {
          "id": 139653724,
          "node_id": "MDU6TGFiZWwxMzk2NTM3MjQ=",
          "url": "https://api.github.com/repos/facebook/react/labels/Component:%20Core%20Utilities",
          "name": "Component: Core Utilities",
          "color": "c5def5",
          "default": false,
        }
      ]
    }
  )

  return labelsQuery;
}