import { useQuery } from "@tanstack/react-query";
import { api_chatgpt } from "../utils/api";

export const useCreateCupNotes = ({ formData }) => {
    return useQuery({
        queryKey: ['cup-notes', formData],
        queryFn: fetch
    })
}