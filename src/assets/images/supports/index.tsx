import Image, { ImageProps } from "next/image";

import support1 from "./support-1.png";
import support10 from "./support-10.png";
import support2 from "./support-2.png";
import support3 from "./support-3.png";
import support4 from "./support-4.png";
import support5 from "./support-5.png";
import support6 from "./support-6.png";
import support7 from "./support-7.png";
import support8 from "./support-8.png";
import support9 from "./support-9.png";

type CustomImageProps = Omit<ImageProps, "src">;

export function Support1(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={support1} alt={alt} {...otherProps} />;
}

export function Support2(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={support2} alt={alt} {...otherProps} />;
}

export function Support3(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={support3} alt={alt} {...otherProps} />;
}

export function Support4(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={support4} alt={alt} {...otherProps} />;
}

export function Support5(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={support5} alt={alt} {...otherProps} />;
}

export function Support6(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={support6} alt={alt} {...otherProps} />;
}

export function Support7(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={support7} alt={alt} {...otherProps} />;
}

export function Support8(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={support8} alt={alt} {...otherProps} />;
}

export function Support9(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={support9} alt={alt} {...otherProps} />;
}

export function Support10(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={support10} alt={alt} {...otherProps} />;
}
