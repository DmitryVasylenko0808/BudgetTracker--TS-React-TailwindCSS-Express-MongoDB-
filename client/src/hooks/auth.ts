export const useAuth = () => {
    const token = localStorage.getItem("token");
    
    return { isAuthorized: !!token, token };
};