import { api } from "@/services/api"

export const checkAuthentication = async () => {
  const response = await api.get("/auth")
  
  if (response.status == 200) {
    console.log("status deu bom", response.status)
    return true
  } else {
    console.log("status deu ruim", response.status)
    return false
  }
}