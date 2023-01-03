import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Grid, Center } from "@mantine/core";
import { getServerSideProps } from "../../../../src/helpers/enrollment-auth";
import { setUserLastCourse } from "../../../../src/services/cache";
import SideNav from "../../../../src/components/Course/SideNav";
import MainContent from "../../../../src/components/Course/MainContent";
import CourseProviderHOC from "../../../../src/hoc/CourseProvider";
import UpNext from "../../../../src/components/Course/UpNext";

export { getServerSideProps };

export function Chapter({ course, module, chapter, nextModule, nextChapter }) {
  const router = useRouter();
  setUserLastCourse(router.asPath.split("?")[0]);

  return (
    <>
      <Head>
        <title>{chapter.title}</title>
      </Head>
      <Container size="xl">
        <Grid>
          <Grid.Col xs={8}>
            {React.Children.toArray(
              chapter.contents?.map((content) => (
                <MainContent content={content} />
              ))
            )}
          </Grid.Col>

          <Grid.Col xs={4}>
            <SideNav course={course} module={module} chapter={chapter} />
          </Grid.Col>
        </Grid>

        <Center mt={100}>
          <UpNext
            course={course}
            module={module}
            chapter={chapter}
            nextModule={nextModule}
            nextChapter={nextChapter}
          />
        </Center>
      </Container>
    </>
  );
}

export default function ChapterWrapper() {
  return (
    <CourseProviderHOC>
      <Chapter />
    </CourseProviderHOC>
  );
}
