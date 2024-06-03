import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { answerQuestion, setCorrectCount } from "../features/test-slice/slice";
import { useDispatch, useSelector } from "../store/store";
import { ChoiceQuestion, QuestionData } from "../types";

interface Props {
	questionData: QuestionData;
	selectedAnswers: { [questionId: string]: string[] };
}

export const MultipleChoiceQuestion: FC<Props> = ({
	questionData,
	selectedAnswers,
}) => {
	const dispatch = useDispatch();
	const correctCount = useSelector((state) => state.test.correctCount);
	const handleAnswer = useCallback(
		(answer: string[]) => {
			dispatch(answerQuestion({ questionId: questionData.id, answer }));

			const correctAnswers = questionData.correctAnswer.split(",");
			const isCorrect = correctAnswers.every((ans) => answer.includes(ans));
			const wasPreviouslyCorrect = selectedAnswers[questionData.id]
				? correctAnswers.every((ans) =>
						selectedAnswers[questionData.id].includes(ans)
				)
				: false;

			if (isCorrect && !wasPreviouslyCorrect) {
				dispatch(setCorrectCount(correctCount + 1));
			} else if (!isCorrect && wasPreviouslyCorrect) {
				dispatch(setCorrectCount(correctCount - 1));
			}
		},
		[dispatch, selectedAnswers, correctCount, questionData]
	);

	return (
		<CheckboxGroup
			value={selectedAnswers[questionData.id] || []}
			onChange={(values) => handleAnswer(values as string[])}
		>
			<VStack spacing={4}>
				{(questionData as ChoiceQuestion).options.map((option) => (
					<Checkbox key={option.id} value={option.id} w={240}>
						{option.text}
					</Checkbox>
				))}
			</VStack>
		</CheckboxGroup>
	);
};
