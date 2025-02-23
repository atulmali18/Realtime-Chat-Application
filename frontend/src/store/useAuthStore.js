import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.error("Error in CheckAuth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Error in Signup:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during signup";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error in Login:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during login";
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error in Logout:", error);
    }
  },
  updateProfile: async (data) =>{
    try{
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");



    }catch(error){
      console.error("Error in UpdateProfile:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during profile update";
      toast.error(errorMessage);

    }finally {
      set({ isUpdatingProfile: false });
    }
  }
}));