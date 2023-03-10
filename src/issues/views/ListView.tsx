import { useState }from 'react'
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { useIssues } from '../../hooks';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../interfaces/issue';

export const ListView = () => {

  const [seletedLabels, setSeletedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()
  
  const { issueQuery, page, nextPage, prevPage } = useIssues({state, labels: seletedLabels });

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
                issues={ issueQuery.data || [] } 
                state={state}
                onStateChanged={ (newState)=> setState(newState) }
              />)
        }

        <div className='d-flex mt-2 justify-content-between align-items-center'>
          
          <button 
            className='btn btn-outline-primary'
            disabled ={ page === 1 }
            onClick={prevPage}    
          >Prev</button>
        
          <span>{ issueQuery.isFetching? 'Cargando...': page }</span>
          
          <button 
            className='btn btn-outline-primary'
            onClick={ nextPage }
            disabled={ issueQuery.isFetching }
          >Next</button>

        </div>

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
