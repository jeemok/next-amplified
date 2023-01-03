import { memo } from "react";
import { Button } from "@mantine/core";

const DraggableBox = memo(function DraggableBox({ label, color, preview }) {
  return (
    <Button
      color={color}
      style={{ cursor: "grab" }}
      role={preview ? "BoxPreview" : "Box"}
    >
      {label}
    </Button>
  );
});

export default DraggableBox;