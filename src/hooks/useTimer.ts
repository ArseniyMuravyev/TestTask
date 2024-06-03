import { useEffect, useState } from "react";
import { setShowResults } from "../features/test-slice/slice";
import { useDispatch } from "../store/store";

export const useTimer = (initialTime: number) => {
	const dispatch = useDispatch();
	const [timeLeft, setTimeLeft] = useState(initialTime);

	useEffect(() => {
		if (timeLeft <= 0) {
			dispatch(setShowResults(true));
			return;
		}
		const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
		return () => clearTimeout(timerId);
	}, [timeLeft, dispatch]);

	const resetTime = () => setTimeLeft(initialTime);

	return { timeLeft, resetTime };
};
