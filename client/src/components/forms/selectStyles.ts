import { GroupBase, StylesConfig } from "react-select";

function createCustomStyles<T>(): StylesConfig<T, false, GroupBase<T>> {
	return {
		control: (provided) => ({
			...provided,
			backgroundColor: "var(--select-background-color)",
			borderColor: "var(--select-border-color)",
			color: "var(--select-text-color)",
			"&:hover": {
				borderColor: "var(--select-border-hover-color)",
			},
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected
				? "var(--select-option-selected-background-color)"
				: "var(--select-option-background-color)",
			color: "var(--select-option-text-color)",
			"&:hover": {
				backgroundColor: "var(--select-option-hover-background-color)",
			},
		}),
		singleValue: (provided) => ({
			...provided,
			color: "var(--select-value-text-color)",
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "var(--select-menu-background-color)",
		}),
	};
}

export default createCustomStyles;