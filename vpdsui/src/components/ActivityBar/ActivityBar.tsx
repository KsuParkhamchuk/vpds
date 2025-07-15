import { Utility, Button } from "@visa/nova-react";
import { VisaAddTiny } from "@visa/nova-icons-react"

interface ActivityBarProps {
    startNewChat: () => void
}

export const ActivityBar = ({startNewChat} : ActivityBarProps) => {
  return (
    <Utility vFlex vJustifyContent="end" vMarginBottom={20} vMarginRight={10}>
      <Button
        aria-label="action"
        buttonSize="small"
        colorScheme="tertiary"
        iconButton
        onClick={startNewChat}
      >
        <VisaAddTiny />
      </Button>
    </Utility>
  );
};
