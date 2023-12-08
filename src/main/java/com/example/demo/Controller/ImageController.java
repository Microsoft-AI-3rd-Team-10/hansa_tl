package com.example.demo.Controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
@CrossOrigin(origins = "*")
public class ImageController {



    @GetMapping("/api/img")
    public String test3() {
        return "Test";
    }



    @GetMapping("/api")
    public String test() {
        return "Hello, world!";
    }
}
