import { useState } from "react";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
// import SidePanelJobs from "@/components/v4/layout/SidePanelJobs";
import SidePanelAuthors from "@/components/v4/layout/SidePanelAuthors";
import Divider from "@/components/v4/layout/Divider";
import { Waypoint } from "react-waypoint";
import { SIDEBAR_STICKY_OFFSET } from "@/lib/constants";
import TopicsCloudCard from "../card/TopicsCloudCard";

const SidebarDiscover = ({ authorsList = [], paddingTop, topic, showTopicCloud }) => {
  let slicedList = authorsList && [...authorsList.slice(0, 4)];

  const [stickyPaddingTop, setStickyPaddingTop] = useState("pt-3");

  const _handleWaypointEnter = () => {
    setStickyPaddingTop("pt-0");
  };
  const _handleWaypointLeave = () => {
    setStickyPaddingTop(SIDEBAR_STICKY_OFFSET);
  };

  return (
    <div className={`${paddingTop} relative col-span-3`}>
       <Waypoint onEnter={_handleWaypointEnter} onLeave={_handleWaypointLeave} />
      <div
        className={`${stickyPaddingTop} transition-all sticky duration-500 top-0 hidden lg:block`}
      >
        <aside className=" top-0 py-0">
          <div className="flex flex-col grid gap-4 max-w-[320px] mx-auto">
            <div className="w-full flex flex-col grid gap-2">
              <SidePanelAuthors list={slicedList} topic={topic} />
            </div>
          </div>
         {showTopicCloud?
         <>
          <Divider/>
         <TopicsCloudCard title={'More topics'} />
         </>
         :''}

          <Divider/>
          <SponsorSidebarCard
            sponsorLocation="homepage_bottom_sidebar"
            page={"/"}
          />
        </aside>
      </div>
    </div>
  );
};

export default SidebarDiscover;
