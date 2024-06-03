import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Question } from "./components/Question";
import { Results } from "./components/Results";
import { useSelector } from "./store/store";

const App: FC = () => {
	const showResults = useSelector((state) => state.test.showResults);

	return (
		<Flex
			h="100vh"
			w="100%"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
		>
			{!showResults ? <Question /> : <Results />}
		</Flex>
	);
};

export default App;
