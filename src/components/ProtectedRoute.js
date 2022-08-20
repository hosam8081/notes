import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import jwt_decode from "jwt-decode"
const ProtectedRoute = () => {
  let token = localStorage.getItem("token")
  try {
    jwt_decode(token)
  } catch {
    localStorage.removeItem("token")
    return <Navigate to="login" />
  }
  return (
    localStorage.getItem("token") ? <Outlet /> : <Navigate to="login"/>
  )
  
}

export default ProtectedRoute