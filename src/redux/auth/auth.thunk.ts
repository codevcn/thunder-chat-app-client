import { createAsyncThunk } from "@reduxjs/toolkit"
import { checkAuthService } from "@/services/auth.service"

const checkAuthThunk = createAsyncThunk("auth/checkAuth", checkAuthService)

export { checkAuthThunk }
