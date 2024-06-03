import { Button, VStack } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { answerQuestion, setCorrectCount } from "../features/test-slice/slice";
import { useDispatch, useSelector } from "../store/store";
import { ChoiceQuestion, QuestionData } from "../types";

interface Props {
	questionData: QuestionData;
	selectedAnswers: { [questionId: string]: string[] };
}

export const SingleChoiceQuestion: FC<Props> = ({
	questionData,
	selectedAnswers,
}) => {
	const dispatch = useDispatch();
	const correctCount = useSelector((state) => state.test.correctCount);
	const handleSelectOption = useCallback(
		(optionId: string) => {
			const isCorrect = questionData.correctAnswer === optionId;

			const wasPreviouslyCorrect =
				selectedAnswers[questionData.id]?.[0] === questionData.correctAnswer;

			dispatch(
				answerQuestion({ questionId: questionData.id, answer: [optionId] })
			);

			if (isCorrect && !wasPreviouslyCorrect) {
				dispatch(setCorrectCount(correctCount + 1));
			} else if (!isCorrect && wasPreviouslyCorrect && correctCount > 0) {
				dispatch(setCorrectCount(correctCount - 1));
			}
		},
		[dispatch, selectedAnswers, correctCount, questionData]
	);

	return (
		<VStack spacing={4}>
			{(questionData as ChoiceQuestion).options.map((option) => (
				<Button
					w={240}
					key={option.id}
					onClick={() => handleSelectOption(option.id)}
					colorScheme={
						selectedAnswers[questionData.id]?.includes(option.id)
							? "orange"
							: "teal"
					}
				>
					{option.text}
				</Button>
			))}
		</VStack>
	);
};
