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
			<div className="relative bg-gray-300 w-full max-h-80 min-h-[450px] sm:max-h-96 lg:max-h-full lg:w-[420px] 2xl:w-3/12 p-8 pb-16 lg:p-12 lg:pb-24 bg-gradient-to-b from-[#6afec8] to-[#43c8cb] flex flex-col justify-center">
				<Image className="mix-blend-multiply" src={product?.image} alt={product?.title} width={400} height={400} objectFit="scale-down" />
				<div className="flex space-x-2 absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2">
					{Array.from({length: 4}).map((_, i) => (
						<span key={i} className={`w-3 h-3 rounded-full ${i===0 ? "bg-white" : "bg-gray-800 opacity-30 cursor-pointer hover:opacity-50 transition-opacity duration-150"}`}></span>
					))}
				</div>
			</div>
			<div className="flex-1 px-8 sm:px-12 py-10 sm:py-16 flex flex-col justify-between h-full overflow-auto relative">
				<header>
					<div className="flex flex-col-reverse lg:flex-row justify-between lg:items-center mb-3">
						<h1 className="uppercase text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-700">{product?.title}</h1>
						<RatingStars className="mb-5 lg:mb-0 lg:ml-10" rating={product?.rating?.rate || 0} />
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
				<footer>
					<div className="flex flex-col sm:flex-row mb-16">
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
					<div className="flex items-center justify-between">
						<AddToCartButton />
						<div className="text-gray-400 pr-4 hover:text-gray-500 transition-colors duration-150 absolute top-8 right-4 sm:static">
							<svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-6 sm:w-9" viewBox="0 0 20 20" fill="currentColor">
								<path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
							</svg>
						</div>
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