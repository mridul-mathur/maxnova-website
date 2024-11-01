"use client";

import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

const CardLink: React.FC<{ href: string; title: string }> = ({
  href,
  title,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.25, ease: "linear" }}
    className="flex h-fit w-fit items-center justify-center"
  >
    <Link
      href={href}
      className="flex h-[30rem] w-[20.625rem] items-center justify-center rounded-3xl bg-accent1 p-8 text-primary max-md:h-[65vh] max-md:w-full max-md:p-4"
    >
      <h1 className="flex flex-wrap text-wrap text-center font-humane text-8xl font-semibold uppercase max-md:text-7xl">
        {title}
      </h1>
    </Link>
  </motion.div>
);

export default function OtherServices() {
  const pathname = usePathname();
  const currentPage = pathname?.split("/").pop();

  const servicesArray = useMemo(() => {
    switch (currentPage) {
      case "pcd-franchise":
        return ["Private Label", "Custom Formulations"];
      case "private-label":
        return ["PCD Franchise", "Custom Formulations"];
      case "custom-formulations":
        return ["PCD Franchise", "Private Label"];
      default:
        return ["PCD Franchise", "Private Label", "Custom Formulations"];
    }
  }, [currentPage]);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  return (
    <section className="relative flex h-fit w-full flex-col gap-12 p-12 py-36 max-md:p-4 max-md:px-0 lg:px-10">
      <div className="flex items-center justify-center gap-4">
        <motion.h1
          ref={ref}
          style={{ y: y1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
          className="w-1/2 text-center font-humane text-max font-bold text-accent2 max-md:w-full max-md:text-center max-md:text-8xl"
        >
          VIEW OUR <br /> OTHER SERVICES
        </motion.h1>
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.5,
          duration: 0.75,
          ease: "linear",
        }}
        className="flex items-center justify-center gap-6 max-md:w-full max-md:flex-col"
      >
        {servicesArray.map((title) => (
          <CardLink
            key={title}
            href={`../${title.toLowerCase().replace(" ", "-")}`}
            title={title}
          />
        ))}
      </motion.div>
    </section>
  );
}
