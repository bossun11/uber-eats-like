import { RoundButton } from "../shared_style";

const CountUpButton = ({ onClick, isDisabled }) => {
  return (
    <RoundButton onClick={onClick} disabled={isDisabled}>
      +
    </RoundButton>
  );
};

export default CountUpButton;
