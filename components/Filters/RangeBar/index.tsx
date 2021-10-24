import {useEffect, useReducer, useState} from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useRouter } from "next/router";

const MARKS = {
  50: "50",
  100: "100",
  150: "150",
  200: "200",
  250: "250",
  300: "300",
  350: "350",
  400: "400",
  450: "450",
  500: "500",
  550: "550",
  600: "600",
};

const MIN = 50;
const MAX = 600;

const RangeBar = () => {
  const router = useRouter();
  const handleRangeChange = (rangeArr: Array<number>): void => {
    const [range_start, range_end] = rangeArr;
    router.push({
      query: { ...router.query, range_start, range_end },
    });
  };
  return (
    <Range
      min={MIN}
      max={MAX}
      step={MIN}
      value={[Number(router.query.range_start) || MIN, Number(router.query.range_end || MAX)]}
      dots
      onChange={handleRangeChange}
      marks={MARKS}
    />
  );
};

export default RangeBar;
