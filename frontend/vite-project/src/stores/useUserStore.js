import {create} from "zustand";
import {toast} from "react-hot-toast";
import axios from "../lib/axios";

export const useUserStore = create((set,get) => ({
    user:null,
    loading:false,
    checkingAuth:true,

    signup: async ({name,email,password,confirmPassword}) => {
        set({loading:true});
        if(confirmPassword !== password) { 
            set({loading:false});
            return toast.error("Passwords do not match");
    }


    try {
        const res = await axios.post("/auth/signup", {name,email,password});
        set({user:res.data.user, loading:false});
        toast.success(res.data.message);
    } catch (error) {
        set({loading:false});
        toast.error(error.response.data.message || "Something went wrong");
    }
    },

    login: async({email,password}) => {
        set({loading:true});

        try {
            const res = await axios.post("/auth/login", {email,password});
            set({user:res.data.user, loading:false});
            console.log("user",res.data);
            toast.success(res.data.message);
        } catch (error) {
            set({loading:false});
            toast.error(error.response.data.message || "Something went wrong");
        }
    },

    logout: async () => {
        try {
            await axios.post("/auth/logout");
            set({user:null});
        } catch (error) {
            toast.error(error.response.data.message || "Error while logging out");
        }
    },

    checkAuth : async () => {
        try {
            const res = await axios.get("/auth/profile");
            set({ user: res.data.user, checkingAuth: false });
        } catch {
            set({checkingAuth:false, user:null});
        }
    },

    async refreshToken() {
        if(get().checkingAuth) return; // Don't refresh token while checking auth
        try {
            const res = await axios.post("/auth/refreshToken");
            set({checkingAuth:false});
            return res;
        } catch (error) {
            set({checkingAuth:false, user:null});
            throw error;
        }
    }
    //TODO: Implement axios interceptors for refresh token 

    
    }
))

let refreshPromise = null;
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config; // Store the original request
        if (error.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
        
         try {

            if(refreshPromise){
            await refreshPromise;
            return axios(originalRequest);
         }

         refreshPromise = useUserStore.getState().refreshToken();
         await refreshPromise;
         refreshPromise = null;
         return axios(originalRequest);
        

         }catch (refresherror) {
            useUserStore.getState().logout();
            return Promise.reject(refresherror);
         }
        }   
        return Promise.reject(error);  
    }
);

