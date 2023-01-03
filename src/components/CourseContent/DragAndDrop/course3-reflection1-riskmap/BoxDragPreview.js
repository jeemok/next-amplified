import { memo } from "react";
import DraggableBox from "./DraggableBox";

const BoxDragPreview = memo(function BoxDragPreview({ label, color }) {
  return (
    <div style={{ display: "inline-block" }}>
      <DraggableBox label={label} color={color} preview />
    </div>
  );
});

export default BoxDragPreview;
