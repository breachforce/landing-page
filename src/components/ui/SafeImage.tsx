import React from "react";

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  width?: number;
  height?: number;
  fill?: boolean;
};

export default function SafeImage({ width, height, fill, style, className, ...props }: SafeImageProps) {
  if (fill) {
    return (
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          {...props}
          className={className}
          style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
        />
      </div>
    );
  }
  return <img {...props} width={width} height={height} className={className} style={style} />;
}