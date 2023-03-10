import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getUserArticle } from "@/lib/api";
import { getSlugFromArticleId } from "@/lib/api";
import * as Sentry from "@sentry/nextjs";

const useLoad = (type = "create", usr) => {
  const [user, setUser] = useState(usr);
  const [postId, setPostId] = useState(true);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [postStatus, setStatus] = useState("draft");
  const [content, setContent] = useState(null);
  const [editorType] = useState(type);
  const [articleSlug, setArticleSlug] = useState(null);
  const [isOwner, setIsOwner] = useState(false)
  const [postObject, setPostObject] = useState(false)

  const router = useRouter();
  const { slug } = router.query;
  //TODO: fetch slug from backend

  useEffect(()=>{
    if(!user){
      setUser(usr)
    }
  },[usr])

  useEffect(() => {
    if (user) {
      setLoading(true);
      
      refetch();
      Sentry.captureMessage(`#33 l29 userId: ${user?.id}`, {extra:user});

    }
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      const { userPostId } = await getSlugFromArticleId(user, slug);
      const postSlug = userPostId?.slug;
      setArticleSlug(postSlug);
    }
    if (user && slug) {
      fetchData();
    }
  }, [slug, user]);

  const refetch = async () => {
    if (slug) {
      console.log("loading from backend");
      //load data
      await getCurrentPost();
      // todo
      // setContent(content);
      setLoading(false);
    } else {
      console.log("loading from local");
      let retrievedObject = localStorage.getItem("wipContent");
      if (retrievedObject) {
        setContent(JSON.parse(retrievedObject));
        setLoading(false);
      } else {
        //it's a new post
        setLoading(false);
      }
    }
  };

  const getCurrentPost = async () => {
    setLoading(true);

    try {
      const data = await getUserArticle(user, slug);

      const post = data.userPostId;
      Sentry.captureMessage(`#33 l73 getUserArticle: ${post?.id}`, {extra:data});

      let content = post?.content;

      //if title isn't part of body, add it in
      if (post?.title && content.indexOf(post?.title) == -1) {
        content = `<h1>${post?.title}</h1>${content}`;
      }
      //only allow owner of post, and post type article
      if((user && ((post?.owner==user?.id) && post?.type==='article')) || user.isAdmin){
        setIsOwner(true)
      }else{

        Sentry.captureMessage(`#33 userId: ${user?.id}`, {extra:user});
        Sentry.captureMessage(`#33 l87 postOwner: ${user?.id}`, {extra:post});
        setIsOwner(false)
      }
    
      setPostObject(post)
      setPostId(post?.id);
      setContent(content);
      setTitle(post?.title);
      setStatus(post?.status);

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return {
    loading,
    content,
    postId,
    title,
    editorType,
    slug,
    postStatus,
    articleSlug,
    isOwner,
    postObject
  };
};

export default useLoad;
