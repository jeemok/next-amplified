import {
  GRID_ITEM_HEIGHT,
  GRID_ITEM_WIDTH,
  GRID_SPACING,
  PADDING,
} from "./config";

export function snapToGrid(x, y) {
  const xTimes = Math.round(x / GRID_ITEM_WIDTH);
  const yTimes = Math.round(y / GRID_ITEM_HEIGHT);
  const snappedX =
    Math.round(x / GRID_ITEM_WIDTH) * GRID_ITEM_WIDTH +
    GRID_SPACING * xTimes +
    PADDING;
  const snappedY =
    Math.round(y / GRID_ITEM_HEIGHT) * GRID_ITEM_HEIGHT +
    GRID_SPACING * yTimes +
    PADDING;
  return [snappedX, snappedY];
}
