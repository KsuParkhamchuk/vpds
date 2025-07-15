import type {Message} from './types'

const assistantMarkdownResponse = `### Suggested components\n\n**[Component: Avatar](https://example.com)**\n\nProposed Options for the Current Task:\n*   src: URL to image (if provided)\n*   name: auto-generates initials\n*   size: small, medium, large\n\n[Avatar Component Docs (Angular)](https://example.com)\n\n**[Component: Input](https://example.com)**\n...\n\n### Code snippet\n\n\`\`\`typescript\nimport { Component } from '@angular/core';\nimport { NovaLibModule } from '@visa/nova-angular';\n\n@Component({\n  imports: [NovaLibModule],\n  standalone: true,\n  selector: 'nova-workshop-input-default',\n  templateUrl: './default.docs.html'\n})\nexport class DefaultInputComponent {}\n\`\`\``;

export const sendPrompt = async (prevState: Message[], formData: FormData): Promise<Message[]> => {
    const prompt = formData.get("prompt") as string;
    if (!prompt) return []

    const userMessage: Message = {content: prompt, role: "user"}
    
    await new Promise((resolve) => setTimeout(resolve, 3000))
    
    const assistantMessage: Message = {content: assistantMarkdownResponse, role: "assistant"}
    
    return [...prevState, userMessage, assistantMessage]
}