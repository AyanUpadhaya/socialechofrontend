import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTanstackQuery = (queryKey, queryFn) => {
  return useQuery(queryKey, queryFn);
};

export default useTanstackQuery;
