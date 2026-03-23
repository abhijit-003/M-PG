import { useAuth as useAuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const useAuthHook = () => useAuthContext();

export default useAuthHook;
export { useAuthHook as useAuth };


