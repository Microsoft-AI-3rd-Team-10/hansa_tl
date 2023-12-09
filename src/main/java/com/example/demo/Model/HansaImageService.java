package com.example.demo.Model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HansaImageService {

    @Autowired
    private HansaImageDAO mapper;

    public HansaImageVO selectByKey(String image_name) {
        return mapper.selectByKey(image_name);
    };
    public void insertImage(HansaImageVO hansaInfo) {
        String image_key = hansaInfo.getImage_name();
        HansaImageVO is_hansa = selectByKey(image_key);
        if (is_hansa == null) {
            mapper.insert(hansaInfo);
        }
    };
    public void updateOCR(String filename, String text) {
        HansaImageVO hansaInfo = mapper.selectByKey(filename);

        if (hansaInfo != null) {
           hansaInfo.setImage_ocr(text);
           mapper.updateOCR(hansaInfo);
        }
        else {
            throw new IllegalStateException("No Image");
        }
    };
    public void updateTL(String filename, String text) {
        HansaImageVO hansaInfo = mapper.selectByKey(filename);
        if (hansaInfo != null) {
            hansaInfo.setImage_translate(text);
            mapper.updateTL(hansaInfo);
        }
        else {
            throw new IllegalStateException("No Image");
        }
    };
    public void deleteImage(String image_name) {
        mapper.delete(image_name);
    };

}
