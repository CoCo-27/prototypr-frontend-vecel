// only published posts should be revalidated
//

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const { entry } = req.body;
    // revalidate posts
    if (entry.type=='article' && (entry.status === "publish" || entry.publishedAt)) {
      console.log("revalidating published post :", entry.slug);
      const url = `/post/${entry.slug}`;
      await res.revalidate(url);
      return res.json({ revalidated: true });
    } 
    //revalidate jobs
    else if(entry.publishedAt){
      console.log("revalidating job post :", entry.slug);
      const url = `/jobs/${entry.id}`;
      await res.revalidate(url);
      return res.json({ revalidated: true });
    }
    // revalidate tools
    else if(entry.type=='tool' && entry.publishedAt){
      console.log("revalidating tool post :", entry.slug);
      const url = `/toolbox/${entry.slug}`;
      await res.revalidate(url);
      return res.json({ revalidated: true });
    }
    else {
      return res.json({ revalidated: false });
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
