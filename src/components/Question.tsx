import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { questionData } from "../data/questions";
import { useSelector } from "../store/store";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { NavigationButtons } from "./NavigationButtons";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion";
import { TextualQuestion } from "./TextualQuestion";

export const Question: FC = () => {
	const selectedAnswers = useSelector((state) => state.test.selectedAnswers);
	const currentQuestionIndex = useSelector(
		(state) => state.test.currentQuestionIndex
	);
	const question = questionData[currentQuestionIndex];

	return (
		<Box p={4} borderWidth="1px" borderRadius="lg" w="50vw" minW="360px">
			<Text fontSize="2xl" textAlign="center" mb={6}>
				{question.question}
			</Text>
			{question.type === "multiple-choice" && (
				<MultipleChoiceQuestion
					selectedAnswers={selectedAnswers}
					questionData={question}
				/>
			)}
			{question.type === "textual" && (
				<TextualQuestion
					selectedAnswers={selectedAnswers}
					questionData={question}
				/>
			)}
			{question.type === "single-choice" && (
				<SingleChoiceQuestion
					questionData={question}
					selectedAnswers={selectedAnswers}
				/>
			)}
			<NavigationButtons />
		</Box>
	);
};
