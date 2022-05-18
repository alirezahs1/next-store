import { useState, useEffect } from 'react';

const colorNames = {
	'black': '#000000',
	'grey': '#808080',
	'blue': '#0000ff',
	'green': '#008000',
	'yellow': '#ffff00',
	'orange': '#ffa500',
	'red': '#ff0000',
	'purple': '#800080',
	'pink': '#ffc0cb',
	'brown': '#a52a2a',
	'beige': '#f5f5dc',
	'cyan': '#00ffff',
}

const ColorSelect = ({className, activeColors, defaultColor, onChange}) => {

	const [selectedColor, setSelectedColor] = useState();

	if (activeColors === undefined) {
		activeColors = Object.keys(colorNames).slice(0, 5);
	}

	useEffect(() => {
		if (defaultColor) {
			setSelectedColor(defaultColor);
		}
	}, [defaultColor])

	const handleClick = (color) => {
		setSelectedColor(color);
		if (onChange) {
			onChange(color, colorNames[color]);
		}
	}


	return (
		<div>
			<div className={`flex space-x-3 ${className}`}>
				{activeColors.map(color => (
					<span
						title={color?.toCamel}
						key={color} 
						className={`w-5 h-5 rounded-full cursor-pointer ${color === selectedColor ? "outline" : ""} outline-2 outline-offset-[3px]`}
						style={{backgroundColor: colorNames[color], outlineColor: colorNames[color]}} 
						onClick={() => handleClick(color)}
						/>
				))}
			</div>
		</div>
	)
}

export default ColorSelect;