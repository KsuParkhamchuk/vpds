import { Utility, Typography, Surface, Link, Button } from "@visa/nova-react";
import type { Message } from "../../views/chatView/types";
import styles from "./ChatWindow.module.css";
import ReactMarkdown, { type Components } from "react-markdown";
import { useEffect, useState } from "react";

interface ChatWindowProps {
  messages: Message[];
}

interface MessageProps {
  message: Message;
  components: Components;
}

const DefaultChatIntro = () => {
  return (
    <Utility
      vFlex
      vFlexCol
      vJustifyContent="center"
      vAlignItems="center"
      vMarginTop={20}
    >
      <Typography variant="headline-2">Welcome!</Typography>
      <Typography variant="body-2">What are you building today?</Typography>
    </Utility>
  );
};

const Message = ({ message, components }: MessageProps) => {
  const marginLeft = message.role === "user" ? "auto" : 0;
  const marginRight = message.role === "user" ? 10 : 0;
  const className =
    message.role === "user" ? styles.userMessage : styles.assistantMessage;

  return (
    <Utility
      vMarginLeft={marginLeft}
      vMarginRight={marginRight}
      vPaddingHorizontal={20}
      vMarginBottom={20}
      element={<Surface />}
      className={`${styles.message} ${className}`}
    >
      <ReactMarkdown components={components}>{message.content}</ReactMarkdown>
    </Utility>
  );
};

export const ChatWindow = ({ messages }: ChatWindowProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const show = messages.length > 0;

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 3000);
    }
  }, [isCopied]);

  const copyCodeBlock = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => setIsCopied(true))
      .catch((err) => console.error(err));
  };

  const markdownComponents: Components = {
    h3: ({ node, ...props }) => (
      <Utility
        vMarginBottom={20}
        element={<Typography variant="headline-3" {...props} />}
      />
    ),

    a: ({ node, ...props }) => (
      <Utility vMarginBottom={10} element={<Link alternate {...props} />} />
    ),

    code: ({ node, children, ...props }) => {
      return (
        <Utility
          {...props}
          element={<Surface />}
          className={styles.codeBlock}
          vPadding={20}
          vFlex
          vFlexCol
          vAlignItems="end"
        >
          {children}
          <Button
            colorScheme="tertiary"
            onClick={() => copyCodeBlock(String(children))}
          >
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </Utility>
      );
    },
  };

  return (
    <Utility vFlexGrow className={styles.chatWindow}>
      {show ? (
        messages.map((message: Message, index) => {
          return (
            <Message
              key={`${index}-message`}
              message={message}
              components={markdownComponents}
            />
          );
        })
      ) : (
        <DefaultChatIntro />
      )}
    </Utility>
  );
};
