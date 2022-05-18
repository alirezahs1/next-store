import { BASE_URL } from "../../constants/api";
import RatingStars from "../../components/ui/rating-stars";
import AddToCartButton from "../../components/ui/add-to-cart-button";
import ColorSelect from "../../components/ui/color-select";
import DropDown from "../../components/ui/dropdown";
import Image from "next/image";
import Head from "next/head";

export default function ProdoctDetail({product, id}) {
	return (
		<article className="lg:flex lg:h-screen">
			<Head>
				<title>{product?.title}</title>
				<meta property="og:title" content={product?.title} />
				<meta property="og:image" content={product?.image} />
				<meta property="og:description" content={product?.description} />
				<meta name="description" content={product?.description} />
			</Head>
			<div className="bg-gray-300 w-full lg:w-[420px] 2xl:w-3/12 p-12 bg-gradient-to-b from-[#6afec8] to-[#43c8cb] flex flex-col justify-center">
				<Image className="mix-blend-multiply" src={product?.image} alt={product?.title} width={400} height={400} objectFit="scale-down" />
			</div>
			<div className="flex-1 px-12 py-16 flex flex-col justify-between h-full overflow-auto">
				<header>
					<div className="flex flex-col-reverse lg:flex-row justify-between lg:items-center mb-3">
						<h1 className="uppercase text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-700">{product?.title}</h1>
						<RatingStars className="mb-10 lg:mb-0 lg:ml-10" rating={product?.rating?.rate || 0} />
					</div>
					<div className="uppercase italic text-gray-300 font-semibold mb-2">
						{product?.category}
					</div>
					<div className="flex font-semibold text-xl">
						<span className="line-through text-neutral-600">$150</span>
						<span className="ml-3 text-red-400">${product?.price}</span>
					</div>
				</header>
				<section className="my-10">
					<h2 className="text-gray-700 font-medium text-lg mb-4">DESCRIPTION</h2>
					<p className="text-neutral-400 font-light font-sans leading-7">
						{product?.description}
					</p>
				</section>
				<section>
					<div className="flex flex-col sm:flex-row mb-10">
						<div className="flex-[2] sm:pr-10 sm:border-r-2 mb-10 sm:mb-0">
							<span className="inline-block mb-4 text-gray-700 font-semibold">
								COLOR
							</span>
							<ColorSelect activeColors={["cyan", "black", "blue", "green", "grey"]} defaultColor="cyan" onChange={(colorName, colorCode) => console.log(`Color ${colorName} selected with hex code: ${colorCode}`)} />
						</div>
						<div className="flex-1 sm:px-10 sm:border-r-2 mb-10 sm:mb-0">
							<span className="inline-block mb-4 text-gray-700 font-semibold">
								SIZE
							</span>
							<DropDown options={[
								{
									label: '(UK 8)',
									value: 'uk-8'
								},
								{
									label: '(UK 10)',
									value: 'uk-10'
								},
								
								{
									label: '(US 16)',
									value: 'us-16'
								},
								
								{
									label: '(US 18)',
									value: 'us-18'
								},
							]} placeholder="Select size" defaultValue={"uk-8"} />
						</div>
						<div className="flex-1 sm:px-10">
							<span className="inline-block mb-4 text-gray-700 font-semibold">
								QTY
							</span>
							<DropDown options={[
								{
									label: '(1)',
									value: 1
								},
								{
									label: '(2)',
									value: 2
								},
								
								{
									label: '(3)',
									value: 3
								},
								
								{
									label: '(4)',
									value: 4
								},
							]} placeholder="Select QTY" defaultValue={1} />
						</div>
					</div>
				</section>
				<footer>
					<div>
						<AddToCartButton />
					</div>
				</footer>
			</div>
		</article>
	)
}


export async function getStaticPaths() {
    
	const products = await (await fetch(`${BASE_URL}/products/`)).json();

    return {
        paths: products.map(product => "/products/" + encodeURI(product.id)),
        fallback: true
    }
}

export async function getStaticProps({params}) {

    const { id } = params;

    const product = await (await fetch(`${BASE_URL}/products/${id}`)).json();

    return {
        props: {
			product,
			id
        },
        revalidate: 60
    }
}