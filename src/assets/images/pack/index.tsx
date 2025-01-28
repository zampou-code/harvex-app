import Image, { ImageProps } from "next/image";

import pack1 from "./pack-1.png";
import pack2 from "./pack-2.png";
import pack3 from "./pack-3.png";

type CustomImageProps = Omit<ImageProps, "src">;

export function Pack1(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={pack1} alt={alt} {...otherProps} />;
}

export function Pack2(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={pack2} alt={alt} {...otherProps} />;
}

export function Pack3(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={pack3} alt={alt} {...otherProps} />;
}
