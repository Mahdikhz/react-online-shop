import * as Icons from "lucide-react";

export default function DynamicIcon({
  name,
  className = "w-6 h-6",
  strokeWidth = 1.8,
}) {
  const IconComponent = Icons[name] || Icons.Box;
  return <IconComponent className={className} strokeWidth={strokeWidth} />;
}
