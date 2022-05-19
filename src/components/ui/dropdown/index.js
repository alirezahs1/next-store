import { useState, useMemo, useRef, useEffect } from "react";

const DropDown = ({className, options, defaultValue, placeholder, onChange}) => {

	const [isOpened, setIsOpened] = useState(false);
	const [value, setValue] = useState();

	const wrapperRef = useRef();

	useEffect(() => {

		if (wrapperRef?.current) {
			window.addEventListener('click', function(e){   
				if (!wrapperRef.current?.contains(e.target)){
					setIsOpened(false);
				}
			});
		} 

	}, []);

	useEffect(() => {
		if (defaultValue !== undefined && value === undefined) {
			setValue(defaultValue);
		}
	}, [defaultValue, value])

	const toggle = () => {
		setIsOpened(x => !x);
	}

	const handleChange = (option) => {
		setValue(option.value);
		if (onChange) {
			onChange(option.value, option);
		}
		setIsOpened(false);
	}

	const activeOptionText = useMemo(() => 
		 options?.find(x => x.value === value)?.label || placeholder
	, [value, placeholder, options]);

	return (
		<div className="relative cursor-pointer w-max" ref={wrapperRef}>
			<div className="relative text-gray-300 hover:text-gray-400 transition-colors duration-100 text-xl pr-5 font-bold before:content-[''] before:w-[5px] before:h-[5px] before:border-r-2 before:border-b-2 before:border-gray-300 hover:before:border-gray-400 before:absolute before:right-0 before:-translate-y-1/2 before:top-1/2 before:rotate-45" onClick={() => toggle()}>
				{activeOptionText}
			</div>
			<div className={`absolute bg-white top-0 rounded-lg shadow-lg w-full min-w-[100px] z-50  ${isOpened ? "block" : "hidden"}`}>
				{options?.map(option => (
					<div key={option.value} className="text-gray-600 text-sm px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150" onClick={() => {handleChange(option)}}>
						{option.label}
					</div>
				))}
			</div>
		</div>
	)
}

export default DropDown;