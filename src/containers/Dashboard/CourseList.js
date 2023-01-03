import React from "react";
import { Group } from "@mantine/core";
import CourseCard from "../../components/Dashboard/CourseCard";
import courses from "../../../data";

export default function CourseList() {
  return (
    <Group>
      {React.Children.toArray(
        courses.map(({ image, slug, title, duration, progress }) => (
          <CourseCard
            slug={slug}
            image={image}
            title={title}
            duration={duration}
            progress={progress}
          />
        ))
      )}
    </Group>
  );
}
