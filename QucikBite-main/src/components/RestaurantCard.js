import { useContext } from "react";
import UserContext from "../utils/UserContext";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { loggedInUser } = useContext(UserContext);
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    resData?.info;
  return (
    <div className="m-3 p-4 w-[260px] h-[430px] rounded-lg bg-slate-100 hover:bg-gray-300">
      <img
        className="rounded-lg w-60 h-44"
        alt="res-logo2"
        src={CDN_URL + cloudinaryImageId}
      ></img>
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4 className="break-words">{cuisines.join(",")}</h4>
      <h4>⭐️{avgRating} stars</h4>
      <h4>{costForTwo}</h4>
      <h4>⏱️{sla.deliveryTime} Minutes</h4>
      <h4>👤 : {loggedInUser}</h4>
    </div>
  );
};

export default RestaurantCard;
