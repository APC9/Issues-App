import { useState }from 'react'
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { useIssueInfinite } from '../../hooks';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../interfaces/issue';

export const ListViewInfinite = () => {

  const [seletedLabels, setSeletedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()
  
  const { issueQuery } = useIssueInfinite({state, labels: seletedLabels });

  const onLabelChange = (labelName: string ) => {
    (seletedLabels.includes(labelName))
      ? setSeletedLabels(seletedLabels.filter(label => label !== labelName))
      : setSeletedLabels([...seletedLabels, labelName])
  }


  return (
    <div className="row mt-5">
      
      <div className="col-8">
        { 
           issueQuery.isLoading 
            ? (<LoadingIcon/>)
            : (<IssueList 
                issues={ issueQuery.data?.pages.flat() || [] } 
                state={state}
                onStateChanged={ (newState)=> setState(newState) }
              />) 
        }
        
        <button 
          className='btn btn-outline-primary mt-2 '
          disabled={ !issueQuery.hasNextPage }
          onClick={ ()=> issueQuery.fetchNextPage() }
          >
          Load More...
        </button>

      </div>
      
      <div className="col-4">
        <LabelPicker 
          selectedLabels={seletedLabels}
          onChange={ (labelName)=> onLabelChange(labelName)}
        />
      </div>
    </div>
  )
}
