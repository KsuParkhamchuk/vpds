import { Input, InputContainer, Utility, Button } from "@visa/nova-react";
import { VisaArrowRightTiny } from "@visa/nova-icons-react";
import { useId } from "react";
import { useFormStatus } from "react-dom";
import styles from "./ChatForm.module.css"

export const ChatForm = () => {
  const id = useId();
  const { pending } = useFormStatus();

  return (
    <Utility vFlex vFlexCol vGap={4}>
      <InputContainer>
        <Input
          aria-required="true"
          id={id}
          type="text"
          placeholder="Type your prompt here"
          name="prompt"
          className={styles.input}
        />
        <Button colorScheme="tertiary" type="submit" disabled={pending}>
          <VisaArrowRightTiny />
        </Button>
      </InputContainer>
    </Utility>
  );
};
