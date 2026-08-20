import { useEffect, useState } from "react";
import DynamicIcon from "./DynamicIcon";

const toneMap = {
  primary: "bg-primary-50 text-primary-600",
  accent: "bg-orange-50 text-accent",
  success: "bg-emerald-50 text-success",
};

export default function ProductImage({
  product,
  iconClassName = "w-16 h-16",
  className = "",
  rounded = "",
  src,
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imageSrc = src !== undefined ? src : product.image;

  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [imageSrc]);

  const showIconFallback = !imageSrc || errored;

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${rounded} ${className}`}
    >
      {showIconFallback ? (
        <div
          className={`w-full h-full flex items-center justify-center ${toneMap[product.color]}`}
        >
          <DynamicIcon
            name={product.icon}
            className={iconClassName}
            strokeWidth={1.2}
          />
        </div>
      ) : (
        <>
          {!loaded && (
            <div
              className={`absolute inset-0 animate-pulse ${toneMap[product.color]}`}
            >
              <div className="w-full h-full flex items-center justify-center opacity-40">
                <DynamicIcon
                  name={product.icon}
                  className={iconClassName}
                  strokeWidth={1.2}
                />
              </div>
            </div>
          )}
          <img
            src={imageSrc}
            alt={product.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </>
      )}
    </div>
  );
}
