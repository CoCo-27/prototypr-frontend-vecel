export default  `
query ToolsPage ($pageSize: Int, $page: Int){
    posts(sort: "date:desc", pagination:{pageSize:$pageSize,page:$page}, filters:{type:{eq:"tool"}}) {
      meta{
          pagination{
          total
          pageSize
          page
          pageCount
          }
      }
      data {
        attributes {
          title
          status
          slug
          excerpt
          date
          legacyFeaturedImage:legacyMedia{
              mediaItemUrl:featuredImage
              imgUrl
              logoNew
          }
          author {
            data {
              attributes {
                displayName
                firstName
                lastName
                avatar
              }
            }
          }
        }
    }
  }
}
`