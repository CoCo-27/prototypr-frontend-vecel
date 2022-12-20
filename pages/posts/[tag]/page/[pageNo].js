import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "@/components/container";
const NewPagination = dynamic(() => import("@/components/pagination"));
// import Layout from '@/components/layout'
import Layout from "@/components/layoutForBlogPost";
import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";

import { getAllPostsForPostsPage, getPostsByPageForPostsPage } from "@/lib/api";
// import Head from 'next/head'
import { transformPostList } from "@/lib/locale/transformLocale";
import { useState } from "react";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
import { Waypoint } from "react-waypoint";
import Link from "next/link";
const Aspiring = dynamic(() => import("@/components/new-index/Aspiring"));
const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
const ProductList = dynamic(() => import("@/components/new-index/ProductList"));
// const TopicTopItem = dynamic(() => import("@/components/new-index/TopicTopItem"), { ssr: false });

const PAGE_SIZE = 10;
const ALL_TAGS = [
  "ux",
  "user-research",
  "ui",
  "color",
  "career",
  "interview",
  "accessibility",
  "code",
  "vr",
];
export default function PostsPage({
  allPosts = [],
  heroPost = null,
  morePosts = [],
  preview,
  pagination = {},
  // firstPost = [],
  tag = "",
  pageNo = 1,
  tagName = "",
}) {
  const router = useRouter();

  const onPageNumChange = (pageNum) => {
    router.push(`/posts/${tag}/page/${pageNum}`);
  };
  if (tagName == "Interview") {
    tagName = "Interviews";
  } else if (tagName == "UX") {
    tagName = "UX Design";
  } else if (tagName == "UI") {
    tagName = "UI Design";
  }

  return (
    <>
      <Layout
        seo={{
          title: `${tagName} | design articles on Prototypr | Page ${pagination?.page}`,
          description: `Articles on ${tagName} - design content open and accessible to everyone, no paywall here.`,
          //   image: "",
          canonical: `https://prototypr.io/posts/${tag}/page/${pagination?.page}`,
          url: `https://prototypr.io/posts/page/${tag}/${pagination?.page}`,
        }}
        activeNav={"posts"}
        preview={preview}
      >
        <Container>
          <div className="w-full h-full grid grid-cols-12 gap-1  ">
            <div className="pt-28 max-w-[46rem]  px-3 md:px-8 xl:px-0 w-full mx-auto pb-20 gap-2 col-span-12 lg:col-span-8 py-10">
              <div className="pt-5 text-md text-gray-700">
                <Link href={`/`}>
                  <span className="hover:underline">Home</span>
                </Link>{" "}
                →{" "}
                <Link href={`/topics`}>
                  <span className="hover:underline">Topics</span>
                </Link>{" "}
                →{" "}
                <Link href={`/posts/${{ tagName }}/page/1`}>
                  <span className="underline capitalize">{tagName}</span>
                </Link>
              </div>
              <div className="flex justify-between">
                <h2 className="font-bold text-3xl md:text-5xl text-left my-8">
                  {tagName}
                </h2>
                <div className="flex flex-col justify-center">
                  <span
                    className="text-gray-800 hover:bg-blue-50 font-normal hover:text-blue-600 bg-gray-200 px-6 hover:bg-gray-200 py-2 text-center font-inter tracking-tight cursor-pointer cursor w-full text-base rounded-full text-gray-500  "
                    style={{ borderColor: "rgb(235, 239, 246)" }}
                  >
                    Follow topic
                  </span>
                </div>
              </div>

              {/* <section className={`mt-10`}>
                  {firstPost?.length > 0 &&
                    firstPost.map((item, index) => {
                      return <EditorPick2 post={item} showTitle={false} />;
                      // return <TopicTopItem key={`topic_${index}`} topic={item} />
                    })}
                </section> */}
              {/* {heroPost && <EditorPick2 post={heroPost} showTitle={false} />} */}
              {morePosts && <ProductList posts={morePosts} />}

              <NewPagination
                total={pagination?.total}
                pageSize={PAGE_SIZE}
                currentPage={pagination?.page}
                onPageNumChange={(pageNum, tag) => {
                  onPageNumChange(pageNum, tag);
                }}
              />
            </div>
            {/* <div className="hidden md:block pt-[64px] relative col-span-4 max-w-[410px] border-l border-opacity-20"> */}
            <Sidebar
              // author={post.attributes?.author?.data?.attributes}
              // relatedPosts={relatedPosts}
              paddingTop="hidden md:block pt-[126px]"
            />
            {/* </div> */}
          </div>
        </Container>
      </Layout>
    </>
  );
}

