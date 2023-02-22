import { FC } from 'react';
import { useLabel } from "../../hooks/useLabel"
import { LoadingIcon } from "../../shared/components/LoadingIcon"

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string ) => void
}

export const LabelPicker: FC<Props> = ({onChange, selectedLabels}) => {

  const labelsQuery = useLabel()

  if (labelsQuery.isLoading) return (<LoadingIcon />)

  return (
    <div>

      {
        labelsQuery.data?.map( label =>(
          <span 
              key={label.id}
              className={`badge rounded-pill m-1 label-picker 
                ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
              onClick={ ()=> onChange(label.name) }

              style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          >
              {label.name}
          </span>
        ))
      }
        
    </div>
  )
}
