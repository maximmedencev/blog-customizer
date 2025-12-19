import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useEffect, useState, useRef } from 'react';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import {
	ArticleStateType,
	backgroundColors,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

type Props = {
	initialState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ initialState, onApply }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [rawState, setRawState] = useState<ArticleStateType>(initialState);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setRawState(initialState);
	}, [initialState]);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const updateRawArticle = (
		field: keyof ArticleStateType,
		value: OptionType
	) => {
		setRawState((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(rawState);
		setIsOpen(false);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle={'normal'}
						family={'open-sans'}
						uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={rawState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={(option) => updateRawArticle('fontFamilyOption', option)}
					/>
					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={rawState.fontSizeOption}
						onChange={(option) => updateRawArticle('fontSizeOption', option)}
					/>
					<Select
						title='Цвет шрифта'
						selected={rawState.fontColor}
						options={fontColors}
						onChange={(option) => updateRawArticle('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={rawState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => updateRawArticle('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						selected={rawState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => updateRawArticle('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
