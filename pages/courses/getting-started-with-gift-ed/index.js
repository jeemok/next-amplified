import Link from "next/Link";
import { MdAccessTimeFilled } from "react-icons/md";
import Header from "../../../src/components/Header";
import { useRouter } from "next/router";

import React, { useTransition } from "react";

const items = [
  {
    slug: "getting-started-with-gift-ed",
    image:
      "https://lms.gift-ed.com/asset-v1:GIFT.ed+Orientation+V1+type@asset+block@gifted-logo-white.jpg",
    title: "Getting Started with GIFT.ed",
    badges: ["Orientation"],
    duration: "3h 16m",
    progress: 0,
  },
  {
    image:
      "https://lms.gift-ed.com/asset-v1:GIFT.ed+Course3+V1+type@asset+block@C3_-_Trailer_TN2.png",
    title: "Why the 21st Century Will Surprise Us: Reshaping Capitalism",
    badges: ["Fundamental"],
    duration: "5h 17m",
    progress: 33,
  },
  {
    image:
      "https://lms.gift-ed.com/asset-v1:GIFT.ed+Course1+V1+type@asset+block@C1_Promo_TN1.jpg",
    title: "Redesigning Society: Global Challenges and Purpose Driven Lives",
    badges: ["Fundamental"],
    duration: "1h 12m",
    progress: 75,
  },
  {
    image:
      "https://lms.gift-ed.com/asset-v1:GIFT.ed+C2+V1+type@asset+block@C2-Trailer-TN1.png",
    title: "Anticipating the World in 2050: Designing Resilient Societies",
    badges: ["Fundamental"],
    duration: "3h 10m",
    progress: 100,
  },
];

export default function CourseList() {
  const router = useRouter();
  return (
    <div>
      <Header />
      hi
      <Link href={`${router.pathname}/chapters/chapter-1`}>go to the chapter here</Link>
    </div>
  );
}
