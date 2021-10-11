import { selectorFamily, useRecoilValue } from "recoil";
import axios from 'axios'
import { userAtom } from "./useUser";

const analyticsSelector = selectorFamily({
    key: 'ANALYTICS-SELECTOR',
    get: () => async ({ get }) => {
        const user = get(userAtom)
        const token = await user?.getIdToken()
        if(!token) throw new Error('user not authenticated')
        const response = await axios.get(process.env.REACT_APP_ANALYTICS_URL!,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        if(response.status >= 400) throw response
        console.log(response.data)
        return response.data
    },
    dangerouslyAllowMutability: true
})

export const useAnalytics = () => {
    return useRecoilValue(analyticsSelector({}))
}