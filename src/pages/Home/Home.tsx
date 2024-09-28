import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import AddExpense from "./AddExpense";

const Home = () => {
  const { state, dispatch } = useAppContext();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Dispatch the logout action
    dispatch({ type: "LOGOUT_USER" });

    // Optionally, redirect the user or show a message
    // e.g., using React Router's useNavigate
  };

  if (!state.isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4">
        <h1 className="text-3xl font-bold mb-4">Expense Dashboard</h1>
        {/* Other components like charts, tables, etc. */}
      </div>
      <AddExpense />
      <button
        onClick={handleLogout}
        className="absolute top-2 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg"
      >
        Logout
      </button>
    </>
  );
};

export default Home;
