import { Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { questionData } from "../data/questions";
import { restartTest } from "../features/test-slice/slice";
import { useTimer } from "../hooks/useTimer";
import { useDispatch, useSelector } from "../store/store";

export const Results: FC = () => {
	const dispatch = useDispatch();
	const { resetTime } = useTimer(900);

	const correctCount = useSelector((state) => state.test.correctCount);

	const handleRestartTest = () => {
		dispatch(restartTest());
		resetTime();
	};

	return (
		<Flex flexDirection="column" gap={4}>
			<Text fontSize="2xl">Результаты:</Text>
			<Text>Правильных ответов: {correctCount}</Text>
			<Text>Неправильных ответов: {questionData.length - correctCount}</Text>
			<Button onClick={handleRestartTest}>Попробовать еще раз</Button>
		</Flex>
	);
};
