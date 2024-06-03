import { Input } from "@chakra-ui/react";
import { FC, useCallback, useState } from "react";
import { setCorrectCount } from "../features/test-slice/slice";
import { useDispatch, useSelector } from "../store/store";
import { QuestionData } from "../types";

interface Props {
	questionData: QuestionData;
	selectedAnswers: { [questionId: string]: string[] };
}

export const TextualQuestion: FC<Props> = ({
	questionData,
	selectedAnswers,
}) => {
	const dispatch = useDispatch();
	const [textualAnswer, setTextualAnswer] = useState("");
	const correctCount = useSelector((state) => state.test.correctCount);

	const handleTextualAnswer = useCallback(
		(answer: string[], questionId: string) => {
			const isCorrect = questionData.correctAnswer === answer[0];
			const wasPreviouslyCorrect =
				selectedAnswers[questionId]?.[0] === questionData.correctAnswer;

			if (isCorrect && !wasPreviouslyCorrect) {
				dispatch(setCorrectCount(correctCount + 1));
			} else if (!isCorrect && wasPreviouslyCorrect && correctCount >= 0) {
				dispatch(setCorrectCount(correctCount - 1));
			}
		},
		[dispatch, selectedAnswers, correctCount, questionData]
	);

	return (
		<Input
			placeholder="Введите ваш ответ здесь..."
			value={textualAnswer}
			onChange={(e) => setTextualAnswer(e.target.value)}
			onBlur={() =>
				textualAnswer.trim() &&
				handleTextualAnswer([textualAnswer], questionData.id)
			}
		/>
	);
};
