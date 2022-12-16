import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import useUser from "@/lib/iron-session/useUser";

const TopicTopItem = dynamic(
  () => import("@/components/new-index/TopicTopItem"),
  { ssr: true }
);
import ProductItem from "@/components/new-index/ProductItem";

const PostHeader = dynamic(() => import("@/components/post-header"), {
  ssr: true,
});
const AuthorBio = dynamic(() => import("@/components/authorBio"), {
  ssr: true,
});
const SourcePanel = dynamic(() => import("@/components/new-index/SourcePanel"));
import { useIntl } from "react-intl";

import Layout from "@/components/new-index/layoutForIndex";
import { getAllPostsWithSlug, getPost } from "@/lib/api";
const NoticeTranslation = dynamic(
  () => import("@/components/notice-translation"),
  { ssr: true }
);

import { transformPost, transformPostList } from "@/lib/locale/transformLocale";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Waypoint } from "react-waypoint";
import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";
const WMPostTracker = dynamic(() => import("@/components/WebMonetization/WMPostTracker"), {
  ssr: false,
});

export default function Post({ post, preview, relatedPosts }) {
  const router = useRouter();

  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });


  if (!router.isFallback && !post?.attributes?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  console.log(post.id)
  const title = post?.attributes?.seo?.opengraphTitle
    ? post?.attributes?.seo?.opengraphTitle
    : post?.attributes?.title && post.attributes.title;
  const description = post?.attributes?.seo?.opengraphDescription
    ? post?.attributes?.seo?.opengraphDescription
    : post?.attributes?.excerpt && post.attributes.excerpt;
  const image = post?.attributes?.seo?.opengraphImage
    ? post?.attributes?.seo?.opengraphImage
    : post?.attributes?.featuredImage?.data?.attributes?.url
    ? post?.attributes?.featuredImage?.data?.attributes?.url
    : post?.legacyFeaturedImage
    ? post?.legacyFeaturedImage?.mediaItemUrl
    : post?.ogImage
    ? post?.ogImage.opengraphImage
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  const canonical = post?.attributes?.seo?.canonical
    ? post?.attributes?.seo?.canonical
    : post?.attributes?.slug &&
      `https://prototypr.io/post/${post?.attributes.slug}`;
  const url = post?.attributes?.seo?.canonical
    ? post?.attributes?.seo?.canonical
    : post?.attributes?.slug &&
      `https://prototypr.io/post/${post?.attributes.slug}`;

  const paymentPointer =
    post?.attributes?.author?.data?.attributes?.paymentPointer;
  const intl = useIntl();

  useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("id", "twitter-widget");
    s.setAttribute("async", "true");

    if (!document.getElementById("twitter-widget")) {
      document.head.appendChild(s);
    }

    if(window.$crisp){
      // window.$crisp.push(["config", "position:reverse", true])
      // window.$crisp.push(['do', 'chat:close']);
      window.$crisp.push(['do', 'chat:hide']);
    }

  }, []);

  return (
    <Layout
      seo={{
        title: `${title}`,
        description: `${description}`,
        image: `${image}`,
        canonical: `${canonical}`,
        url: `${url}`,
        monetization: `${paymentPointer}`,
      }}
      background="#fff"
      activeNav={"posts"}
      preview={preview}
    >
      <Container>

      <div className="w-full h-full grid grid-cols-12 gap-1  ">
        {user?.isAdmin &&
        <div className="fixed bottom-0 mb-16 z-50 border border-gray-100 bg-white mr-16 right-0 p-4 rounded shadow">
        <p className="text-sm">Hi, Admin 👩‍✈️</p>
        <button className="p-1 mt-3 px-3 text-sm text-white bg-purple-600 shadow rounded">
            <Link href={`/p/${post?.id}`}>Edit</Link>
        </button>
        </div>
        }
        
        {/* <Alert preview={preview} /> */}
        <main className="pt-28 pb-20 gap-2 col-span-12 lg:col-span-8  md:pr-4 py-10">
          {(post?.id && (process.env.NODE_ENV==='production')) && 
          <WMPostTracker postId={post?.id} post={post}/>}
          <Container>
            {router.isFallback ? (
              <h1 className="text-6xl font-inter-serif font-semibold tracking-tighter leading-tight md:leading-tighter mb-5 text-center md:text-left">
                Loading
              </h1>
            ) : (
              <>
                <article>
                  {/* <Head> */}
                  {/* <title>
                  {post.attributes?.title} | Prototypr
                </title> */}
                  {/* <meta property="og:image" content={post.attributes.ogImage} /> */}
                  {/* </Head> */}
                  {!post.currentLocaleAvailable && <NoticeTranslation />}
                  <PostHeader
                    slug={post?.attributes?.slug}
                    title={post?.attributes?.title}
                    coverImage={
                      post?.attributes?.featuredImage?.data?.attributes?.url
                        ? post?.attributes?.featuredImage?.data?.attributes?.url
                        : post?.attributes?.legacyFeaturedImage
                        ? post?.attributes?.legacyFeaturedImage
                        : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                    }
                    date={post.attributes.date}
                    author={post.attributes?.author?.data?.attributes}
                    template={post.attributes?.template}
                  />
                  <div className="max-w-[45rem] mx-auto blog-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.attributes?.content,
                      }}
                    />
                  </div>
                </article>
                <div>
                  <AuthorBio
                    slug={post?.attributes?.slug}
                    title={post?.attributes?.title}
                    author={post?.attributes?.author?.data?.attributes}
                  />
                </div>
                {post.attributes?.template !== 2 && (
                  <SourcePanel
                    titleSize={"lg:text-5xl"}
                    className={
                      "w-full font-inter-serif mb-4 mt-16 border rounded-lg pb-0 pt-8 border-gray-100"
                    }
                    title={intl.formatMessage({ id: "newsletterPanel.title3" })}
                    desc={intl.formatMessage({ id: "newsletterPanel.desc3" })}
                  />
                )}
              </>
            )}
          </Container>
        </main>

        <Sidebar
        relatedPosts={relatedPosts}
        paddingTop="hidden md:block pt-[96px]"
      />
      </div>
      <section className="bg-gray-100">
        <hr className="border-accent-2" />
        <div
          style={{ maxWidth: "1200px" }}
          className="px-6 md:px-0 mx-auto pb-20 mt-20"
        >
          <h1 className="text-4xl font-inter-serif font-semibold -mt-3 mb-12">
            Related Posts
          </h1>
          <div className="mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {relatedPosts?.data?.length > 0 &&
              relatedPosts.data.map((item, index) => {
                return (
                  <ProductItem key={`product_item_${index}`} post={item} />
                  // <TopicTopItem key={index} topic={item}/>
                );
              })}
          </div>
        </div>
      </section>

      </Container>
    </Layout>
  );
}

