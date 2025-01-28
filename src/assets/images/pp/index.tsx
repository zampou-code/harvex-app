import Image, { ImageProps } from "next/image";

import man from "./man.png";
import woman from "./woman.png";

type CustomImageProps = Omit<ImageProps, "src">;

export function Man(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={man} alt={alt} {...otherProps} />;
}

export function Woman(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={woman} alt={alt} {...otherProps} />;
}

export { man, woman };
