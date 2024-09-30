import { useAppContext } from "../../context/AppContext";
import Tabs from "./components/Tabs/Tabs";
import ItemList from "./components/Items/Items";

const Dashboard: React.FC = () => {
  const { state } = useAppContext();

  return (
    <div className="bg-primary text-white rounded-2xl">
      <div className="p-6 pb-0 pt-0 rounded-2xl">
        <p className="font-medium text-xl my-2">
          Hello,{" "}
          <span className="font-bold">
            {state.userDetails?.fullName.split(" ")[0]}!
          </span>
        </p>
        <Tabs />
      </div>
      <ItemList />
    </div>
  );
};

export default Dashboard;
