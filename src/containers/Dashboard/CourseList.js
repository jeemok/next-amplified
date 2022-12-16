import {
  Collection,
  Card,
  Image,
  View,
  Flex,
  Badge,
  Divider,
  Button,
  Heading,
  Loader,
  Icon,
} from "@aws-amplify/ui-react";
import Link from 'next/link';
import { MdAccessTimeFilled } from "react-icons/md";

import React, { useTransition } from "react";

const items = [
  {
    slug: 'getting-started-with-gift-ed',
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
  return (
    <Collection
      items={items}
      type="list"
      direction="row"
      gap="20px"
      wrap="nowrap"
      isSearchable
    >
      {(item, index) => (
        <Card
          key={index}
          borderRadius="medium"
          border="none"
          maxWidth="20rem"
          variation="outlined"
          padding={0}
        >
          <Image src={item.image} />
          <View padding="medium">
            <Heading style={{ minHeight: 90 }}>
              {item.title}
            </Heading>
            {/* <Flex>
              {item.badges.map((badge) => (
                <Badge
                  key={badge}
                  backgroundColor={
                    badge === "Orientation"
                      ? "blue.40"
                      : badge === "Fundamental"
                      ? "green.40"
                      : "yellow.40"
                  }
                >
                  {badge}
                </Badge>
              ))}
            </Flex> */}
            {/* <Divider padding="xs" /> */}
            <div>
              <Icon as={MdAccessTimeFilled} />
              <span style={{ fontSize: "0.8rem", marginLeft: 5 }}>
                {item.duration}
              </span>
            </div>
            <div style={{ fontSize: "0.8rem", marginTop: 10 }}>
              <strong>{item.progress}%</strong> completed
            </div>
            <Loader
              variation="linear"
              size="small"
              percentage={item.progress}
              isDeterminate
              isPercentageTextHidden
            />
            <Link href={`/courses/${item.slug}`}>
            <Button
              variation="destructive"
              style={{ borderRadius: 20, fontSize: "0.8rem", marginTop: 10 }}
              >
              View course
            </Button>
              </Link>
          </View>
        </Card>
      )}
    </Collection>
  );
}
