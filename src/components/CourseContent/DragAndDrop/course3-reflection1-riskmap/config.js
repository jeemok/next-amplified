export const ITEM_TYPES = {
  BOX: "box",
};

export const GRID_ITEM_HEIGHT = 50;
export const GRID_ITEM_WIDTH = 100;
export const GRID_SPACING = 5;
export const PADDING = 5;

export const X_AXIS_LABEL = "LIKELIHOOD OF OCCURRENCE";
export const Y_AXIS_LABEL = "SEVERITY OF THE IMPACT";

export const X_AXIS_LIST = [
  "Improbable",
  "Remote",
  "Occasional",
  "Probable",
  "Frequent",
];

export const Y_AXIS_LIST = [
  "Catastrophic",
  "Significant",
  "Moderate",
  "Low",
  "Negligible",
];

export const DROPPABLE_BOXES = [{ top: -50, left: 450, label: "Risk" }];

export const X_MAP = X_AXIS_LIST.reduce((acc, cur, index) => {
  acc[index * GRID_ITEM_WIDTH + (index + 1) * PADDING] = cur;
  return acc;
}, {});

export const Y_MAP = Y_AXIS_LIST.reduce((acc, cur, index) => {
  acc[index * GRID_ITEM_HEIGHT + (index + 1) * PADDING] = cur;
  return acc;
}, {});

export const LAYOUT = [
  [{ bg: "#70D1D0" }, { bg: "#52B5B5" }, { bg: "#339A9A" }, { bg: "#339A9A" }, { bg: "#339A9A" }],
  [{ bg: "#70D1D0" }, { bg: "#52B5B5" }, { bg: "#52B5B5" }, { bg: "#339A9A" }, { bg: "#339A9A" }],
  [{ bg: "#8CEEED" }, { bg: "#70D1D0" }, { bg: "#52B5B5" }, { bg: "#52B5B5" }, { bg: "#339A9A" }],
  [{ bg: "#8CEEED" }, { bg: "#8CEEED" }, { bg: "#70D1D0" }, { bg: "#52B5B5" }, { bg: "#52B5B5" }],
  [{ bg: "#8CEEED" }, { bg: "#8CEEED" }, { bg: "#8CEEED" }, { bg: "#70D1D0" }, { bg: "#70D1D0" }],
];

export const GRADIENT_LEGEND = {
  label: "RISK LEVEL",
  width: 15,
  height: 100,
  max: {
    color: "#339a9a",
    label: "High risk, urgent action required.",
  },
  min: {
    color: "#8ceeed",
    label: "Low risk, no action required.",
  },
};
