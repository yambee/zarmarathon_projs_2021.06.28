export default function clamp(x, fromX, toX) {
  if (x < fromX) return fromX;
  if (x > toX) return toX;
  return false;
}
