import Image, { ImageProps } from "next/image";

import authImage from "./auth-image.jpg";
import heroImage from "./hero-image.png";
import historicalImage from "./historical-image.png";
import logo from "./logo.png";

type CustomImageProps = Omit<ImageProps, "src">;

export function Logo(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={logo} alt={alt} {...otherProps} />;
}

export function HeroImage(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={heroImage} alt={alt} {...otherProps} />;
}

export function HistoricalImage(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={historicalImage} alt={alt} {...otherProps} />;
}

export function AuthImage(props: CustomImageProps) {
  const { alt, ...otherProps } = props;
  return <Image src={authImage} alt={alt} {...otherProps} />;
}
