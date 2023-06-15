import { RoundButton } from "../shared_style";

const CountDownButton = ({ onClick, isDisabled }) => {
  return (
    <RoundButton onClick={onClick} disabled={isDisabled}>
      -
    </RoundButton>
  );
};

export default CountDownButton;
