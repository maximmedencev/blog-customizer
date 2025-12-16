import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useEffect, useState, RefObject } from 'react';

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
	articleState: ArticleStateType;
	onChange: (newState: ArticleStateType) => void;
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	formRef: RefObject<HTMLDivElement>;
};

export const ArticleParamsForm = ({
	articleState,
	onChange,
	isOpen,
	setIsOpen,
	formRef,
}: Props) => {
	const [rawState, setRawState] = useState<ArticleStateType>(articleState);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const updateRawArticle = (
		field: keyof ArticleStateType,
		value: OptionType
	) => {
		setRawState((prev) => ({ ...prev, [field]: value }));
	};

	useEffect(() => {
		setRawState(articleState);
	}, [articleState]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onChange(rawState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onChange(defaultArticleState);
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
