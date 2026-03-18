import getWikiData from "./getWikiData";

export default async function Home({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const { page } = await searchParams;
  const year = new Date().getFullYear();

  // Default page if none is provided in the URL
  const activePage = page || "start"; 
  const pageData = await getWikiData(activePage);

  return (
    <>
      <main 
        dangerouslySetInnerHTML={{ __html: pageData}} 
        className='wiki' 
      />
      <footer>
        <br /><hr />
        <span>© {year} | Kyle Tolliver - Wiki</span>
      </footer>
    </>
  );
}