const Sidebar = ({ relatedPosts, paddingTop }) => {

  const [stickyPaddingTop, setStickyPaddingTop] = useState("pt-0");

  const _handleWaypointEnter = () => {
    setStickyPaddingTop("pt-0");
  };
  const _handleWaypointLeave = () => {
    setStickyPaddingTop("pt-16");
  };

  return (
    <div
      className={`${paddingTop} relative col-span-2 border-l border-opacity-20`}
    >
      <Waypoint onEnter={_handleWaypointEnter} onLeave={_handleWaypointLeave} />
      <div
        className={`${stickyPaddingTop} absolute transition transition-all duration-300 sticky top-0 min-h-screen hidden lg:block`}
      >
        <aside className="  h-screen px-5 sticky top-0 py-0">
          <div className="flex flex-col grid gap-10 py-10">
          <div className="mt-[0]">
                <PrototyprNetworkCTA  />
              </div>

            <div className="w-full flex flex-col grid gap-2">

            {relatedPosts?.data?.length > 0 &&
              relatedPosts.data.map((item, index) => {
                return (
                  <ProductItem key={`product_item_${index}`} post={item} />
                  // <TopicTopItem key={index} topic={item}/>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export async function getStaticProps({ params, preview = null, locale }) {
  const data = await getPost(params.slug, preview);
  //if no post found, 404
  if (!data?.posts?.data[0]) {
    return {
      props: {
        post: null,
      },
      //   revalidate:30
    };
  }

  let relatedPosts = {};

  const postData = transformPost(data?.posts.data[0], locale);
  relatedPosts.data = transformPostList(
    data?.posts.data[0].attributes.relatedArticles,
    locale
  );
  //   console.log(data?.posts.data[0]?.attributes?.relatedArticles)

  return {
    props: {
      preview,
      post: {
        ...postData,
      },
      relatedPosts: relatedPosts,
    },
    // revalidate: 20,
  };
}

export async function getStaticPaths({ locales }) {
  const allPosts = await getAllPostsWithSlug("article", 5000);
  // const homePosts = await getCombinedPostsForHomeStatic()

  // let mergedSlugs = {
  //   ...allPosts,
  //   ...homePosts
  // };

  return {
    paths:
      (allPosts &&
        allPosts.data?.map((post) => {
          // console.log(post.attributes.slug)
          return `/post/${post.attributes.slug}`;
        })) ||
      [],
    fallback: "blocking",
  };
}
