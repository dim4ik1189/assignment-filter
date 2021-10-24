import { useEffect, useState } from "react";
import useSWR from "swr";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Filters from "../Filters";
import Pagination from "../Pagination";
import { Edge } from "../../types";
import {
  CardContainer,
  LoadingContainer,
  NameContainer,
  ListContainer,
} from "./styled";

const PER_PAGE = 18;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EdgesList: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [pageStart, setPageStart] = useState<number>(0);
  const [pageEnd, setPageEnd] = useState<number>(PER_PAGE);

  useEffect(() => {
    if (Number(router.query.page) >= 0) {
      setPage(Number(router.query.page) - 1);
    }

    if (router.query.shoe_type) {
      if (!router.query.page) {
        setPage(0);
      }
    }
  }, [router.query.page, router.query.shoe_type]);

  useEffect(() => {
    setPageStart(PER_PAGE * page);
    setPageEnd(PER_PAGE * page + PER_PAGE);
  }, [page]);

  const { data: edges, error } = useSWR(
    "http://localhost:4000/api/edges",
    fetcher
  );

  if (error) return <div>Error</div>;
  if (!edges) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  const handlePageChange = ({ selected }: { selected: number }): void => {
    if (page < Math.ceil(edges?.length / PER_PAGE)) {
      router.push({
        query: {
          ...(router?.query?.shoe_type && {
            shoe_type: router?.query?.shoe_type,
          }),
          ...(router?.query?.colour && { colour: router?.query?.colour }),
          page: selected + 1,
        },
      });
    }
  };
  let filteredEdgesTotalPages;

  const filteredEdges = (edges: Array<Edge>): Array<Edge> => {
    let filteredEdges: Array<Edge> = [];
    let flagHasBeenFiltered = false;
    const { shoe_type, colour, range_start, range_end } = router?.query;

    if (shoe_type) {
      filteredEdges = edges.filter((edge: Edge) =>
          edge.node?.categoryTags
              ?.toString()
              ?.includes(shoe_type as string)
      );
      filteredEdgesTotalPages = Math.ceil(
          filteredEdges?.length / PER_PAGE
      );
      flagHasBeenFiltered = true;
    }

    if (colour) {
      filteredEdges = (flagHasBeenFiltered ? filteredEdges : edges).filter(
        (edge: Edge) =>
          edge.node?.colorFamily?.[0].name.includes(
            colour as string
          )
      );
      filteredEdgesTotalPages = Math.ceil(filteredEdges?.length / PER_PAGE);
      flagHasBeenFiltered = true;
    }

    if (range_start && range_end) {
      filteredEdges = (flagHasBeenFiltered ? filteredEdges : edges).filter(
        (edge: Edge) =>
          Number(edge.node?.shopifyProductEu?.variants?.edges[0].node.price) >
            Number(range_start) &&
          Number(edge.node?.shopifyProductEu?.variants?.edges[0].node.price) <
            Number(range_end)
      );
      filteredEdgesTotalPages = Math.ceil(filteredEdges?.length / PER_PAGE);
      flagHasBeenFiltered = true;
    }

    return flagHasBeenFiltered ? filteredEdges : edges;
  };

  return (
    <>
      <Filters />
      <ListContainer>
        {filteredEdges(edges)
          ?.slice(pageStart, pageEnd)
          .map((edge: Edge) => {
            return (
              <CardContainer key={edge.node.name}>
                <Image
                  src={`https:${edge.node.thumbnailImage.file.url}`}
                  alt={edge.node.name}
                  width={450}
                  height={450}
                  placeholder="blur"
                  blurDataURL="https://via.placeholder.com/450"
                />
                <NameContainer>
                  {edge.node.name}
                  <span>
                    €
                    {Math.round(
                      Number(
                        edge.node.shopifyProductEu.variants.edges[0].node.price
                      )
                    )}
                  </span>
                </NameContainer>
              </CardContainer>
            );
          })}
        {!Boolean(filteredEdges(edges).length) && (
          <LoadingContainer>
            Empty... Please try another filter.
          </LoadingContainer>
        )}
      </ListContainer>
      {Boolean(filteredEdges(edges).length > PER_PAGE * 2) && (
        <Pagination
          totalPages={
            (Number(filteredEdgesTotalPages) >= 0
              ? filteredEdgesTotalPages
              : Math.ceil(edges?.length / PER_PAGE)) || 0
          }
          onPageChange={handlePageChange}
          forcePage={page}
        />
      )}
    </>
  );
};

export default EdgesList;
