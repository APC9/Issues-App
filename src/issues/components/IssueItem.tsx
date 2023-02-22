import { useNavigate } from 'react-router-dom'; 
import { useQueryClient } from '@tanstack/react-query';

import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue } from '../interfaces';
import { getIssueInfo, getIssueComments } from '../../hooks';

interface Props{
    issue: Issue
}

export const IssueItem = ({ issue }:Props ) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    //realiza la peticion http al pasar el cursor sobre el issue
    const prefetchData =()=>{
        queryClient.prefetchQuery(
            ['issue', issue.number],
            () => getIssueInfo( issue.number )
        )

        queryClient.prefetchQuery(
            ['issue', issue.number, 'comments'],
            () => getIssueComments( issue.number )
        )
    }

    // carga la data al pasar el curso sobre issue sin realizar peticiones http
    const preSetData = () =>{
        queryClient.setQueryData(
            ['issue', issue.number],
            issue,
            {
                // no realiza peticiones http hasta llegar a la fecha especificada
                updatedAt: new Date().getTime() + 100000 
            }
        )
    }

    return (
        <div className="card mb-2 issue"
             onClick={ () => navigate(`/issues/issue/${issue.number}`) }
             onMouseEnter= { preSetData }
            >
            <div className="card-body d-flex align-items-center">
                
                {
                    issue.state === 'open' 
                        ? (<FiCheckCircle size={30} color="green" />)
                        :(<FiInfo size={30} color="red" />)
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{ issue.title }</span>
                    <span className="issue-subinfo">{`#${issue.number} opened 2 days ago by `}<span className='fw-bold'>{issue.user.login}</span></span>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issue.user.avatar_url } alt={issue.user.avatar_url } className="avatar" />
                    <span className='px-2'>{issue.comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
