import { useRouter } from 'next/router'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
// import HeroPost from '@/components/hero-post'
// import Intro from '@/components/posts/intro'
import EditorPick2 from "@/components/new-index/EditorPick2";
import NewPagination from '@/components/pagination'
import Layout from '@/components/layout'
import { getAllPostsForPostsPage, getPostsByPageForPostsPage } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
const PAGE_SIZE = 12;
export default function PostsPage({allPosts = [], preview, pagination = {}}) {
    let heroPost;
    let morePosts = [];
    let coverImage;
    if (allPosts.length && pagination.page && pagination.page == 1) {
        heroPost = allPosts[0]
        morePosts = allPosts.slice(1)
        coverImage = heroPost.attributes.legacyFeaturedImage ? heroPost.attributes.legacyFeaturedImage:''
    }
    const router = useRouter()

    const onPageNumChange = (pageNo) => {
        router.push(`/posts/page/${pageNo}`)
    }

    return (
        <>
          <Layout activeNav={"posts"} preview={preview}>
            <Head>
              <title>Open design and tech stories for everyone to read</title>
            </Head>
            <Container>
            {
                pagination.page && pagination.page == 1 && (
                    <>
                        {/* <Intro /> */}
                        {heroPost && (
                           <div className="pt-12">
                           <EditorPick2 header="Editor's Picks" post={heroPost} />
                          </div>
                        )}
                    </>
                )
            }
            {
                pagination.page && pagination.page == 1 ? (
                    morePosts.length > 0 && <MoreStories posts={morePosts} />
                ): (
                    allPosts.length > 0 && 
                    <div className="pt-8">
                      <MoreStories posts={allPosts} />
                    </div>
                )
            }

            <NewPagination 
                total={pagination?.total}
                pageSize={PAGE_SIZE}
                currentPage={pagination?.page}
                onPageNumChange={(pageNum) => {onPageNumChange(pageNum)}}
            />

            </Container>
          </Layout>
        </>
      )
}

export async function getStaticProps({ preview = null, params }) {
    const pageSize = PAGE_SIZE
    const page = params.pageNo
    let allPosts = (await getPostsByPageForPostsPage(preview, pageSize, page)) || []
    allPosts = allPosts[0]
    const pagination = allPosts.meta.pagination
    return {
      props: { allPosts:allPosts.data, preview, pagination },
    }
  }

  export async function getStaticPaths() {
      const allPosts = (await getAllPostsForPostsPage(null, PAGE_SIZE, 0)) || []
      const pagination = allPosts.meta.pagination
      const pageCount = pagination.pageCount
      const pageCountArr = new Array(pageCount).fill(' ')
      return {
        paths: pageCountArr && pageCountArr.map((pageNo) => {
            return `/posts/page/${pageNo}`
        }) || [],
        fallback: true,
      }
  }