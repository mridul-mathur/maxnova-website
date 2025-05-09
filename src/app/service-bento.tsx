/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContactPage from "./contact";
import { useContactContext } from "./context/contact-context";
import icon0 from "./../../public/images/derma.svg";
import icon1 from "./../../public/images/cosmo.svg";
import icon2 from "./../../public/images/neutra.svg";
import icon3 from "./../../public/images/ayurv.svg";
import arrow from "./../../public/images/arrow.svg";
import Link from "next/link";

interface Verticals {
  _id: string;
  name: string;
  description: string;
  image: string;
  icon: any;
}

interface BentoData {
  box1_image: string;
  value1_image: string;
  value2_image: string;
  value1_head: string;
  value2_head: string;
  value1_desc: string;
  value2_desc: string;
  contact_image: string;
}

const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch data from ${url}`);
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default function ServiceBento() {
  const { open, toggleContact } = useContactContext();
  const [verticals, setVerticals] = useState<Verticals[]>([]);
  const [bentoData, setBentoData] = useState<BentoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const icons = [icon0, icon1, icon2, icon3];

    const loadData = async () => {
      try {
        const [categoriesData, bentoResponse] = await Promise.all([
          fetchData(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/category`),
          fetchData(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/api/utils/get-bento`,
          ),
        ]);

        const categoriesWithIcons = categoriesData.allCategory.map(
          (category: any, index: number) => ({
            ...category,
            icon: icons[index % icons.length],
          }),
        );
        setVerticals(categoriesWithIcons);
        if (bentoResponse && bentoResponse.length > 0) {
          setBentoData(bentoResponse[0].service_bento);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <section className="grid h-fit min-h-[70rem] w-full items-center justify-center">
        <div className="text-center">Loading services...</div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="grid h-fit min-h-[70rem] w-full items-center justify-center">
        <div className="text-center text-red-500">Error: {error}</div>
      </section>
    );
  }
  const rowspan =
    verticals.length % 2 !== 0
      ? `row-span-${Math.ceil((verticals.length + 1) / 2)}`
      : `row-span-${Math.ceil(verticals.length / 2)}`;

  console.log(rowspan);
  return (
    <section className="grid h-fit w-full grid-cols-4 items-center justify-center gap-[1rem] px-6 max-md:w-full max-md:grid-cols-2 max-md:gap-2 max-md:p-0">
      <div
        className={`${rowspan} relative col-span-2 h-full w-full overflow-hidden rounded-2xl border px-4 py-8 max-md:h-[32rem]`}
      >
        <h1 className="z-[1] font-humane text-max font-bold uppercase text-primary max-md:text-8xl max-md:leading-[0.9]">
          Driven by Resilient R&D approach
        </h1>
        {bentoData?.box1_image.endsWith(".svg") ? (
          <img
            src={bentoData?.box1_image}
            alt="box1_image"
            className="z-[-1] h-full w-full object-contain brightness-90 filter"
          />
        ) : (
          <Image
            src={bentoData?.box1_image || ""}
            fill
            quality={100}
            className="z-[-1] h-full w-full object-cover brightness-90 filter"
            unoptimized
            alt="box1_image"
          />
        )}
      </div>
      {verticals.map((vertical, index) => (
        <div
          key={index}
          className={`relative min-h-[20.5rem] ${verticals.length % 2 !== 0 && index == verticals.length - 1 ? "col-span-2" : "col-span-1"} row-span-1 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border bg-accent1 px-4 py-8 text-accent2 max-md:h-[20rem] max-md:px-2 max-md:py-4`}
        >
          <div className="relative flex h-fit w-full items-center justify-between">
            <div className="relative h-[2.5rem] w-[2.5rem] overflow-hidden">
              <Image priority src={vertical.icon} fill alt={vertical.name} />
            </div>
            <Link
              href={`/verticals/${vertical._id}`}
              className="relative flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-lg bg-accent2 p-2"
            >
              <Image
                priority
                src={arrow}
                height={20}
                width={20}
                alt={vertical.name}
              />
            </Link>
          </div>
          <div className="flex h-fit w-full flex-col items-start justify-center text-accent2">
            <h1 className="font-humane text-[3.5rem] font-medium uppercase leading-[0.9]">
              {vertical.name}
            </h1>
            <p className="text-min leading-[1.1]">
              {vertical.description?.split(".")[0]}.
            </p>
          </div>
        </div>
      ))}
      <div className="relative col-span-2 row-span-1 flex h-full min-h-[16rem] w-full flex-col justify-between overflow-hidden rounded-2xl border-2 border-accent2 px-4 py-8 text-accent2 max-md:h-[20rem] max-md:px-2 max-md:py-4 md:col-span-1 md:min-h-[20.5rem]">
        <div className="relative flex h-fit w-full items-center justify-start">
          <div className="relative h-[2.5rem] w-[2.5rem] overflow-hidden">
            {bentoData?.value1_image.endsWith(".svg") ? (
              <img
                src={bentoData?.value1_image}
                alt="value1_image"
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                src={bentoData?.value1_image || ""}
                fill
                unoptimized
                className="h-full w-full object-contain"
                alt="value1_image"
              />
            )}
          </div>
        </div>
        <div className="flex h-fit w-full flex-col items-start justify-center text-accent2">
          <h1 className="font-humane text-[3.5rem] font-medium uppercase leading-[0.9]">
            {bentoData?.value1_head}
          </h1>
          <p className="text-min leading-[1.1]">{bentoData?.value1_desc}.</p>
        </div>
      </div>
      <div className="relative col-span-2 row-span-1 flex h-full min-h-[20rem] w-full flex-col justify-between overflow-hidden rounded-2xl border-2 border-accent2 bg-primary px-4 py-8 text-accent2 max-md:h-[20rem] max-md:px-2 max-md:py-4 md:col-span-1 md:min-h-[20.5rem]">
        <div className="relative flex h-fit w-full items-center justify-start">
          <div className="relative h-[2.5rem] w-[2.5rem] overflow-hidden">
            {bentoData?.value2_image.endsWith(".svg") ? (
              <img
                src={bentoData?.value2_image}
                alt="value2_image"
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                src={bentoData?.value2_image || ""}
                fill
                unoptimized
                alt="value2_image"
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </div>
        <div className="flex h-fit w-full flex-col items-start justify-center text-accent2">
          <h1 className="font-humane text-[3.5rem] font-medium uppercase leading-[0.9]">
            {bentoData?.value2_head}
          </h1>
          <p className="text-min leading-[1.1]">{bentoData?.value2_desc}.</p>
        </div>
      </div>
      <div className="relative col-span-2 row-span-1 flex h-full min-h-[20.5rem] w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border bg-accent2 p-4 max-md:h-[32rem] max-md:flex-col-reverse">
        <div className="flex h-full w-full flex-col items-start justify-between p-0">
          <div className="flex h-fit w-full flex-col items-start justify-between gap-0">
            <p className="text-para text-primary">Let&apos;s Connect</p>
            <h2 className="text-wrap font-humane text-[7rem] font-bold uppercase leading-[0.9] text-primary">
              What about a call?
            </h2>
          </div>
          <button
            onClick={toggleContact}
            className="w-fit text-nowrap rounded-full bg-accent1 px-4 py-3 text-min font-semibold text-accent2 transition-colors hover:bg-opacity-90 md:mt-0 md:w-auto"
          >
            Contact Us
          </button>
        </div>
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl">
          {bentoData?.value1_image.endsWith(".svg") ? (
            <img
              src={bentoData?.contact_image}
              alt="contact_image"
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={bentoData?.contact_image || ""}
              fill
              unoptimized
              alt="contact_image"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
      {open && <ContactPage className="" onClick={toggleContact} />}
    </section>
  );
}
