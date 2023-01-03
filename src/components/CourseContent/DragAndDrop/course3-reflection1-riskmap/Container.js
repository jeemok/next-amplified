import { Center, Stack, Text, Box, Card, Grid } from "@mantine/core";
import DragLayout from "./DragLayout";
import {
  X_AXIS_LABEL,
  Y_AXIS_LABEL,
  X_AXIS_LIST,
  Y_AXIS_LIST,
  GRID_ITEM_WIDTH,
  GRID_ITEM_HEIGHT,
  GRID_SPACING,
  GRADIENT_LEGEND,
} from "./config";
import React from "react";

const ChartLabel = ({ text }) => (
  <Center style={{ width: GRID_ITEM_WIDTH, height: GRID_ITEM_HEIGHT }}>
    <Text size="sm">{text}</Text>
  </Center>
);

// TODO: This min width is not responsive
const Legend = () => (
  <Card shadow="sm" p="sm" ml="sm" radius="md" withBorder miw={200} maw={200}>
    <Text size="sm" fw="bold" mb={10}>
      {GRADIENT_LEGEND.label}
    </Text>
    <Grid>
      <Grid.Col span="content">
        <Box
          w={GRADIENT_LEGEND.width}
          h={GRADIENT_LEGEND.height}
          sx={{
            backgroundImage: `linear-gradient(${GRADIENT_LEGEND.max.color}, ${GRADIENT_LEGEND.min.color})`,
          }}
        />
      </Grid.Col>
      <Grid.Col span="auto">
        <Stack justify="space-between" sx={{ height: GRADIENT_LEGEND.height }}>
          <Text size="xs">{GRADIENT_LEGEND.max.label}</Text>
          <Text size="xs">{GRADIENT_LEGEND.min.label}</Text>
        </Stack>
      </Grid.Col>
    </Grid>
  </Card>
);

export default function Container() {
  return (
    <Box>
      <table>
        <tbody>
          <tr>
            <td
              colSpan={6}
              style={{ width: GRID_ITEM_WIDTH, height: GRID_ITEM_HEIGHT }}
            >
              <Text weight="bold" size="sm" mb="sm">
                {Y_AXIS_LABEL}
              </Text>
            </td>
          </tr>
          {React.Children.toArray(
            Y_AXIS_LIST.map((yLabel, index) => (
              <tr>
                <td
                  style={{ width: GRID_ITEM_WIDTH, height: GRID_ITEM_HEIGHT }}
                >
                  <ChartLabel text={yLabel} />
                </td>
                {index === 0 && (
                  <>
                    <td
                      colSpan={X_AXIS_LIST.length}
                      rowSpan={Y_AXIS_LIST.length}
                    >
                      <DragLayout />
                    </td>
                    <td
                      rowSpan={Y_AXIS_LIST.length}
                      style={{ verticalAlign: "top" }}
                    >
                      <Legend />
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
          <tr>
            <td></td>
            {React.Children.toArray(
              X_AXIS_LIST.map((xLabel) => {
                return (
                  <td
                    style={{
                      width: GRID_ITEM_WIDTH + GRID_SPACING,
                      height: GRID_ITEM_HEIGHT,
                    }}
                  >
                    <ChartLabel text={xLabel} />
                  </td>
                );
              })
            )}
            <td>
              <Text ml="sm" weight="bold" align="left" size="sm">
                {X_AXIS_LABEL}
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};
