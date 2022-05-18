const CartIcon = ({className, ...rest}) => 
	<svg {...rest} xmlns="http://www.w3.org/2000/svg" className={`w-7 ${className}`} viewBox="0 0 20 20" fill="currentColor">
		<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
	</svg>

const AddToCartButton = ({className='', children, ...rest}) => {
	return (
		<button className={`
					flex items-center w-max-content
					uppercase font-bold text-xl text-white
					bg-gradient-to-b from-[#ff836b] to-[#ff4166] 
					hover:from-[#ff4166] 
					shadow-xl
					px-7 py-4
					rounded-0 sm:rounded-lg
					before:content-[""] before:absolute before:inset-y-2 before:-inset-x-1 before:bg-[#ff4166] before:-z-30 before:blur-lg before:translate-y-3 before:opacity-40
					active:scale-[0.98] transition duration-100

					fixed sm:relative
					bottom-0 inset-x-0
					${className}`}
				{...rest}
				>
					<CartIcon className="mr-3" />
					{children || 'Add to cart'}
		</button>
	)
}

export default AddToCartButton