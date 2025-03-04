"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParams } from "next/navigation";
import ProductCard from "../productcard";

async function getProductData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/product/${id || ""}`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const data = await res.json();
    return data.findProduct;
  } catch (error) {
    console.error("Error in getProductData:", error);
    return null;
  }
}

export default function ProductOverview() {
  const [productData, setProductData] = useState<any[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductData(id as string);
      if (data) {
        const filteredData = data.filter((product: any) => product.is_top);
        setProductData(filteredData);
      }
    };

    fetchData();
  }, [id]);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [-100, 10]);

  return (
    <section className="flex min-h-screen w-full flex-col gap-12 p-12 px-10 py-36 max-md:p-4 max-md:px-0">
      <div className="flex items-center justify-end">
        <motion.h1
          ref={ref}
          style={{ x: x1 }}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
            duration: 0.75,
            ease: "linear",
          }}
          className="w-1/2 text-right font-humane text-max font-bold uppercase text-accent2 max-md:w-full max-md:text-center max-md:text-8xl"
        >
          THESE ARE TOP MARKET PRODUCTS
        </motion.h1>
      </div>
      <ProductGrid productData={productData} />
    </section>
  );
}

function ProductGrid({ productData }: { productData: any[] }) {
  if (productData.length === 0) {
    return (
      <h1 className="text-center font-helvetica text-head font-semibold">
        No products as of Now <br />
        We are working hard on this one!
      </h1>
    );
  }

  return (
    <div className="grid h-fit w-full grid-cols-3 items-center justify-between gap-6 max-md:grid-cols-1">
      {productData.map((product, index) => (
        <div
          key={index}
          className="flex h-fit w-full items-center justify-center"
        >
          <ProductCard
            name={product.name}
            subbrand={product.company_name}
            category={product.category_name}
            image={product.image}
            ingredients={product.ingredients}
            usp={product.usp}
          />
        </div>
      ))}
    </div>
  );
}
