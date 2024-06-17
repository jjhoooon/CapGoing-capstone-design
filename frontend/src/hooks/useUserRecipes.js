import { useQuery } from "@tanstack/react-query"
import { api } from "../utils/api"

const fetchUserRecipes = () => {
    return api.get(`/user/recipes`, { withCredentials: true })
}

export const useUserRecipesQuery = () => {
    return useQuery({
        queryKey: ['user-recipes'],
        queryFn: fetchUserRecipes,
        select: (result) => result.data
    })
}