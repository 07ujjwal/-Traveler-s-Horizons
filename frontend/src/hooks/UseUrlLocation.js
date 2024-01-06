import { useSearchParams } from "react-router-dom";

function UseUrlLocation() {
  const [searchParams, setSerchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}

export default UseUrlLocation;
