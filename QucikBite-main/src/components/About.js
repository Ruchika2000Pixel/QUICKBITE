import User from "./User";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";
const About = () => {
  return (
    <div>
      <h1 className="text-bold">About</h1>
      <div>
        <UserContext.Consumer>
          {({ loggedInUser }) => (
            <h1 className="text-xl font-bold">{loggedInUser}</h1>
          )}
        </UserContext.Consumer>
      </div>
      <UserClass name={"Adityavyshnav Class"} />
    </div>
  );
};
export default About;
