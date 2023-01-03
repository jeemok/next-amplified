import update from "immutability-helper";
import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Stack, Group, Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { snapToGrid } from "./snapToGrid";
import DraggableBoxOnStale from "./DraggableBoxOnStale";
import {
  X_MAP,
  Y_MAP,
  GRID_SPACING,
  GRID_ITEM_WIDTH,
  GRID_ITEM_HEIGHT,
  DROPPABLE_BOXES,
  LAYOUT,
  ITEM_TYPES,
  X_AXIS_LIST,
} from "./config";

const DroppableBox = ({ backgroundColor }) => {
  return (
    <Box w={GRID_ITEM_WIDTH} h={GRID_ITEM_HEIGHT} sx={{ backgroundColor }} />
  );
};

export default function DragLayout() {
  const [boxes, setBoxes] = useState(
    DROPPABLE_BOXES.reduce((acc, cur) => {
      acc[cur.label] = cur;
      return acc;
    }, {})
  );

  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ITEM_TYPES.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);

        [left, top] = snapToGrid(left, top);

        moveBox(item.id, left, top);

        showNotification({
          title: "Well done!",
          message: `You have placed ${item.label} onto ${X_MAP[left]} & ${Y_MAP[top]}`,
        });

        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <Box ref={drop} miw={(GRID_ITEM_WIDTH + GRID_SPACING) * X_AXIS_LIST.length} sx={{ position: "relative" }}>
      {React.Children.toArray(
        Object.keys(boxes).map((key) => (
          <DraggableBoxOnStale id={key} {...boxes[key]} />
        ))
      )}
      <Box>
        <Stack spacing={GRID_SPACING}>
          {React.Children.toArray(
            LAYOUT.map((row) => (
              <Group spacing={GRID_SPACING}>
                {React.Children.toArray(
                  row.map((col) => <DroppableBox backgroundColor={col.bg} />)
                )}
              </Group>
            ))
          )}
        </Stack>
      </Box>
    </Box>
  );
};
