import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { questionData } from "../data/questions";
import {
	nextQuestion,
	previousQuestion,
	setShowResults,
} from "../features/test-slice/slice";
import { useDispatch, useSelector } from "../store/store";

export const NavigationButtons: FC = () => {
	const dispatch = useDispatch();
	const currentQuestionIndex = useSelector(
		(state) => state.test.currentQuestionIndex
	);

	const handleNextQuestion = () => {
		if (currentQuestionIndex < questionData.length - 1) {
			dispatch(nextQuestion());
		} else {
			dispatch(setShowResults(true));
		}
	};

	const handlePreviousQuestion = () => {
		dispatch(previousQuestion());
	};

	return (
		<Flex justifyContent="space-between" mt={8}>
			<IconButton
				aria-label="Previous question"
				colorScheme="pink"
				onClick={handlePreviousQuestion}
				icon={<ArrowBackIcon />}
			/>
			<IconButton
				aria-label="Next question"
				colorScheme="telegram"
				onClick={handleNextQuestion}
				icon={<ArrowForwardIcon />}
			/>
		</Flex>
	);
};
