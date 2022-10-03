const slugify = require("slugify");
const qs = require("qs");

export const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  

export function generateImageTypes(url) {
    const breakpoints = [
      { w: 300, h: 131 },
      { w: 768, h: 336 },
      { w: 1024, h: 448 },
      { w: 1400, h: 600 },
    ];
    const splitString = url?.split(".");
    const extention = splitString[splitString.length - 1];
    const mediaURL = splitString.slice(0, -1).join(".");
  
    const urls = breakpoints.map(
      (breakpoint) =>
        `${mediaURL}-${breakpoint?.w}x${breakpoint?.h}.${extention} ${breakpoint.w}w`
    );
    return urls.join(",");
  }
  
export function getImageExtention(url) {
    const splitString = url.split(".");
    const extention = splitString[splitString.length - 1];
  
    return extention;
  }
  
 export const getPostDetails = (user, editor, slug, forReview, postStatus) => {

  const html = editor.getHTML();
    const json = editor.getJSON()?.content;

    let docNode = editor?.view?.state?.doc
    let title = ''
    docNode.descendants((node, pos) => {
      if(title){
        return false
      }
      if(node.type.name=='heading' && node.attrs.level==1){
        title = node.textContent 
        return false
      }
    })
    if(!title){
      title='Untitled post'
    }

    //remove title from content body
    let div = document.createElement('div')
    div.innerHTML = html

    let headings = div.querySelectorAll('h1')
    for(var x =0;x<headings.length;x++){
      if(headings[x].innerText==title){
        headings[x].remove()
        break;
      }
    }
    
      const firstParagraph = json
      .find((p) => p?.type === "paragraph")
      ?.content?.find((x) => x.type === "text")?.text;
   
      const coverImage = json.find((p) => p?.type === "figure")?.attrs?.src;
    // append an id at the end of the slug
    let postSlug;

    // when creating a new post, create a unique slug
    if (!slug) {
      postSlug = slugify(title.toLocaleLowerCase()) + `-${uid()}`;
    } else {
      // in edit draft mode, use existing slug passed down from the parent component
      postSlug = slug;
    }

    const query = qs.stringify(
      {
        filters: {
          slug: {
            $eq: postSlug,
          },
        },
        populate: "*",
        fields: ["slug"],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    let findPostEndpointConfigs = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts?${query}`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },
    };

    let contentToInsert = html
    if(div?.innerHTML && div.innerHTML.length>5){
      contentToInsert = div?.innerHTML
    }

    let entry = {
      excerpt: firstParagraph,
      featured: false,
      type: "article",
      legacyFeaturedImage: {},
      date: new Date(),
      status: forReview?"pending":postStatus?postStatus:"draft",
      title: title,
      content:contentToInsert,
      user: user?.id,
      //   featuredImage: coverImage,
      legacyFeaturedImage: {
        mediaItemUrl: coverImage || "",
        srcSet: generateImageTypes(coverImage || ""),
        thumb: `${coverImage}-150x150.${getImageExtention(coverImage || "")}`,
        medium: `${coverImage}-768x336.${getImageExtention(coverImage || "")}`,
      },
      seo: {
        opengraphTitle: title,
        metaDesc: firstParagraph,
        opengraphDescription: firstParagraph,
        opengraphImage: coverImage,
        opengraphPublishedTime: new Date(),
        //  schemaSeo: item.seo.schema.raw,
      },
      esES: false,
      slug: postSlug,
    };
    return {
      entry,
      findPostEndpointConfigs,
    };
  };