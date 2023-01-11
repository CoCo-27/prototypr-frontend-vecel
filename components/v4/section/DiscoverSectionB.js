import SidebarDiscover from "@/components/v4/layout/SidebarDiscover";
import Container from "@/components/container";
import LargePostGridB from "@/components/v4/layout/LargePostGridB";
// import {RssSimple} from 'phosphor-react'
const DiscoverSection = ({user, heroCardPost, viewablePosts, jobsSidebar }) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <div className="w-full h-full grid grid-cols-12 flex justify-center">
        <div className={`w-full max-w-full flex flex-col gap-2 col-span-12 py-3 ${!user?.isLoggedIn?'pt-6':''}`}>
          <LargePostGridB largePost={heroCardPost} smallPosts={viewablePosts} />
        </div>
        {/* <SidebarDiscover
          paddingTop="hidden ml-4 pl-6 lg:block pt-12"
          content={jobsSidebar}
        /> */}
      </div>
    </Container>
  );
};

export default DiscoverSection;
