import { useSearchParams } from "react-router-dom";

function UseUrlSlug() {
  const [searchParams, setSerchParams] = useSearchParams();

  const slug = searchParams.get("slug");

  return slug;
}

export default UseUrlSlug;
