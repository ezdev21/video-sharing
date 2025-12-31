import { useAuthStore } from "@/store/auth.store"
import { useEffect } from "react"

const Dashboard = () => {
  const { user, logout } = useAuthStore(state => state)
  useEffect(() => {
    // logout()
  })
  
  return (
    <div>
      <h1 className="text-5xl">Dashboard</h1>
      <h1 className="text-5xl">Hello {user?.name}</h1>
    </div>
  )
}

export default Dashboard
