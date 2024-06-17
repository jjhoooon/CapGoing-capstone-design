import { useQuery } from "@tanstack/react-query"
import { api } from "../utils/api"

const fetchUserInfo = () => {
    return api.get(`/user/info`,
        {
            withCredentials: true
        }
    )
}

export const useUserInfoQuery = () => {
    return useQuery({
        queryKey: ['user-info'],
        queryFn: fetchUserInfo,
        select: (result) => result.data
    })
}