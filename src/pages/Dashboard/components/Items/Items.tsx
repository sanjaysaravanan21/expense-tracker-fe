import React, { useEffect, useState } from "react";
import { convertDashedToCapitalized } from "../../../../utils";
import { useAppContext } from "../../../../context/AppContext";
import CategoryItem from "../../../../components/common/CategoryItem";
import items from "../../mocks/expense-types.json";

const ListItem: React.FC<{
  paidTo: string;
  amount: number;
  type: string;
  category: string;
}> = (props) => {
  const iconClass = items.find(({ val }) => props.category === val);

  return (
    <div className="flex gap-x-2 items-center mx-4 my-2">
      <button
        className={`shrink-0 text-black p-2 px-3 bg-primary-light text-primary rounded-lg min-w-12`}
      >
        <i className={`${iconClass?.icon} text-xl`}></i>
      </button>
      <div className="p-1 grow max-w-44 text-left">
        <h3 className="text-black font-medium">{props.paidTo}</h3>
        <p className="text-sm text-grey-dark">
          {convertDashedToCapitalized(props.category)}
        </p>
      </div>
      <h2 className="font-bold grow text-xl text-black text-right">
        ₹ {Math.floor(props.amount)}
      </h2>
    </div>
  );
};

const ItemList: React.FC = () => {
  const { state } = useAppContext();

  const [type, setType] = useState<string>("all");

  const initialTop = 400;

  const [top, setTop] = useState(initialTop);

  const handleOverlayValue = () => {
    if (state.expenseView === "month") {
      setTop(500);
    } else if (state.expenseView === "week") {
      setTop(410);
    } else {
      setTop(initialTop);
    }
  };

  const handleSwipeUp = () => {
    if (top === 0) {
      handleOverlayValue();
    } else {
      setTop(0);
    }
  };

  const handleType = (val: string) => {
    setType(val);
  };

  useEffect(() => {
    handleOverlayValue();
    setType("all");
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
      <div className="flex gap-x-2 justify-between overflow-x-auto no-scrollbar px-4 py-2">
        {items.map((item, index) => (
          <CategoryItem
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
        {state.groupDays
          ? state.groupDays.map(({ date }) => {
              const dayItems = (
                state.items.filter((item) => item.date === date) || []
              ).filter(({ category }) => type === "all" || category === type);
              if (dayItems.length === 0) {
                return <span key={date}>"No Records Found"</span>;
              }
              return (
                <div key={date}>
                  <h3 className="text-xs font-medium mx-4 text-left text-grey-dark">
                    {date}
                  </h3>
                  {dayItems.map((expense, i) => {
                    return <ListItem key={i} {...expense} />;
                  })}
                </div>
              );
            })
          : (state.items || [])
              .filter(({ category }) => type === "all" || category === type)
              .map((expense, i) => {
                return <ListItem key={i} {...expense} />;
              })}
      </div>
    </div>
  );
};

export default ItemList;
