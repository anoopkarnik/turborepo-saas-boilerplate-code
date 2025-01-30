"use client"
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../molecules/shadcn/card";
import { ProductProps } from "@repo/ts-types/landing-page/v1";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const Products = ({productsList}: {productsList:ProductProps[]}) => {
  const router = useRouter();
  const {theme} = useTheme();

  return (
    <section
      id="products"
      className="container py-24 sm:py-32 cas"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-left ">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Projects
        </span>
      </h2>
      <p className="text-xl text-muted-foreground pt-4 pb-8 mb-10">
        Check out some of the prioritized projects that I have worked on.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {productsList.map((product) => (
          <Card key={product.title} className="flex flex-col relative transition-transform hover:scale-150 hover:z-[999999] ">
            <CardHeader>
              <CardTitle className="text-center text-subtitle">{product.title}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-4 flex-1">
              <Image
                  src={product.image || ""}
                  alt="About feature"
                  layout="cover"
                  width={400}
                  height={400}
                />
                <div className="text-center">{product.description}</div>
            </CardContent>

            <CardFooter className="absolute left-0 top-[-20px] flex gap-2">
              {product.github && <Image
                src={theme === "dark" ? "/connections/github-dark.png" : "/connections/github.png"}
                alt="GitHub Icon"
                className="cursor-pointer hover:opacity-70 "
                width={40}
                height={40}
                onClick={() => router.push(product.github || "")}
              />}
              {product.demo && <Image
                src={"/globe.svg"}
                alt="GitHub Icon"
                className="cursor-pointer hover:opacity-70 bg-primary-500"
                width={30}
                height={30}
                onClick={() => router.push(product.demo || "")}
              />}
              {product.notion && <Image
                src={"/connections/notion.png"}
                alt="GitHub Icon"
                className="cursor-pointer hover:opacity-70 bg-primary-500"
                width={30}
                height={30}
                onClick={() => router.push(product.notion || "")}
              />}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Products;