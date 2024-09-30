import React, { useEffect, useState } from "react";
import { convertDashedToCapitalized } from "../../../../utils";
import expenseData from "../../mocks/expense.json";
import { useAppContext } from "../../../../context/AppContext";

const items = [
  { val: "all", icon: "fa-solid fa-layer-group" },
  { val: "EB", icon: "fa-solid fa-bolt" },
  { val: "grocery", icon: "fa-solid fa-cart-shopping" },
  { val: "health", icon: "fa-solid fa-heart-pulse" },
  { val: "internet", icon: "fa-solid fa-globe" },
  { val: "transport", icon: "fa-solid fa-bus" },
  { val: "children", icon: "fa-solid fa-child" },
  { val: "gas", icon: "fa-solid fa-gas-pump" },
  { val: "food", icon: "fa-solid fa-utensils" },
  { val: "entertain", icon: "fa-solid fa-ticket" },
  { val: "clothing", icon: "fa-solid fa-shirt" },
  { val: "decor", icon: "fa-solid fa-couch" },
  { val: "others", icon: "fa-solid fa-ellipsis" },
];

const Item: React.FC<{
  icon: string;
  val: string;
  isSelected: boolean;
  handleType: (val: string) => void;
}> = (props) => {
  return (
    <div>
      <button
        className={`mx-2 text-black p-2 px-3 min-w-12 ${
          props.isSelected ? "bg-primary text-white" : "bg-grey text-grey-dark"
        } rounded-lg`}
        onClick={() => props.handleType(props.val)}
      >
        <i className={`${props.icon} text-xl`}></i>
      </button>
      <span
        className={`text-xs font-medium ${
          props.isSelected ? "text-primary" : "text-grey-dark"
        }`}
      >
        {convertDashedToCapitalized(props.val)}
      </span>
    </div>
  );
};

const ListItem: React.FC<{
  paidTo: string;
  amount: number;
  type: string;
  category: string;
}> = (props) => {
  const iconClass = items.find(({ val }) => props.category === val);

  return (
    <div className="flex items-center mx-4 my-2">
      <button
        className={`mx-2 shrink-0 text-black p-2 px-3 bg-primary-light text-primary rounded-lg min-w-12`}
      >
        <i className={`${iconClass?.icon} text-xl`}></i>
      </button>
      <div className="p-1 grow text-left">
        <h3 className="text-black font-medium">{props.paidTo}</h3>
        <p className="text-sm text-grey-dark">
          {convertDashedToCapitalized(props.category)}
        </p>
      </div>
      <h2 className="font-bold text-xl text-black mx-2">
        ₹ {props.amount.toFixed(2)}
      </h2>
    </div>
  );
};

const ItemList: React.FC = () => {
  const { state } = useAppContext();

  const [type, setType] = useState<string>("all");

  const initialTop = 400;

  const [top, setTop] = useState(initialTop);

  const handleSwipeUp = () => {
    if (top === 0) {
      setTop(initialTop);
    } else {
      setTop(0);
    }
  };

  const handleType = (val: string) => {
    setType(val);
  };

  useEffect(() => {
    if (state.expenseView === "month") {
      setTop(480);
    } else {
      setTop(initialTop);
    }
  }, [state.expenseView]);

  return (
    <div
      className="absolute left-0 rounded-2xl bg-white text-center h-screen w-full"
      style={{
        top: top,
        height: `calc(100vh - ${top}px)`,
        transition: "all 250ms ease-in-out",
      }}
    >
      <button onClick={handleSwipeUp}>
        <i
          className={`fa-solid fa-angle-${
            top === 0 ? "down" : "up"
          } text-grey-dark fa-2x`}
        ></i>
      </button>
      <div className="flex justify-between overflow-x-auto no-scrollbar px-4 py-2">
        {items.map((item, index) => (
          <Item
            {...item}
            key={index}
            handleType={handleType}
            isSelected={type === item.val}
          />
        ))}
      </div>
      <div
        className="h-full overflow-y-auto no-scrollbar"
        style={{ height: "calc(100% - 120px)" }}
      >
        {expenseData
          .filter(({ category }) => type === "all" || category === type)
          .map((expense, i) => {
            return <ListItem key={i} {...expense} />;
          })}
      </div>
    </div>
  );
};

export default ItemList;