const Sidebar = ({ relatedPosts, paddingTop, author }) => {
  const [stickyPaddingTop, setStickyPaddingTop] = useState("pt-0");

  const _handleWaypointEnter = () => {
    setStickyPaddingTop("pt-0");
  };
  const _handleWaypointLeave = () => {
    setStickyPaddingTop("pt-32");
  };

  return (
    <div
      className={`${paddingTop} relative col-span-4 max-w-[410px] border-l border-opacity-20`}
    >
      <Waypoint onEnter={_handleWaypointEnter} onLeave={_handleWaypointLeave} />
      <div
        className={`${stickyPaddingTop} absolute transition transition-all duration-300 sticky top-0 min-h-screen hidden lg:block`}
      >
        <aside className="h-screen px-10 sticky top-0 py-0">
          <div className="flex flex-col grid gap-6">
            <PrototyprNetworkCTA />
            <div>
              {/* EMAIL FORM */}
              <div className="w-full bg-blue-100 rounded-xl p-5 border border-gray-200">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Get the roundup
                </h3>
                <p className="text-base text-gray-500 mb-6">
                  Get a curated selection of the best articles and topics from
                  Prototypr in your inbox.
                </p>
                <SignupSidebar />
              </div>

              <div className="mt-6">
                <SponsorSidebarCard />
              </div>
            </div>

            {/* <div className="w-full flex flex-col grid gap-2">

            {relatedPosts?.data?.length > 0 &&
              relatedPosts.data.map((item, index) => {
                return (
                  <ProductItem key={`product_item_${index}`} post={item} />
                  // <TopicTopItem key={index} topic={item}/>
                );
              })}
            </div> */}
          </div>
        </aside>
      </div>
    </div>
  );
};

export async function getStaticProps({ preview = null, params, locale }) {
  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale === "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }
  const pageSize = PAGE_SIZE;
  const { pageNo, tag } = params;

  let allPosts =
    (await getPostsByPageForPostsPage(
      preview,
      pageSize,
      pageNo,
      [tag],
      sort
    )) || [];

  let tags = allPosts[1];
  allPosts = allPosts[0];
  const pagination = allPosts.meta.pagination;

  let nextPosts = [],
    morePosts = [],
    heroPost = null;

  allPosts = transformPostList(allPosts.data, locale);

  // otherwise, just send back the list without splicing
  // firstPost = allPosts.slice(0, 1);
  // morePosts = allPosts.slice(1);
  morePosts = allPosts;

  nextPosts = allPosts;

  return {
    props: {
      allPosts: nextPosts,
      preview,
      pagination,
      tag,
      tagName: tags?.data[0]?.attributes?.name,
      pageNo,
      morePosts,
      heroPost,
    },
    revalidate: 20,
  };

  // const interviews =
  // (await getCommonQuery(preview, [tag], "article", 4, 0)) || [];

  // console.log("interview data from home***********" + JSON.stringify(interviews))
}

export async function getStaticPaths() {
  let pageCountArr = [];

  for (var z = 0; z < ALL_TAGS.length; z++) {
    const allPosts =
      (await getAllPostsForPostsPage(null, PAGE_SIZE, 0, [ALL_TAGS[z]])) || [];
    const pagination = allPosts.meta.pagination;
    const pageCount = pagination.pageCount;
    let arr = new Array(pageCount).fill("");
    let newArr = arr.map((i, index) => {
      return `/posts/${ALL_TAGS[z]}/page/${index + 1}`;
    });
    pageCountArr = pageCountArr.concat(newArr);
  }

  return {
    paths: pageCountArr || [],
    fallback: true,
  };
}
