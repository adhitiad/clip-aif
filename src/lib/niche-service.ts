import api from "@/lib/api"

export const nicheService = {
  getTrending: async (geo: string = "id") => {
    const response = await api.get("/niche/trending", {
      params: { geo }, headers: {} as any
    })
    return response.data
  },
  suggestNiche: async (keyword: string) => {
    const response = await api.post("/niche/suggest", { keyword })
    return response.data
  },
}

