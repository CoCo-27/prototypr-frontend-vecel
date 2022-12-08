import dynamic from "next/dynamic";
import jsCookie from "js-cookie";
import {useState, useEffect} from 'react'
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
const ProfileBadge = dynamic(() => import("../ProfileBadge"));
const NewsletterNav = dynamic(() => import("../NewsletterNav"), {
  ssr: true,
});
  // Exports
const NavigationMenuItem = NavigationMenuPrimitive.Item;

const UserMenu = ({user, userLoading}) =>{

    const [clientMounted, setClientMounted] = useState(false)
    useEffect(()=>{
      setClientMounted(true)
    },[])

  /**
   * use the logged in true/false cookie
   * so there is minimal flicker between subscribe and log in button
   */
  const [userLoggedInCookie] = useState(() => {
    let loggedInCookie = jsCookie.get("prototypr-loggedIn");
    if (loggedInCookie == "true") {
      return true;
    } else {
      return false;
    }
  });

    return(
        <>
          {clientMounted? 
       <NavigationMenuItem className="flex flex-col justify-center">
          {(user && user?.isLoggedIn) ? (
            <div className="ml-2 w-8">
                {user && 
                  <ProfileBadge
                  user={user}
                    icon={
                      <img
                        className="hover:shadow border border-1 rounded-full my-auto w-8 h-8 cursor-pointer object-cover"
                        src={user?.avatar?.url?user.avatar.url:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}
                      />
                    }
                  />}
            </div>
          ) : userLoading && userLoggedInCookie ? (
            <div className="bg-gray-200 hover:shadow border border-1 ml-2 rounded-full my-auto w-8 h-8 cursor-pointer"></div>
          ) : (
            <NewsletterNav collapsed={false} />
          )}
        </NavigationMenuItem>:
        userLoggedInCookie?
        <NavigationMenuItem className="flex flex-col justify-center">
          <div className="bg-gray-200 hover:shadow border border-1 ml-2 rounded-full my-auto w-8 h-8 cursor-pointer"></div>
        </NavigationMenuItem>:
        <NavigationMenuItem className="flex flex-col justify-center">
           <NewsletterNav collapsed={false} />
        </NavigationMenuItem>
        }
        </>
    )

}

export default UserMenu