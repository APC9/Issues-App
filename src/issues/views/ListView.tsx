import { useState }from 'react'
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { useIssues } from '../../hooks';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';


export const ListView = () => {

  const [seletedLabels, setSeletedLabels] = useState<string[]>([])
  const { issueQuery } =useIssues()

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
            : (<IssueList issues={ issueQuery.data || [] } />)
        }
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
