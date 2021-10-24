import { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import type { NextPage } from "next";
import Image from "next/image";
import Pagination from "../Pagination";
import { useRouter } from "next/router";

const mainFilters = [
  "All",
  "Boots",
  "Sandals",
  "Flats",
  "Heels",
  "Mules",
  "Brogues",
  "Sneakers",
  "Ballerinas",
];

const PER_PAGE = 18;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EdgesList: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [pageStart, setPageStart] = useState<number>(0);
  const [pageEnd, setPageEnd] = useState<number>(PER_PAGE);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (Number(router.query.page) >= 0) {
      setPage(Number(router.query.page) - 1);
    }

    if (router.query.filter) {
      const rqf = router.query.filter as string;
      setQ(rqf !== "All" ? rqf : "");
      if (!router.query.page) {
        setPage(0);
      }
    }
  }, [router.query.page, router.query.filter]);

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
      setPage(selected);
      router.push({
        query: {
          ...(q && { filter: q }),
          page: selected + 1,
        },
      });
    }
  };

  const handleFilterClick = (e: any) => {
    router.push({
      query: { filter: e.target.id },
    });
  };

  return (
    <>
      <MainFilterContainer>
        {mainFilters.map((mainFilter: string) => {
          return (
            <a
              id={mainFilter}
              className={q === mainFilter && q !== "All" ? "active-filter" : ""}
              key={mainFilter}
              onClick={handleFilterClick}
            >
              {mainFilter}
            </a>
          );
        })}
      </MainFilterContainer>

      <ListContainer>
        {edges?.slice(pageStart, pageEnd).map((edge: any) => {
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
                    edge.node.shopifyProductEu.variants.edges[0].node.price
                  )}
                </span>
              </NameContainer>
            </CardContainer>
          );
        })}
        {Boolean(edges.length === 0) && (
          <LoadingContainer>
            Empty... Please try another filter.
          </LoadingContainer>
        )}
      </ListContainer>
      {Boolean(edges.length) && (
        <Pagination
          totalPages={Math.ceil(edges?.length / PER_PAGE)}
          onPageChange={handlePageChange}
          forcePage={page}
        />
      )}
    </>
  );
};

export default EdgesList;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25em;
  position: relative;

  > img {
    width: 30em;
  }
`;

const NameContainer = styled.div`
  max-width: 290px;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 0.2em;

  span {
    position: absolute;
    right: 3px;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3em;
  margin: 0 1.5em;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  font-size: 25px;
  color: cadetblue;
`;

const MainFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  height: 8vh;
  font-size: 20px;

  a {
    text-decoration: none;
    text-transform: uppercase;
  }

  a.active-filter {
    text-decoration: underline;
    color: cornflowerblue;
  }
`;
