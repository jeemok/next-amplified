import React from "react";
import Head from "next/head";
import { Container, Tabs } from "@mantine/core";
import CourseProviderHOC from "../../../src/hoc/CourseProvider";
import { getServerSideProps } from "../../../src/helpers/enrollment-auth";
import Header from "../../../src/components/CourseMain/Header";
import About from "../../../src/containers/Course/About";
import Outline from "../../../src/containers/Course/Outline";
import Downloads from "../../../src/containers/Course/Downloads";

export { getServerSideProps };

export function Course({ course }) {
  return (
    <>
      <Head>
        <title>{course.title}</title>
      </Head>

      <Header course={course} />
      <Container mt={50}>
        <Tabs defaultValue="about">
          <Tabs.List>
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="course-outline">Outline</Tabs.Tab>
            <Tabs.Tab value="discussion">Discussion</Tabs.Tab>
            <Tabs.Tab value="downloads">Downloads</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="about">
            <About course={course} />
          </Tabs.Panel>

          <Tabs.Panel value="course-outline" pt="xs">
            <Outline course={course} />
          </Tabs.Panel>

          <Tabs.Panel value="discussion" pt="xs">
            Discussion
          </Tabs.Panel>

          <Tabs.Panel value="downloads" pt="xs">
            <Downloads infographics={course.infographics} />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}

export default function CourseWrapper() {
  return (
    <CourseProviderHOC>
      <Course />
    </CourseProviderHOC>
  );
}
