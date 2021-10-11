import { useParams } from "react-router"
import { useQuery } from "../../graphql/hooks"
import { GET_SURVEYS_I_RESPONDED, Types } from "../../graphql/operations/queries"
import { useAnalytics } from "../../utils/hooks"

interface RouteParams {
    id: string
}

const MySurvey: React.FC = () => {
    const { id } = useParams<RouteParams>()
    console.log({ id })
    const result = useQuery<Types.GetSurveysIResponded>(GET_SURVEYS_I_RESPONDED,{ id })
    // const result2 = useAnalytics()
    console.log({ result })
    return (
        <div>
            {/* {result.mySurvey.title} */}
        </div>
    )
}

MySurvey.displayName = 'MySurvey'

export default MySurvey