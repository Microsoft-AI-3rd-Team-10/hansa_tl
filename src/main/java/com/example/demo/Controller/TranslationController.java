package com.example.demo.Controller;

import com.example.demo.Model.HansaImageService;
import com.example.demo.Model.HansaImageVO;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TranslationController {

    @Autowired
    HansaImageService hansa_service;

    @GetMapping("/api/tl")
    @CrossOrigin("*")
    public String translation (@RequestParam("filename") String filename) {

        HansaImageVO hansa_image = hansa_service.selectByKey(filename);
        String context = hansa_image.getImage_ocr();

        String prompt = "Translate the following Chinese characters to Korean, ensuring a formal tone," +
                "avoiding the use of foreign words.\n" +
                "Put a punctuation mark at the end of each sentence.\n" +
                "Provide only the translated text.\n";



        try {
//            String token = System.getenv("API_KEY");
            OpenAiService service = new OpenAiService("", Duration.ofSeconds(60));

            final List<ChatMessage> messages = new ArrayList<>();
            final ChatMessage systemMessage = new ChatMessage("system", prompt);
            messages.add(systemMessage);
            messages.add(new ChatMessage("user", context));
            ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest
                    .builder()
                    .model("gpt-4")
                    .messages(messages)
                    .build();

            String resultString = service.createChatCompletion(chatCompletionRequest).getChoices().get(0).getMessage()
                    .getContent().trim();
            service.shutdownExecutor();
            hansa_service.updateTL(filename, resultString);
            return resultString;
        } catch (Exception e) {
            e.printStackTrace();
            return "API ERROR";
        }

    }
}
