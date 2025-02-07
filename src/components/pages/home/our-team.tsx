"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useState } from "react";
import {
  Support1,
  Support2,
  Support3,
  Support4,
  Support6,
  Support7,
  Support8,
  Support9,
} from "@/assets/images/supports";

import Autoplay from "embla-carousel-autoplay";

const carouselItem = [
  Support1,
  Support2,
  Support3,
  Support4,
  Support6,
  Support7,
  Support8,
  Support9,
];

export function OurTeam() {
  const [api, setApi] = useState<CarouselApi>();

  const autoplayOnMouseLeave = () => {
    if (!api) {
      return;
    }

    api?.plugins()?.autoplay.play();
  };
  return (
    <section>
      <div className="py-16">
        <h2 className="font-bold text-xl md:text-3xl text-center mb-5 md:mb-10">
          Notre equipes <span className="text-primary">HARVEX GROUPE</span>
        </h2>
        <Carousel
          onMouseLeave={autoplayOnMouseLeave}
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 1500,
              stopOnFocusIn: true,
              stopOnMouseEnter: true,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2">
            {carouselItem.map((template, index: number) => (
              <CarouselItem
                key={index}
                className="md:basis-1/3 lg:basis-1/4 pl-2 py-2"
              >
                <div className="max-md:pl-4 transition-transform duration-300 hover:-translate-y-2">
                  {template({
                    alt: "",
                    className:
                      "lg:w-96 w-80 h-auto object-contain rounded-lg border border-primary",
                  })}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
