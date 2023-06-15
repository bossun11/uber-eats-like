import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import styled from "@emotion/styled";

// conmponents
import { SubText } from "./StyledText";

// images
import OrderHeaderImage from "../images/order-header.png";

const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const FoodOrderDialog = ({ food, isOpen, onCloseDialog }) => {
  return (
    <Dialog open={isOpen} onClose={onCloseDialog}>
      <OrderHeader src={OrderHeaderImage} alt="order header" />
      <DialogTitle>{food.name}</DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          <SubText>{food.description}</SubText>
        </DescriptionWrapper>
      </DialogContent>
      <DialogActions>
        <div>数量</div>
      </DialogActions>
    </Dialog>
  );
};

export default FoodOrderDialog;
