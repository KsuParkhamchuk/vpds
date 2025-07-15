import { Utility } from "@visa/nova-react";
import { ActivityBar, ChatForm, ChatWindow } from "../../components";
import { useActionState, useOptimistic, useRef, startTransition } from "react";
import { sendPrompt } from "./action";
import type { Message } from "./types";
import styles from "./ChatView.module.css";

export const ChatView = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [messages, dispatch] = useActionState(sendPrompt, []);
  const [optimisticMessages, addOptimisticMessages] = useOptimistic(
    messages,
    (state: Message[], message: Message): Message[] => {
      return [...state, message];
    }
  );

  const formAction = async (formData: FormData) => {
    const prompt = formData.get("prompt") as string;
    if (!prompt) return;

    formRef.current?.reset();

    addOptimisticMessages({ content: prompt, role: "user" });
    addOptimisticMessages({ content: "Generating...", role: "assistant" })

    startTransition(() => {
      dispatch(formData);
    });
  };

  const startNewChat = () => {
    formRef.current?.reset();
    startTransition(() => {
      dispatch(new FormData());
    });
  };

  return (
    <Utility
      vPadding={10}
      vFlex
      vFlexCol
      vJustifyContent="between"
      className={styles.chatView}
    >
      {optimisticMessages.length > 0 && (
        <ActivityBar startNewChat={startNewChat} />
      )}
      <ChatWindow messages={optimisticMessages} />
      <form action={formAction} ref={formRef}>
        <ChatForm />
      </form>
    </Utility>
  );
};
