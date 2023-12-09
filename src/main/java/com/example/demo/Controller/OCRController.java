package com.example.demo.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import java.io.File;
import java.nio.file.Files;
import java.util.Base64;

@RestController
@CrossOrigin(origins = "*")
public class OCRController {

    @GetMapping("/api/OCR")
    @CrossOrigin(origins = "*")
    public String ocr (@RequestParam("filename") String filename) {
        String apiUrl = "http://localhost:8000/byte";
        String inputImagePath = "C:\\Users\\a9491\\OneDrive\\Desktop\\EasyOCR\\demo\\000000000034951_016.jpg";
        String response_data = "";
        try {
            File imageFile = new File(inputImagePath);

            // Read the file content as bytes
            byte[] fileContent = Files.readAllBytes(imageFile.toPath());

            // Encode the image data to base64
            String imageBase64 = Base64.getEncoder().encodeToString(fileContent);

            // Create a RestTemplate
            RestTemplate restTemplate = new RestTemplate();

            // Set up the request headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Create the request body
            String jsonBody = "{\"image_base64\": \"" + imageBase64 + "\"}";

            // Create the HttpEntity with headers and body
            HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);

            // Make the HTTP POST request
            ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);


            // Check the response status
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
//                System.out.println("Response Data: " + responseBody);
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
                response_data = jsonNode.get("result").asText();
            } else {
                System.out.println("API Error, Response code: " + responseEntity.getStatusCodeValue());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return response_data;
    }
}
