import { memo, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ITEM_TYPES } from './config';
import DraggableBox from "./DraggableBox.js";

function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
  };
}

const DraggableBoxOnStale = memo(function DraggableBoxOnStale(props) {
  const { id, label, color, left, top } = props;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ITEM_TYPES.BOX,
      item: { id, left, top, label },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, label, color]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      role="DraggableBox"
    >
      <DraggableBox label={label} color={color} />
    </div>
  );
});

export default DraggableBoxOnStale;
