import { useQuery } from "@tanstack/react-query";
import { api_chatgpt } from '../utils/api'

const fetchCreateRecipe = () => {
    return api_chatgpt.get('/recipe')
}

export const useCreateRecipeQuery = () => {
    return useQuery({
        queryKey: ["create-recipe"],
        queryFn: () => fetchCreateRecipe(),
        select: (result) => result,
    })
}