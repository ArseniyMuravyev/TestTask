import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { questionData } from "../data/questions";
import { useTimer } from "../hooks/useTimer";
import { useSelector } from "../store/store";

export const TestInfo: FC = () => {
	const { timeLeft } = useTimer(900);
	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	const currentQuestionIndex = useSelector(
		(state) => state.test.currentQuestionIndex
	);

	return (
		<Flex justifyContent="space-between">
			<Text mt={4}>
				Вопрос {currentQuestionIndex + 1} из {questionData.length}
			</Text>
			<Text mt={4}>
				Время: {minutes.toString().padStart(2, "0")}:
				{seconds.toString().padStart(2, "0")}
			</Text>
		</Flex>
	);
};
