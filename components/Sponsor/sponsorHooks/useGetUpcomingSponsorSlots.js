import { useEffect, useState } from "react";
import { getUpcomingSponsorSlots } from "@/lib/api";

const useGetUpcomingSponsorSlots = ({user, type}) => {
  const [slots, setSlots] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (user) {
    //   setLoading(true);

    // }
    refetch();
  }, []);

  const refetch = async () => {
      console.log("getting bookings");
      //load data
      await getBookings();
      setLoading(false);
  };

  const getBookings = async () => {
    setLoading(true);

    try {
      const allSponsorSlots = await getUpcomingSponsorSlots({type});     
      console.log(allSponsorSlots)   
      setSlots(allSponsorSlots)

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return {
    loading,
    slots
  };
};

export default useGetUpcomingSponsorSlots;
