package com.example.demo.Controller;

import com.example.demo.Model.HansaImageService;
import com.example.demo.Model.HansaImageVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@CrossOrigin(origins = "*")
public class ImageController {
    private static final String UPLOAD_DIR = "src" + File.separator + "main" + File.separator + "java" +
            File.separator + "com" + File.separator + "example" + File.separator + "demo" + File.separator + "Static" + File.separator;

    @Autowired
    HansaImageService service;

    @PostMapping(value = "/api/img")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam("filename") String filename) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Please upload a file");
            }

            // Sanitize and validate filename
            if (!filename.matches("[a-zA-Z0-9_-]+\\.(jpg|jpeg|png)")) {
                return ResponseEntity.badRequest().body("Invalid filename");
            }

            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();  // This will create necessary parent directories as well
            }

            // Save the image to the specified directory
            String filePath = UPLOAD_DIR + filename;

            // Save the file to the specified directory
            Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

            HansaImageVO hansaImage = new HansaImageVO();
            hansaImage.setImage_name(filename);
            hansaImage.setImage_path(filePath);
            service.insertImage(hansaImage);

            // For simplicity, let's just return a success message
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    @GetMapping("/api")
    public String test() {
        return "Hello, world!";
    }
}
