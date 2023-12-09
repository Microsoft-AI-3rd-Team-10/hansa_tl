package com.example.demo.Model;

import org.apache.ibatis.annotations.Mapper;
import com.example.demo.Model.HansaImageVO;
@Mapper
public interface HansaImageDAO {
    HansaImageVO selectByKey(String image_name);
    void insert(HansaImageVO hansaInfo);
    void updateOCR(HansaImageVO hansaInfo);
    void updateTL(HansaImageVO hansaInfo);
    void delete(String image_name);
}
