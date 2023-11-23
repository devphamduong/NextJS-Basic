"use client";

import { useSearchParams } from "next/navigation";

function DetailTrackPage(props: any) {
  const { params } = props;
  const searchParams = useSearchParams();
  const search = searchParams.get("audio");

  return <></>;
}

export default DetailTrackPage;
