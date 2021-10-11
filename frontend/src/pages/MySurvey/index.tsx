import { useParams } from "react-router"
import { useQuery } from "../../graphql/hooks"
import { GET_MY_SURVEY, Types } from "../../graphql/operations/queries"
import { useAnalytics } from "../../utils/hooks"

interface RouteParams {
    id: string
}

const MySurvey: React.FC = () => {
    const { id } = useParams<RouteParams>()
    console.log({ id })
    // const result = useQuery<Types.GetMySurvey>(GET_MY_SURVEY,{ id })
    const result2 = useAnalytics()
    console.log({ result2 })
    return (
        <div>
            {/* {result.mySurvey.title} */}
        </div>
    )
}

MySurvey.displayName = 'MySurvey'

export default MySurvey