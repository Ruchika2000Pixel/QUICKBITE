import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [ListOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");

  console.log("Body Rendered", ListOfRestaurants);

  //useffect is called every time my Component is every render
  // empty dependency is empty [] then useeffect is called on initial reneder(just once)
  // if somethig is there in dependency array ,then useeffect is called everytime my dependency changes
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.27467302258685&lng=85.84709487855433&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    console.log(json);
    setListOfRestaurants(
      json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredRestaurant(
      json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlinestatus = useOnlineStatus();

  if (onlinestatus === false)
    return <h1>Oops ! Looks like you are OFFLINE!!🐇🐰🐷🐽♥️</h1>;

  const { loggedInUser, setUserName } = useContext(UserContext);

  //Conditional-Rendering
  return (ListOfRestaurants || []).length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-2 p-2">
          <input
            type="text"
            className=" py-1 px-2 border border-solid my-6  border-black rounded-lg "
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className=" py-1 px-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              // filtered restaurant
              const filteredRestaurants = ListOfRestaurants.filter((resu) =>
                resu.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setfilteredRestaurant(filteredRestaurants);
            }}
          >
            🔍 Search
          </button>
        </div>
        <div className="search m-2  flex items-center">
          <button
            className="px-4 py-1 bg-gray-200 rounded-lg"
            onClick={() => {
              const filteredList = filteredRestaurant.filter(
                (res) => res.info.avgRating > 4.3
              );
              setfilteredRestaurant(filteredList);
            }}
          >
            🔝Top Rated Restaurants
          </button>
        </div>
        <div className="search m-4 p-4  flex items-center">
          <label>Username : </label>
          <input
            className="border border-black px-4 m-2 rounded-lg"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="res-container flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
